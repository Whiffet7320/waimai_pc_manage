import Pagination from "@/components/Pagination";
import { editMoban } from "@/api/set";
import waves from "@/directive/waves"; // waves directive

export default {
    directives: { waves },
    components: { Pagination },
    props: {
        dataObj: {
            type: Object, // 属性类型
            default: {} // 默认值
        },
    },
    data() {
        return {
            key: "riderfenrule",
            qujian: {},
            songda: {},
            kehu: {},
            huoyuefen: {},
        };
    },
    mounted() {
        console.log(this.dataObj);
        this.qujian = this.dataObj.qujian;
        this.songda = this.dataObj.songda;
        this.kehu = this.dataObj.kehu;
        this.huoyuefen = this.dataObj.huoyuefen;
    },
    methods: {
        updateData() { // 编辑保存
            var item = {}
            item[this.key] = {}
            item[this.key]['qujian'] = this.qujian;
            item[this.key]['songda'] = this.songda;
            item[this.key]['kehu'] = this.kehu;
            item[this.key]['huoyuefen'] = this.huoyuefen;
            console.log(item)
            editMoban(JSON.stringify(item)).then((res) => {
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