<template>
    <div class="app-container">
        <div class="filter-container">
            <el-button class="addBtn" type="primary" @click="dialogVisible = true,dialogType='add'">添加系统消息</el-button>
        </div>
        <el-table
            v-loading="listLoading"
            :data="list"
            border
            fit
            highlight-current-row
            style="width: 100%;"
        >
            <el-table-column label="标题" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.wenti }}</span>
                </template>
            </el-table-column>
            <el-table-column label="内容" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.answer }}</span>
                </template>
            </el-table-column>
            
            <el-table-column label="创建时间" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.createtime!=0?formatConversion(row.createtime):'' }}</span>
                </template>
            </el-table-column>
            
            <el-table-column
                align="center"
                label="状态"
                width="145"
                class-name="small-padding fixed-width"
                fixed="right">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="change(scope)">编辑</el-button>
                    <el-button type="primary" size="small" @click="del(scope)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            :total.sync="listQuery.total"
            @pagination="getlist"
        />
        <el-dialog :title="dialogType === 'edit' ? '编辑' : '添加'" :visible.sync="dialogVisible">
            <el-form>
                <el-form-item label="标题">
                    <el-input v-model="details.wenti" placeholder="请输入标题" />
                </el-form-item>
                
                <el-form-item label="内容">
                    <el-input type="textarea" v-model="details.answer" placeholder="请输入内容" />
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="toWait()">确 认</el-button>
              </div>
        </el-dialog>
    </div>
</template>

<script>
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { getBase64, upload } from "@/api/upload";
import { createmessage,getmessagelist,changemessage,delmessage } from "@/api/article"
export default {
    name: "ComplexTable",
    components: { Pagination },
    directives: { waves },
    data() {
        return {
            dialogType:'add',
            listLoading: false,
            list:[],
            wayOptions: [],
            listQuery: {
                page: 1,
                limit: 10,
                total:0,
                time:"",
                title:"",
            },
            dialogVisible:false,
            type:'all',
            details:{
                title:'',
                answer:''
            },
            index:0
        }
        
    },
    created() {
        this.getlist()
    },
    watch: {

    }, 
    methods: {
        del(scope){
            this.$confirm('是否确认删除该消息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.listLoading = true;
                delmessage(scope.row.id).then((response) => {
                    console.log(response);
                    if (response.errcode == 0) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getlist()
                    } else {
                        this.$message({
                            message: response.errmsg,
                            type: "error",
                        });
                    }
                    this.listLoading = false;
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        change(scope){
            console.log(scope)
            this.dialogType = 'edit'
            this.index = scope.$index
            this.details = scope.row
            this.dialogVisible = true
        },
        toWait(){
            var self = this
            console.log(this.details)
            if(this.dialogType == 'edit'){
                changemessage(this.details).then((response) => {
                    console.log(response);
                    if (response.errcode == 0) {
                        this.$set(this.list, this.index, this.details)
                    } else {
                        this.$message({
                            message: response.errmsg,
                            type: "error",
                        });
                    }
                    this.listLoading = false;
                    self.dialogVisible = false
                });
            }else{
                createmessage(this.details).then((response) => {
                    console.log(response);
                    if (response.errcode == 0) {
                        self.getlist()
                    } else {
                        this.$message({
                            message: response.errmsg,
                            type: "error",
                        });
                    }
                    this.listLoading = false;
                    self.dialogVisible = false
                }); 
            }
            
            
        },
        getlist(){
            var self = this
            this.listLoading = true;
            var data = this.listQuery
            data.count = this.listQuery.limit
            data.from = (this.listQuery.page-1)*this.listQuery.limit+1
            data.type = self.type
            data.starttime = ""
            data.endtime = ""
            if(this.listQuery.time != ''){
                data.starttime = Math.floor(this.listQuery.time[0]/1000)
                data.endtime = Math.floor(this.listQuery.time[1]/1000)
            }
            console.log(data)
            
            getmessagelist(data).then((response) => {
                console.log(response, "列表");
                if (response.errcode == 0) {
                    self.list = response.data.list
                    self.listQuery.total = Number(response.data.count)
                } else {
                    this.$message({
                        message: response.errmsg,
                        type: "error",
                    });
                }
                self.listQuery.time = ""
                self.listQuery.title = ""
                this.listLoading = false;
            });
        },
    },
};
</script>
<style lang="scss" scoped>
.el-table--group,.el-table--border {
    margin-top: 30px;
}
.el-form-item__label {
    width: 120px;
}
.el-form-item__content {
    margin-left: 120px !important;
}

.imgSeation {
    text-align: left;
}
.avatar1 {
    display: inline-block;
    width: 33%;
    height: auto;
}
.inpMar {
    width: 80%;
    margin-bottom: 5px;
}
.newFormatView {
    margin-top: 20px;
    border: 1px solid #eee;
    padding: 10px;
}
.newFormatView .el-form-item {
    margin-top: 10px;
}
.avatar-uploader1 {
    height: 80px;
}
.avatar-uploader-icon1 {
    width: 80px;
    height: 80px;
    line-height: 80px;
}
.avatar1 {
    width: 80px;
    height: 80px;
}
.imgCarousel-uploader,
.imgCarousel {
    width: 80px;
    height: 80px;
    position: relative;
    margin: 5px;
}

.imgCarousel-uploader .el-upload {
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    display: flex;
}

.imgCarousel:hover > div {
    display: flex;
}

.imgCarousel > img {
    width: 100%;
    height: 100%;
}

.imgCarousel > div {
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2;
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.el-table--group,
.el-table--border {
  margin-top: 30px;
}
.filter-container {
    display:inline-block;
    width:100%;
}
.filter-container .timeBox {
    display:inline-block;
    float:left;
    margin-right:30px;
}
.filter-container .block{
    display:inline-block;
    margin-right:30px;
}
.demonstration {
  font-size: 15px;
  color: #606266;
  margin-top: 5px;
}
</style>
