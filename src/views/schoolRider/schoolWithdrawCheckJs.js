import Pagination from "@/components/Pagination";
import { getUserList, getFiltersUserList, editUserInfo, recharge } from "@/api/user";
import { getBase64, upload } from '@/api/upload'
import waves from "@/directive/waves"; // waves directive

export default {
    directives: { waves },
    components: { Pagination },
    data() {
        return {
            activeName: 0,
            total: 0,
            // 筛选条件
            listQuery: {
                uid: "",
                type: 3,
                page: 1,
                limit: 10,
                id: "",
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
            //数据
            list: [],
            // 编辑弹窗数据
            temp: {
                id: undefined,
                type: 3, // 1-用户，2-商家，3-骑手
                uid: "",
                ridername: "",
                phone: "",
                timestamp: new Date(),
                sex: "1",
                headimgurl: "",
                rideridcarzheng: "",
                rideridcarfan: "",
                rideridcarshouchi: "",
                riderjiankang: "",
                iszhuanzhi: "",
                riderstatus: "",
                coin: "",
                rideradress: "",
                riderhelpname: "",
                riderhelpphone: "",
                accountstatus: "0",
                money: "",
                shenhe: "0",
                textarea: "",
            },
            accountstatusOptions: [{ label: "正常", value: "0" }, { label: "停封", value: "1" }],
            dialogFormVisible: false,
            dialogStatus: "",
            textMap: {
                update: "编辑",
                create: "创建",
            },

            dialogImageUrl: '',
            dialogVisible: false,
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
        // handleDel(row, index) {
        //     this.$confirm("确定要删除该骑手?", "提示", {
        //         confirmButtonText: "确定",
        //         cancelButtonText: "取消",
        //         type: "warning",
        //         center: true,
        //     })
        //         .then(() => {
        //             this.$message({
        //                 type: "success",
        //                 message: "删除成功!",
        //             });
        //             this.list.splice(index, 1);
        //         })
        //         .catch(() => {
        //             this.$message({
        //                 type: "info",
        //                 message: "已取消删除",
        //             });
        //         });
        // },
        handleEdit(index, row) { // 编辑
            console.log('row---_>>>', row);
            this.temp = Object.assign({}, row); // copy obj
            this.temp.timestamp = new Date(this.temp.timestamp);
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
        handleClick(tab, event) {
            console.log(tab, event);
        },

        handlePictureCardPreview(imgsrc) { // 图片预览
            this.dialogImageUrl = imgsrc;
            this.dialogVisible = true;
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
        addCoin() {
            this.dialogVisible = true;
        },
        configCoin() {
            if (this.$isEmpty(this.temp.money)) {
                this.$message({
                    message: '请输入充值金额',
                    type: "error",
                });
                return;
            }
            let data = {
                uid: this.temp.id,
                shifunum: this.temp.money,
            }
            this.listLoading = true;
            recharge(data).then((res) => {
                if (res.errcode == 0) {
                    let coin = Number(this.temp.coin) + Number(this.temp.money);
                    this.temp.coin = coin;
                    this.dialogVisible = false;
                    this.listLoading = false;
                    this.$message({
                        message: '充值成功',
                        type: "success",
                    });

                } else {
                    this.$message({
                        message: res.errmsg,
                        type: "error",
                    });
                }
            });
        }
    },
};