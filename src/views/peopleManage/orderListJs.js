import Pagination from "@/components/Pagination";
import { getUserList, getFiltersUserList, editUserInfo } from "@/api/user";
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
                type: 1,
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
                        value: "1-1",
                        label: "超过5天",
                    }, {
                        value: "1-2",
                        label: "超过10天",
                    }, {
                        value: "1-3",
                        label: "超过15天",
                    }, {
                        value: "1-4",
                        label: "超过30天",
                    }, {
                        value: "1-5",
                        label: "超过60天",
                    }, {
                        value: "1-6",
                        label: "超过90天",
                    },
                ],
            }, {
                value: "2",
                label: "最近有消费",
                children: [
                    {
                        value: "2-1",
                        label: "5天以内",
                    }, {
                        value: "2-2",
                        label: "10天以内",
                    }, {
                        value: "2-3",
                        label: "15天以内",
                    }, {
                        value: "2-4",
                        label: "30天以内",
                    }, {
                        value: "2-5",
                        label: "60天以内",
                    }, {
                        value: "2-6",
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
                uid: "",
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
            getFiltersUserList(this.listQuery).then((res) => {
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
            // 搜索
            this.listQuery.page = 1;
            this.getFiltersUserList();
        },
        handleDownload() {
            // 导出excel
            this.downloadLoading = true;
            import("@/vendor/Export2Excel").then((excel) => {
                const tHeader = ["timestamp", "title", "type", "importance", "status"];
                const filterVal = [
                    "timestamp",
                    "title",
                    "type",
                    "importance",
                    "status",
                ];
                const data = this.formatJson(filterVal);
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: "table-list",
                });
                this.downloadLoading = false;
            });
        },
        xiaofeiChange(value) { // 消费行为
            console.log(value);
        }
    },
};