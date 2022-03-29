<template>
    <el-row type="flex" class="row-bg" :gutter="10">
        <el-col :xs="15" :sm="15" :md="10" :lg="8" :xl="6">
            <el-form
                ref="ruleForm"
                :model="ruleForm"
                :rules="rules"
                label-width="120px"
                class="demo-ruleForm"
            >
                <el-form-item label="科学累积阅读" prop="kexue.yuedu">
                    <el-input v-model="ruleForm.kexue.yuedu" type="number" />
                </el-form-item>
                <el-form-item label="科学累积时长" prop="kexue.shichang">
                    <el-input v-model="ruleForm.kexue.shichang" type="number" />
                </el-form-item>
                <el-form-item label="科学参与人数" prop="kexue.renshu">
                    <el-input v-model="ruleForm.kexue.renshu" type="number" />
                </el-form-item>

                <el-form-item label="人文累积阅读" prop="renwen.yuedu">
                    <el-input v-model="ruleForm.renwen.yuedu" type="number" />
                </el-form-item>
                <el-form-item label="人文累积时长" prop="renwen.shichang">
                    <el-input v-model="ruleForm.renwen.shichang" type="number" />
                </el-form-item>
                <el-form-item label="人文参与人数" prop="renwen.renshu">
                    <el-input v-model="ruleForm.renwen.renshu" type="number" />
                </el-form-item>

                <el-form-item label="地理累积阅读" prop="dili.yuedu">
                    <el-input v-model="ruleForm.dili.yuedu" type="number" />
                </el-form-item>
                <el-form-item label="地理累积时长" prop="dili.shichang">
                    <el-input v-model="ruleForm.dili.shichang" type="number" />
                </el-form-item>
                <el-form-item label="地理参与人数" prop="dili.renshu">
                    <el-input v-model="ruleForm.dili.renshu" type="number" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
import { getDeploy, getAddDeploy } from "@/api/gdzs.js";
import { getBase64, upload } from "@/api/upload";

export default {
    name: "Deploy",
    data() {
        return {
            //
            ruleForm: {
                "kexue": {
                    "yuedu": 0,
                    "shichang": 0,
                    "renshu": 0
                },
                "renwen": {
                    "yuedu": 0,
                    "shichang": 0,
                    "renshu": 0
                },
                "dili": {
                    "yuedu": 0,
                    "shichang": 0,
                    "renshu": 0
                }, 
            },
            rules: {
                "kexue.yuedu": [
                    { required: true, message: "请输入科学累积阅读", trigger: "blur" },
                ],
                "kexue.shichang": [
                    { required: true, message: "请输入科学累积时长", trigger: "blur" },
                ],
                "kexue.renshu": [
                    { required: true, message: "请输入科学参与人数", trigger: "blur" },
                ],

                "renwen.yuedu": [
                    { required: true, message: "请输入人文累积阅读", trigger: "blur" },
                ],
                "renwen.shichang": [
                    { required: true, message: "请输入人文累积时长", trigger: "blur" },
                ],
                "renwen.renshu": [
                    { required: true, message: "请输入人文参与人数", trigger: "blur" },
                ],

                "dili.yuedu": [
                    { required: true, message: "请输入地理累积阅读", trigger: "blur" },
                ],
                "dili.shichang": [
                    { required: true, message: "请输入地理累积时长", trigger: "blur" },
                ],
                "dili.renshu": [
                    { required: true, message: "请输入地理参与人数", trigger: "blur" },
                ],
            },
        };
    },
    beforeMount() {
        this.reuqestInfo();
    },
    methods: {
        reuqestInfo() {
            getDeploy().then((res) => {
                if (res.errcode == 0) {
                  this.ruleForm = res.data;
                  console.log(this.ruleForm, "配置列表");
                } else this.$message.error(res.errmsg);
            });
        }, 
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                  getAddDeploy(JSON.stringify(this.ruleForm)).then((res) =>
                    res.errcode == 0
                      ? this.$message.success("操作成功")
                      : this.$message.error(res.errmsg)
                  );
                } else {
                    this.$message.warning("请将内容填写完整");
                    return false;
                }
            }); 
        }
    },
};
</script>

<style scoped>
.row-bg {
    padding: 30px;
}

.form_item_label {
    color: "#13ce66";
}

.btop {
    border-top: 1px solid #cccccc;
}
</style>