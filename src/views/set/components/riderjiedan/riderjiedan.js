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
            key: "riderjiedan",
            changeIndex: "1",
            juli: '',
        };
    },
    mounted() {
        this.juli = this.dataObj.juli/1000;
    },
    methods: {
        updateData() { // 编辑保存
            var item = {}
            item['riderjiedan'] = {}
            item['riderjiedan']['juli'] = Number(this.juli)*1000
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