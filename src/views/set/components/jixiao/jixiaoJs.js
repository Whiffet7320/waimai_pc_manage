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
        jixiaoObj: {
            type: Object, // 属性类型
            default: {} // 默认值
        },
    },
    data() {
        return {
            key: "ridermoban",
            key1: "jixiaomoban",
            jixiaotype: "1",
            alldata: {},
            list: [],
            listjixiao: [],
            temp: {
                id: undefined,
                zhuanzhifencheng: "",
                jianzhifencheng: "",
                zhuanzhibuzhu: "",
                jianzhibuzhu: "",
                zhuanzhitype: "0",
                jianzhitype: "0",
                zhuanzhi: false,
                jianzhi: false,
                zhuanzhicoin: "",
                jianzhicoin: "",
                timestamp: new Date(),
            },
            tempjixiao: {
                id: undefined,
                meijigongli: "",
                weijidan: "",
                meichaochu: "",
                zengjiadan: "",
                timestamp: new Date(),
            },
            dialogFormVisible: false,
            dialogStatus: "",
            textMap: {
                update: "编辑",
                create: "创建",
            },
            jixiaodialogStatus: '',
            jixiaodialogFormVisible: false,
        };
    },
    mounted() {
        console.log('list--->>', this.data);
        this.alldata = this.data;
        this.list = [];
        for (let key in this.dataObj) {
            this.list.push(this.dataObj[key]);
        }

        this.listjixiao = [];
        for (let key1 in this.jixiaoObj) {
            this.listjixiao.push(this.jixiaoObj[key1]);
        }
    },
    methods: {
        fenchengEdit(index, row) {
            row['zhuanzhi'] = row.zhuanzhitype == '0' ? false : true;
            row['jianzhi'] = row.jianzhitype == '0' ? false : true;
            this.temp = Object.assign({}, row); // copy obj
            this.temp.timestamp = new Date(this.temp.timestamp);
            this.dialogStatus = "update";
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs["dataForm"].clearValidate();
            });
        },
        fenchengUpdate() { // 编辑保存
            this.temp['zhuanzhitype'] = this.temp.zhuanzhi ? "1" : "0";
            this.temp['jianzhitype'] = this.temp.jianzhi ? "1" : "0";
            const tempData = Object.assign({}, this.temp)
            tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464

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
        jixiaoEdit(index, row) {
            this.tempjixiao = Object.assign({}, row); // copy obj
            this.tempjixiao.timestamp = new Date(this.tempjixiao.timestamp);
            this.jixiaodialogStatus = "update";
            this.jixiaodialogFormVisible = true;
            // this.$nextTick(() => {
            // this.$refs["dataForm"].clearValidate();
            // });
        },
        jixiaoUpdate() { // 编辑保存
            const tempData = Object.assign({}, this.tempjixiao)
            tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464

            var data = {};
            data[this.key1] = {};
            data[this.key1]["item" + tempData["id"]] = tempData;
            editMoban(JSON.stringify(data)).then((res) => {
                if (res.errcode == 0) {
                    const index = this.listjixiao.findIndex(v => v.id === this.tempjixiao.id)
                    this.listjixiao.splice(index, 1, this.tempjixiao)
                    this.jixiaodialogFormVisible = false
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