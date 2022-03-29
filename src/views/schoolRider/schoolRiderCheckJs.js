import Pagination from "@/components/Pagination";
import { getStudentCheckList, agreeStudentCheck } from "@/api/rider";
import waves from "@/directive/waves"; // waves directive

export default {
    name: "riderlist",
    directives: { waves },
    components: { Pagination },
    data() {
        return {
            total: 0,
            // 筛选条件
            listQuery: {
                page: 1,
                limit: 10,
                status: "3",
            },
            //数据
            list: [],
            // 编辑弹窗数据
            temp: {
                id: undefined,
                uid: "",
                ridername: "",
                phone: "",
                timestamp: new Date(),
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
                status: "0",
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
        this.getList();
    },
    methods: {
        getList() {
            this.listLoading = true;
            getStudentCheckList(this.listQuery).then((res) => {
                if (res.errcode == 0) {
                    console.log(res);
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
            console.log(this.temp);
            if (this.$isEmpty(this.temp.status)) return this.$message.error('未选择审核类型');
            const tempData = Object.assign({}, this.temp)
            tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
            if (tempData['status'] == "1") {
                tempData['agree'] = 'ok';
            } else {
                tempData['agree'] = 'ng';
            }
            agreeStudentCheck(tempData).then((res) => {
                if (res.errcode == 0) {
                    const index = this.list.findIndex(v => v.id === this.temp.id)
                    this.list.splice(index, 1, this.temp)
                    this.dialogFormVisible = false
                    this.$message.success('操作成功');
                } else {
                    this.$message({
                        message: res.errmsg,
                        type: "error",
                    });
                }
            })
        },
        handleClick(tab, event) {
            this.listQuery.status = tab.name;
            this.getList();
        },

        handlePictureCardPreview(imgsrc) { // 图片预览
            this.dialogImageUrl = imgsrc;
            this.dialogVisible = true;
        },
    },
};