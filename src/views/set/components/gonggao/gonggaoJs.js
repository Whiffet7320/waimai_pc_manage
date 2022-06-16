import Pagination from "@/components/Pagination";
import { webgonggaolist,webgonggaomanage,delgonggao } from "@/api/set";
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
            list:[],
            temp:{
                id:"",
                text:""
            },
            dialogFormVisible:false,
        };
    },
    mounted() {
        this.list = this.getData()
    },
    methods: {
        getData(){
            webgonggaolist().then( (res=>{
                console.log(res,"========")
                this.list = res.list
            }) )
        },
        handlAdd(index, row){
            this.temp.id = ""
            this.temp.text = ""
            console.log(index,row,"=======")
            this.dialogFormVisible = true
          
        },
        handleEdit(index, row){
            this.temp.id = row._id
            console.log(index,row,"--------")
            this.dialogFormVisible = true
            this.temp.text = row.text
            
        },
        handleDel(index,row){
            console.log('this is del',row._id)
            delgonggao({"id":row._id}).then( (res)=>{
                this.$message({
                    message: res.msg,
                    type: 'success'
                });
                this.getData()
            })
        },
        updateData() { // 编辑保存           
            webgonggaomanage( this.temp ).then((res) => {
                if (res.errcode == 0) {
                    this.dialogFormVisible = false
                    this.$message.success('成功');
                    this.getData()
                    
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