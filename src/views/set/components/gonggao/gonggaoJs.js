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
            key: "gonggao",
            changeIndex: "1",
            gonggao: '',
        };
    },
    mounted() {
        this.alldata = this.data;
        this.gonggao = this.dataObj.item0;
    },
    methods: {
        updateData() { // 编辑保存
            // this.alldata[this.key]['item0'] = this.seconds;

            var data = {};
            data[this.key] = {};
            data[this.key]['item0'] = this.gonggao;
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