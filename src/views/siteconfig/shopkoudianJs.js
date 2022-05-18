
import { getsiteconfig,setsiteconfig } from "@/api/set";

export default {
    name: "shopkoudian",
    data() {
        return {
            key: "koudian",
            koudian: 0,
        };
    },
    created(){
        this.getData();
    },
    methods: {
        getData(){
            getsiteconfig().then( (res)=>{
                console.log(res,"==========")
                if(res.errcode == 0){
                    this.koudian = res.data.koudian
                }else {
                    this.$message({
                        message: res.errmsg,
                        type: "error",
                    });
                }
            } )
        },
        onSubmit() {
            var item = {}
            item['type'] = this.key
            item['koudian'] = this.bili
            setsiteconfig(item).then((res) => {
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