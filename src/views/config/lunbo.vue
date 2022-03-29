<template>
    <el-row type="flex" class="row-bg" :gutter="10">
        <el-col :xs="15" :sm="15" :md="10" :lg="8" :xl="6">
            <el-form
                ref="ruleForm"
                label-width="120px"
                class="demo-ruleForm"
            >
                
                <el-form-item label="第一张图:" prop="img1">
                    <el-upload
                        ref="upload"
                        class="avatar-uploader"
                        action
                        :show-file-list="false"
                        :auto-upload="false"
                        :on-change="(file) => uploadimg(file, 'img1')"
                    >
                        <img v-if="img1" :src="img1" class="avatar" style="width: 200px;"/>
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>

                <el-form-item label="第二张图:" prop="img1">
                    <el-upload
                        ref="upload"
                        class="avatar-uploader"
                        action
                        :show-file-list="false"
                        :auto-upload="false"
                        :on-change="(file) => uploadimg(file, 'img2')"
                    >
                        <img v-if="img2" :src="img2" class="avatar" style="width: 200px;"/>
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>

                <el-form-item label="第三张图:" prop="img1">
                    <el-upload
                        ref="upload"
                        class="avatar-uploader"
                        action
                        :show-file-list="false"
                        :auto-upload="false"
                        :on-change="(file) => uploadimg(file, 'img3')"
                    >
                        <img v-if="img3" :src="img3" class="avatar" style="width: 200px;"/>
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
import { getBase64, upload } from "@/api/upload";
import {getbanner,setbanner} from "@/api/config"
export default {
    name: "Deploy",
    data() {
        return {
            img1:"",
            img2:"",
            img3:"",
        };
    },
    beforeMount() {
        this.reuqestInfo();
    },
    methods: {
        reuqestInfo() {
           getbanner().then((response) => {
                console.log(response);
                if (response.errcode == 0) {
                    if(response.img1){
                        this.img1 = response.img1
                    }
                    if(response.img2){
                        this.img2 = response.img2
                    }
                    if(response.img3){
                        this.img3 = response.img3
                    }
                } else {
                    this.$message({
                        message: response.errmsg,
                        type: "error",
                    });
                }
                this.listLoading = false;
            }); 
        }, 
        submitForm(){
            if(this.img1 == "" || this.img2=="" || this.img3==""){
                this.$message({
                    message: '请上传图片',
                    type: "error",
                });
                return
            }
            setbanner(this.img1,this.img2,this.img3).then((response) => {
                console.log(response);
                if (response.errcode == 0) {
                    this.$message({
                        message: '上传成功',
                        type: "success",
                    });
                } else {
                    this.$message({
                        message: response.errmsg,
                        type: "error",
                    });
                }
                this.listLoading = false;
            }); 
        },
        uploadimg(file, imgtype) {
            var self = this;
            getBase64(file.raw).then((res) => {
                if (res == "") {
                    this.$message({
                        message: "您没有选择图片",
                        type: "warning",
                    });
                    return;
                }
                var data = { info: res };
                const basedData = data.info.split(",");
                upload({ info: basedData[1] }).then((res) => {
                    if (res.errcode == 0) {
                        this.$message({
                            message: "上传成功",
                            type: "success",
                        });
                        if(imgtype == 'img1'){
                            self.img1 = res.src;
                        }
                        if(imgtype == 'img2'){
                            self.img2 = res.src;
                        }
                        if(imgtype == 'img3'){
                            self.img3 = res.src;
                        }
                    } else {
                        this.$message({
                            message: res.errmsg,
                            type: "error",
                        });
                    }
                });
            });
        },
    },
};
</script>

<style>
.row-bg {
    padding: 30px;
}

.form_item_label {
    color: "#13ce66";
}

.btop {
    border-top: 1px solid #cccccc;
}
.avatar-uploader{
    height: 150px;
    width: 200px;
    border: 1px solid #ccc;
}
.el-upload{
    width: 100% !important;
    height: 100% !important;
    text-align: center;
    line-height: 150px;
}
</style>
