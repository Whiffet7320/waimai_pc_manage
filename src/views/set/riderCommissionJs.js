import Pagination from "@/components/Pagination";
import { getUserList, getFiltersUserList, editUserInfo } from "@/api/user";
import waves from "@/directive/waves"; // waves directive

export default {
    name: "Userlist",
    directives: { waves },
    components: { Pagination },
    data() {
        return {
            commissionindex: 1,
            total: 0,
            // 筛选条件
            listQuery: {
                page: 1,
                limit: 10,
            },
            //数据
            list: [],
            temp: {},
            dialogFormVisible: false,
            dialogStatus: "",
            textMap: {
                update: "编辑",
                create: "创建",
            },
        };
    },
    created() {
        // this.getUserList();
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
    },
};