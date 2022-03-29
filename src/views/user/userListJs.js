import Pagination from "@/components/Pagination";
import { getUserList, getFiltersUserList, editUserInfo } from "@/api/user";
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
                level: "0",
                xiadannum: '0',
                phone: "",
                mincoin: "",
                maxcoin: "",
                timefilter: "",
                tabDay: '0',
                xiaofevalue: '',
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
            xiaofeioptions: [{
                value: "0",
                label: "全部"
            }, {
                value: "1",
                label: "最近未消费",
                children: [
                    {
                        value: "5",
                        label: "超过5天",
                    }, {
                        value: "10",
                        label: "超过10天",
                    }, {
                        value: "15",
                        label: "超过15天",
                    }, {
                        value: "30",
                        label: "超过30天",
                    }, {
                        value: "60",
                        label: "超过60天",
                    }, {
                        value: "90",
                        label: "超过90天",
                    },
                ],
            }, {
                value: "2",
                label: "最近有消费",
                children: [
                    {
                        value: "5",
                        label: "5天以内",
                    }, {
                        value: "10",
                        label: "10天以内",
                    }, {
                        value: "15",
                        label: "15天以内",
                    }, {
                        value: "30",
                        label: "30天以内",
                    }, {
                        value: "60",
                        label: "60天以内",
                    }, {
                        value: "90",
                        label: "90天以内",
                    }
                ],
            }],
            downloadLoading: false,
            lvlOptions: [{
                value: "0",
                label: "全部"
            }],
            xiadannumOptions: [{
                value: "0",
                label: "全部"
            }, {
                value: "1",
                label: "1+"
            }, {
                value: "10",
                label: "10+"
            }, {
                value: "20",
                label: "20+"
            }],
            //数据
            list: [],

            // 编辑弹窗数据
            temp: {
                id: undefined,
                type: 1,
                nickname: "",
                phone: "",
                timestamp: new Date(),
                type: "",
                coin: "",
                createtime: "",
                accountstatus: "0",
            },
            accountstatusOptions: [{ label: "正常", value: "0" }, { label: "停封", value: "1" }],
            dialogFormVisible: false,
            dialogStatus: "",
            textMap: {
                update: "编辑",
                create: "创建",
            },
        };
    },
    created() {
        this.getUserList();
    },
    methods: {
        getUserList() {
            this.listLoading = true;
            getUserList(this.listQuery).then((res) => {
                if (res.errcode == 0) {
                    this.list = res.list;
                    this.total = res.count;
                    this.listLoading = false;
                } else {
                    this.$message({
                        message: res.errmsg,
                        type: "error",
                    });
                }
            });
        },
        getFiltersUserList() {
            this.listLoading = true;
            if (this.$isEmpty(this.listQuery.xiaofevalue) || this.listQuery.xiaofevalue.length == 1) {
                this.listQuery['weixiaofei'] = '';
                this.listQuery['yixiaofei'] = '';
            } else {
                if (this.listQuery.xiaofevalue[0] == "1") {
                    this.listQuery['yixiaofei'] = '';
                    this.listQuery['weixiaofei'] = this.listQuery.xiaofevalue[1];
                } else {
                    this.listQuery['weixiaofei'] = '';
                    this.listQuery['yixiaofei'] = this.listQuery.xiaofevalue[1];
                }
            }
            getFiltersUserList(this.listQuery).then((res) => {
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
        handleEdit(index, row) { // 编辑
            this.temp = Object.assign({}, row); // copy obj
            this.temp.timestamp = new Date(this.temp.timestamp);
            console.log('this.temp--->>>', this.temp);
            this.dialogStatus = "update";
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs["dataForm"].clearValidate();
            });
        },
        updateData() { // 编辑保存
            this.$refs['dataForm'].validate((valid) => {
                if (valid) {
                    const tempData = Object.assign({}, this.temp)
                    tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
                    editUserInfo(tempData).then((res) => {
                        if (res.errcode == 0) {
                            const index = this.list.findIndex(v => v.id === this.temp.id)
                            this.list.splice(index, 1, this.temp)
                            this.dialogFormVisible = false
                            this.$notify({
                                title: '',
                                message: '更新成功',
                                type: 'success',
                                duration: 2000
                            })
                        } else {
                            this.$message({
                                message: res.errmsg,
                                type: "error",
                            });
                        }
                    })
                }
            })
        },
        handleFilter() {
            this.listQuery.page = 1;
            delete (this.listQuery['daochu']);
            this.getFiltersUserList();
        },
        handleDownload() {
            this.listQuery.page = 1;
            this.listQuery.daochu = 'ok';
            this.getFiltersUserList();
        },
        exportexcel() {
            this.downloadLoading = true
            import('@/vendor/Export2Excel').then(excel => {
                const tHeader = ['用户ID', '昵称', '手机号', '上级ID', '性别', '余额', '用户状态', '注册时间']
                const filterVal = ['id', 'nickname', 'phone', 'shangji', 'sex', 'coin', 'accountstatus', 'createtime']
                const list = this.list
                const data = this.formatJson(filterVal, list)
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: 'userList',
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
                } else if (j === "accountstatus") {
                    return v[j] == 0 ? "正常" : "封号";
                } else if (j === "sex") {
                    return v[j] == 1 ? "男" : "女";
                } else {
                    return v[j];
                }
            }))
        }
    },
};