
import { waimaizhipai } from "@/api/set";

export default {
    name: "waimaizhipai",
    data() {
        return {
            orderid: 0,
            qishouid: 0,
        };
    },
    methods: {
        onSubmit() {
            var item = {}
            item['orderid'] = this.orderid
            item['qishouid'] = this.qishouid
            waimaizhipai(item).then((res) => {
                if (res.errcode == 0) {
                    this.$message.success('保存成功');
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