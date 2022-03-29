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
        timeObj: {
            type: Object, // 属性类型
            default: {} // 默认值
        },
    },
    data() {
        return {
            key: "positionprice",
            key1: "deliverytime",
            alldata: {},
            list: [],
            tabfilter: 'pos',
            beginMoney: "",
            secondMoney: "",
            lastMoney: "",
            lastMoney: "",
            beginPos: "",
            endPos: "",
            begintime:"",
            secondtime:"",
            lasttime:"",
        };
    },
    mounted() {
        console.log('list--->>', this.data);
        this.alldata = this.data;
        console.log(this.dataObj);
        console.log(this.timeObj);
        this.beginPos = this.dataObj.item0.qibu;
        this.endPos = this.dataObj.item0.zhongjian;
        this.beginMoney = this.dataObj.item0.overstep0;
        this.secondMoney = this.dataObj.item0.overstep1;
        this.lastMoney = this.dataObj.item0.overstep2;

        this.begintime = this.timeObj.overstep0;
        this.secondtime = this.timeObj.overstep1;
        this.lasttime = this.timeObj.overstep2;
    },
    methods: {
        handleClick(tab, event) {
            this.tabfilter = tab.name;
        },
        posconfig() { // 编辑保存
            // this.alldata[this.key]['item0']['qibu'] = this.beginPos;
            // this.alldata[this.key]['item0']['zhongjian'] = this.endPos;
            // this.alldata[this.key]['item0']['overstep0'] = this.beginMoney;
            // this.alldata[this.key]['item0']['overstep1'] = this.secondMoney;
            // this.alldata[this.key]['item0']['overstep2'] = this.lastMoney;

            var data = {};
            data[this.key] = {};
            data[this.key]['item0'] = {};
            data[this.key]['item0']['qibu'] = this.beginPos;
            data[this.key]['item0']['zhongjian'] = this.endPos;
            data[this.key]['item0']['overstep0'] = this.beginMoney;
            data[this.key]['item0']['overstep1'] = this.secondMoney;
            data[this.key]['item0']['overstep2'] = this.lastMoney;
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
        timeconfig() {
            this.alldata[this.key1]['overstep0'] = this.begintime;
            this.alldata[this.key1]['overstep1'] = this.secondtime;
            this.alldata[this.key1]['overstep2'] = this.lasttime;

            editMoban(JSON.stringify(this.alldata)).then((res) => {
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
        }
    },
};
