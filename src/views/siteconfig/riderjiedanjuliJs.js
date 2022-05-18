import { getsiteconfig,setsiteconfig } from "@/api/set";

export default {
    data() {
        return {
            type: "jiedan",
            juli: '',
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
                    this.juli = Number(res.data.riderjiedan_juli)/1000
                }else {
                    this.$message({
                        message: res.errmsg,
                        type: "error",
                    });
                }
            } )
        },
        updateData() { // 编辑保存
            var item = {}
            item['type'] = this.type
            item['riderjiedan_juli'] = Number(this.juli)*1000
           
            setsiteconfig(item).then((res) => {
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