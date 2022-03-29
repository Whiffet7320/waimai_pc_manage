import Pagination from "@/components/Pagination";
import { editMoban } from "@/api/set";
import waves from "@/directive/waves"; // waves directive

export default {
    directives: { waves },
    components: { Pagination },
    props: {
        data: {
            type: Object, // 属性类型
            default: {} // 默认值
        },
        dataObj: {
            type: Object, // 属性类型
            default: {} // 默认值
        },
    },
    data() {
        return {
            key: "jiajimoban",
            changeIndex: "1",
            listQuery: {
                uid: "",
                phone: "",
            },
            alldata: {},
            list: [],
            temp: {
                id: undefined,
                text: "",
                coin: "",
                fencheng: "",
                timestamp: new Date(),
            },
            dialogFormVisible: false,
            dialogStatus: "",
            textMap: {
                update: "编辑",
                create: "创建",
            },
        };
    },
    mounted() {
        console.log('list--->>', this.data);
        this.alldata = this.data;
        this.list = [];
        for (let key in this.dataObj) {
            this.list.push(this.dataObj[key]);
        }
        console.log(this.list);
    },
    methods: {
        handleEdit(index, row) {
            this.temp = Object.assign({}, row); // copy obj
            this.temp.timestamp = new Date(this.temp.timestamp);
            this.dialogStatus = "update";
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs["dataForm"].clearValidate();
            });
        },
        updateData() { // 编辑保存
            const tempData = Object.assign({}, this.temp)
            tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
            // this.alldata[this.key]['item' + tempData['id']] = tempData;
            var data = {};
            data[this.key] = {};
            data[this.key]["item" + tempData["id"]] = tempData;
            editMoban(JSON.stringify(data)).then((res) => {
                if (res.errcode == 0) {
                    const index = this.list.findIndex(v => v.id === this.temp.id)
                    this.list.splice(index, 1, this.temp)
                    this.dialogFormVisible = false
                    this.$message.success('修改成功');
                } else {
                    this.$message({
                        message: res.errmsg,
                        type: "error",
                    });
                }
            })
        },
    },
};