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
            key: "tuihuobutie",
            changeIndex: "1",
            pingtai: '',
            qishi: '',
        };
    },
    mounted() {
        console.log('list--->>', this.data);
        this.alldata = this.data;
        this.pingtai = this.dataObj.pingtai
        this.qishi = this.dataObj.qishi;
    },
    methods: {
        updateData() { // 编辑保存
            // this.alldata[this.key]['pingtai'] = this.pingtai;
            // this.alldata[this.key]['qishi'] = this.qishi;

            var data = {};
            data[this.key] = {};
            data[this.key]['pingtai'] = this.pingtai;
            data[this.key]['qishi'] = this.qishi;
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