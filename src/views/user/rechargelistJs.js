import Pagination from "@/components/Pagination";
import { gerRechargeList } from "@/api/user";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from '@/utils'

export default {
    name: "Userlist",
    directives: { waves },
    components: { Pagination },
    data() {
        return {
            total: 0,
            // 筛选条件
            listQuery: {
                type: 1, // 1-用户。 2-商家。 3-骑手
                page: 1,
                limit: 10,
                uid: "",
                phone: "",
                rechargetype: '4',
                timefilter: "",
                tabDay: '0',
            },
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            downloadLoading: false,
            rechargetypeOptions: [{
                value: "4",
                label: "全部"
            }, {
                value: "1",
                label: "后台充值"
            }, {
                value: "2",
                label: "微信"
            }, {
                value: "3",
                label: "支付宝"
            }],
            //数据
            list: [],
        };
    },
    created() {
        this.getlist();
    },
    methods: {
        getlist() {
            this.listLoading = true;
            gerRechargeList(this.listQuery).then((res) => {
                if (res.errcode == 0) {
                    this.list = res.list;
                    this.total = res.count;
                    this.listLoading = false;
                    if (this.listQuery.hasOwnProperty('daochu')) {
                        this.exportexcel();
                    }
                } else {
                    this.$message({
                        message: res.errmsg,
                        type: "error",
                    });
                }
            });
        },
        handleFilter() {
            this.listQuery.page = 1;
            delete (this.listQuery['daochu']);
            this.getlist();
        },
        handleDownload() {
            this.listQuery.page = 1;
            this.listQuery.daochu = 'ok';
            this.getlist();
        },
        exportexcel() {
            this.downloadLoading = true
            import('@/vendor/Export2Excel').then(excel => {
                const tHeader = ['充值ID', '充值金额', '赠送金额', '类型', '充值时间']
                const filterVal = ['uid', 'num', 'zengsong', 'desc', 'createtime']
                const list = this.list
                const data = this.formatJson(filterVal, list)
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: 'rechargeList',
                    autoWidth: true,
                    bookType: 'xlsx'
                })
                this.downloadLoading = false
            })
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => {
                if (j === "createtime") {
                    return parseTime(v[j]);
                } else {
                    return v[j];
                }
            }))
        }
    },
};