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
            price: '',
            rider: '0',
        };
    },
    mounted() {
        this.price = this.dataObj.price;
        this.rider = this.dataObj.rider;
    },
    methods: {
        updateData() { // 编辑保存
            if(Number(this.rider) > 100){
                this.$message({
                    message: '抽成比例不能大于100',
                    type: "error",
                });
                return;
            }
            if(Number(this.rider) < 0){
                this.$message({
                    message: '抽成比例不能小于于0',
                    type: "error",
                });
                return;
            }
            var item = {}
            item['riderjiedan'] = {}
            item['riderjiedan']['price'] = Number(this.price)
            item['riderjiedan']['rider'] = Number(this.rider)
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