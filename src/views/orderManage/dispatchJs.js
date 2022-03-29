import Pagination from "@/components/Pagination";
import { getOrder, getOnlineQishou, dispatchOrder } from "@/api/order";
import waves from "@/directive/waves"; // waves directive

export default {
    name: "Userlist",
    directives: { waves },
    components: { Pagination },
    data() {
        return {
            total: 0,
            // 筛选条件
            listQuery: {
                status: "1",
                page: 1,
                limit: 10,
                id: "",
                userphone: "",
                username: "",
                timefilter: "",
                needdate: '0',
            },
            qishouQuery: {
            },
            qishoulist: [],
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
            //数据
            list: [],
            // 编辑弹窗数据
            temp: {
                id: undefined,
                timestamp: new Date(),
                origin: {},
                destination: [],
            },
            dialogFormVisible: false,
            selectRiderId: 0,
            searchKey: "",
        };
    },
    created() {
        this.getList();

    },
    methods: {
        handleClick(tab) {
            this.status = tab.name;
            this.listQuery.page = 1;
            this.getList();
        },
        getQiShou() {
            getOnlineQishou(this.qishouQuery).then((res) => {
                if (res.errcode == 0) {
                    console.log('qishou--->>', res.list);
                    this.qishoulist = res.list;
                    // this.qishouQuery.total = res.count;
                    this.listLoading = false;
                } else {
                    this.$message({
                        message: res.errmsg,
                        type: "error",
                    });
                }
            });
        },
        getList() {
            this.listLoading = true;
            getOrder(this.listQuery).then((res) => {
                if (res.errcode == 0) {
                    this.list = res.data.list;
                    this.total = res.data.count;
                    this.listLoading = false;
                } else {
                    this.$message({
                        message: res.errmsg,
                        type: "error",
                    });
                }
            });
        },
        handleEdit(index, row) { // 编辑
            this.searchKey = '';
            this.selectRiderId = 0;
            this.getQiShou();
            this.temp = Object.assign({}, row); // copy obj
            this.temp.timestamp = new Date(this.temp.timestamp);
            this.dialogStatus = "update";
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs["dataForm"].clearValidate();
            });
        },
        updateData() { // 编辑保存
            // const tempData = Object.assign({}, this.temp)
            // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
            let data = {
                id: this.temp.id,
                uid: this.selectRiderId,
            }
            dispatchOrder(data).then((res) => {
                if (res.errcode == 0) {
                    // const index = this.list.findIndex(v => v.id === this.temp.id)
                    // this.list.splice(index, 1, this.temp)
                    this.dialogFormVisible = false
                    this.$message.success('派单成功');
                    this.page = 1;
                    this.getList();
                } else {
                    this.$message({
                        message: res.errmsg,
                        type: "error",
                    });
                }
            })
        },
        handleFilter() {
            // 搜索
            this.listQuery.page = 1;
            this.listQuery['createbegin'] = this.listQuery.timefilter[0];
            this.listQuery['createend'] = this.listQuery.timefilter[1];
            this.selectRiderId = 0;
            this.getList();
        },
        selectRider(row, column, event) {
            this.selectRiderId = row.id;
        },
        searchRider() {
            if (this.$isEmpty(this.searchKey)) return this.$message.error('请输入搜索内容');
            if (this.$isMobile(this.searchKey)) {
                this.qishouQuery['phone'] = this.searchKey;
            } else {
                this.qishouQuery['ridername'] = this.searchKey;
            }
            this.getQiShou();
        },
    },
};