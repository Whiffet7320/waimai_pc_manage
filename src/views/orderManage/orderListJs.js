import Pagination from "@/components/Pagination";
import { getOrder, tuiOrder, shifangOrder } from "@/api/order";
import { getUserList } from "@/api/user";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from '@/utils';
import { orderStatus } from "@/filters/index";

export default {
    name: "Userlist",
    directives: { waves },
    components: { Pagination },
    data() {
        return {
            total: 0,
            // 筛选条件
            listQuery: {
                status: "6",
                page: 1,
                limit: 10,
                id: "",
                userphone: "",
                username: "",
                timefilter: "",
                needdate: "0",
                type: 0
            },
            qishouQuery: {
                type: 3,
                limit: 20,
                page: 1,
                total: 50
            },
            qishoulist: [],
            pickerOptions: {
                shortcuts: [
                    {
                        text: "最近一周",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近三个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit("pick", [start, end]);
                        }
                    }
                ]
            },
            downloadLoading: false,
            //数据
            list: [],

            // 编辑弹窗数据
            temp: {
                id: undefined,
                timestamp: new Date(),
                origin: {},
                destination: []
            },
            dialogFormVisible: false
        };
    },
    created() {
        this.getList();
        this.getQiShou();
    },
    methods: {
        handleClick(tab) {
            this.status = tab.name;
            this.listQuery.page = 1;
            this.getList();
        },
        getQiShou() {
            getUserList(this.qishouQuery).then(res => {
                if (res.errcode == 0) {
                    this.qishoulist = res.list;
                    this.qishouQuery.total = res.count;
                    this.listLoading = false;
                } else {
                    this.$message({
                        message: res.errmsg,
                        type: "error"
                    });
                }
            });
        },
        getList() {
            this.listLoading = true;
            getOrder(this.listQuery).then(res => {
                if (res.errcode == 0) {
                    this.list = res.data.list;
                    this.total = res.data.count;
                    this.listLoading = false;
                } else {
                    this.$message({
                        message: res.errmsg,
                        type: "error"
                    });
                }
            });
        },
        // getFiltersUserList() {
        //     this.listLoading = true;
        //     getFiltersUserList(this.listQuery).then((res) => {
        //         if (res.errcode == 0) {
        //             this.list = res.list;
        //             this.total = res.count;
        //             this.listLoading = false;
        //         } else {
        //             this.$message({
        //                 message: res.errmsg,
        //                 type: "error",
        //             });
        //         }
        //     });
        // },
        handleEdit(index, row) {
            // 编辑
            this.temp = Object.assign({}, row); // copy obj
            this.temp.timestamp = new Date(this.temp.timestamp);
            console.log("this.temp--->>>", this.temp);
            console.log("this.temp--->>>", this.temp.origin.name);
            this.dialogStatus = "update";
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs["dataForm"].clearValidate();
            });
        },
        updateData() {
            // 编辑保存
            this.$refs["dataForm"].validate(valid => {
                if (valid) {
                    const tempData = Object.assign({}, this.temp);
                    tempData.timestamp = +new Date(tempData.timestamp); // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
                    editUserInfo(tempData).then(res => {
                        if (res.errcode == 0) {
                            const index = this.list.findIndex(v => v.id === this.temp.id);
                            this.list.splice(index, 1, this.temp);
                            this.dialogFormVisible = false;
                            this.$notify({
                                title: "",
                                message: "更新成功",
                                type: "success",
                                duration: 2000
                            });
                        } else {
                            this.$message({
                                message: res.errmsg,
                                type: "error"
                            });
                        }
                    });
                }
            });
        },
        handleFilter() {
            // 搜索
            this.listQuery.page = 1;
            this.listQuery["createbegin"] = this.listQuery.timefilter[0];
            this.listQuery["createend"] = this.listQuery.timefilter[1];
            this.getList();
        },
        tuidan() {
            // 退单
            this.$confirm("确定要取消该订单?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                center: true
            })
                .then(() => {
                    const tempData = Object.assign({}, this.temp);
                    tempData.timestamp = +new Date(tempData.timestamp);
                    this.listLoading = true;
                    let data = {
                        id: tempData.id
                    };
                    tuiOrder(data).then(res => {
                        if (res.errcode == 0) {
                            const index = this.list.findIndex(v => v.id === this.temp.id);
                            this.list.splice(index, 1, this.temp);
                            this.dialogFormVisible = false;
                            this.listLoading = false;
                            this.$message({
                                message: '取消成功',
                                type: "success"
                            });
                            this.listQuery.page = 1;
                            this.getList();
                        } else {
                            this.$message({
                                message: res.errmsg,
                                type: "error"
                            });
                        }
                    });
                    this.list.splice(index, 1);
                })
                .catch(() => { });
        },
        shifang() {
            // 释放订单
            this.$confirm("确定要释放该订单?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                center: true
            })
                .then(() => {
                    const tempData = Object.assign({}, this.temp);
                    tempData.timestamp = +new Date(tempData.timestamp);
                    this.listLoading = true;
                    let data = {
                        id: tempData.id
                    };
                    shifangOrder(data).then(res => {
                        if (res.errcode == 0) {
                            const index = this.list.findIndex(v => v.id === this.temp.id);
                            this.list.splice(index, 1, this.temp);
                            this.dialogFormVisible = false;
                            this.listLoading = false;
                            this.$message({
                                message: '释放成功',
                                type: "success"
                            });
                            this.listQuery.page = 1;
                            this.getList();
                        } else {
                            this.$message({
                                message: res.errmsg,
                                type: "error"
                            });
                        }
                    });
                    this.list.splice(index, 1);
                })
                .catch(() => { });
        },
        goMap() {
            // 地图页
            this.$router.push({
                path: "/orderManage/map",
                query: {
                    orderid: this.temp.id,
                    lon: this.temp.origin.lon,
                    lat: this.temp.origin.lat
                }
            });
        },
        handleDownload() {
            this.downloadLoading = true;
            import("@/vendor/Export2Excel").then(excel => {
                const tHeader = [
                    "订单号",
                    "订单价格",
                    "发货人",
                    "下单时间",
                    "骑手名称",
                    "订单状态"
                ];
                const filterVal = [
                    "id",
                    "price",
                    "name",
                    "createtime",
                    "qishouuid",
                    "status"
                ];
                const list = this.list;
                const data = this.formatJson(filterVal, list);
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: "orderList",
                    autoWidth: true,
                    bookType: "xlsx"
                });
                this.downloadLoading = false;
            });
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v =>
                filterVal.map(j => {
                    if (j === "createtime") {
                        return parseTime(v[j]);
                    } else if (j === "status") {
                        return orderStatus(v[j]);
                    } else if (j === "qishouuid") {
                        return v[j] == 0 ? "暂无骑手接单" : v['qishoumsg']['ridername'];
                    } else if (j === "sex") {
                        return v[j] == 1 ? "男" : "女";
                    } else {
                        return v[j];
                    }
                })
            );
        }
    }
};