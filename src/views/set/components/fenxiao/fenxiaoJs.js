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
            key: "fenxiaomoban",
            utu1: "",
            uts1: "",
            utq1: "",

            stu1: "",
            sts1: "",
            stq1: "",

            qtu1: "",
            qts1: "",
            qtq1: "",


            utu2: "",
            uts2: "",
            utq2: "",

            stu2: "",
            sts2: "",
            stq2: "",

            qtu2: "",
            qts2: "",
            qtq2: "",
        };
    },
    mounted() {
        console.log('list--->>', this.data);
        this.alldata = this.data;
        console.log(this.dataObj);
        this.utu1 = this.dataObj['fenxiaolvl1-1-1'];
        this.uts1 = this.dataObj['fenxiaolvl1-1-2'];
        this.utq1 = this.dataObj['fenxiaolvl1-1-3'];

        this.stu1 = this.dataObj['fenxiaolvl1-2-1'];
        this.sts1 = this.dataObj['fenxiaolvl1-2-2'];
        this.stq1 = this.dataObj['fenxiaolvl1-2-3'];

        this.qtu1 = this.dataObj['fenxiaolvl1-3-1'];
        this.qts1 = this.dataObj['fenxiaolvl1-3-2'];
        this.qtq1 = this.dataObj['fenxiaolvl1-3-3'];


        this.utu2 = this.dataObj['fenxiaolvl2-1-1'];
        this.uts2 = this.dataObj['fenxiaolvl2-1-2'];
        this.utq2 = this.dataObj['fenxiaolvl2-1-3'];

        this.stu2 = this.dataObj['fenxiaolvl2-2-1'];
        this.sts2 = this.dataObj['fenxiaolvl2-2-2'];
        this.stq2 = this.dataObj['fenxiaolvl2-2-3'];

        this.qtu2 = this.dataObj['fenxiaolvl2-3-1'];
        this.qts2 = this.dataObj['fenxiaolvl2-3-2'];
        this.qtq2 = this.dataObj['fenxiaolvl2-3-3'];
    },
    methods: {
        updateData() { // 编辑保存
            // this.alldata[this.key]['fenxiaolvl1-1-1'] = this.utu1;
            // this.alldata[this.key]['fenxiaolvl1-1-2'] = this.uts1;
            // this.alldata[this.key]['fenxiaolvl1-1-3'] = this.utq1;
            // this.alldata[this.key]['fenxiaolvl1-2-1'] = this.stu1;
            // this.alldata[this.key]['fenxiaolvl1-2-2'] = this.sts1;
            // this.alldata[this.key]['fenxiaolvl1-2-3'] = this.stq1;
            // this.alldata[this.key]['fenxiaolvl1-3-1'] = this.qtu1;
            // this.alldata[this.key]['fenxiaolvl1-3-2'] = this.qts1;
            // this.alldata[this.key]['fenxiaolvl1-3-3'] = this.qtq1;

            // this.alldata[this.key]['fenxiaolvl2-1-1'] = this.utu2;
            // this.alldata[this.key]['fenxiaolvl2-1-2'] = this.uts2;
            // this.alldata[this.key]['fenxiaolvl2-1-3'] = this.utq2;
            // this.alldata[this.key]['fenxiaolvl2-2-1'] = this.stu2;
            // this.alldata[this.key]['fenxiaolvl2-2-2'] = this.sts2;
            // this.alldata[this.key]['fenxiaolvl2-2-3'] = this.stq2;
            // this.alldata[this.key]['fenxiaolvl2-3-1'] = this.qtu2;
            // this.alldata[this.key]['fenxiaolvl2-3-2'] = this.qts2;
            // this.alldata[this.key]['fenxiaolvl2-3-3'] = this.qtq2;

            var data = {};
            data[this.key] = {};
            data[this.key]['fenxiaolvl1-1-1'] = this.utu1;
            data[this.key]['fenxiaolvl1-1-2'] = this.uts1;
            data[this.key]['fenxiaolvl1-1-3'] = this.utq1;
            data[this.key]['fenxiaolvl1-2-1'] = this.stu1;
            data[this.key]['fenxiaolvl1-2-2'] = this.sts1;
            data[this.key]['fenxiaolvl1-2-3'] = this.stq1;
            data[this.key]['fenxiaolvl1-3-1'] = this.qtu1;
            data[this.key]['fenxiaolvl1-3-2'] = this.qts1;
            data[this.key]['fenxiaolvl1-3-3'] = this.qtq1;

            data[this.key]['fenxiaolvl2-1-1'] = this.utu2;
            data[this.key]['fenxiaolvl2-1-2'] = this.uts2;
            data[this.key]['fenxiaolvl2-1-3'] = this.utq2;
            data[this.key]['fenxiaolvl2-2-1'] = this.stu2;
            data[this.key]['fenxiaolvl2-2-2'] = this.sts2;
            data[this.key]['fenxiaolvl2-2-3'] = this.stq2;
            data[this.key]['fenxiaolvl2-3-1'] = this.qtu2;
            data[this.key]['fenxiaolvl2-3-2'] = this.qts2;
            data[this.key]['fenxiaolvl2-3-3'] = this.qtq2;
            editMoban(JSON.stringify(data)).then((res) => {
                if (res.errcode == 0) {
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