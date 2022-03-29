import {setAgreement } from "@/api/set";

export default {
    components: {
        VueUeditorWrap: () => import("@/components/UEditor/UEditor"),
    },
    data() {
        return {
            form: {
                about: "",
                registe: "",
                teamwork: "",
                privacy: "",
                classroom: "",
                rule: "",
            },
            formRules: {
                about: [
                    { required: true, message: "请输入关于我们协议", trigger: "blur" },
                ],
                registe: [
                    { required: true, message: "请输入注册协议", trigger: "blur" },
                ],
                teamwork: [
                    { required: true, message: "请输入合作协议", trigger: "blur" },
                ],
                privacy: [
                    { required: true, message: "请输入隐私协议", trigger: "blur" },
                ],
                classroom: [
                    { required: true, message: "请输入骑士课堂", trigger: "blur" },
                ],
                rule: [
                    { required: true, message: "请输入骑士规则", trigger: "blur" },
                ],
            },
        };
    },
    created() {
    },
    methods: {
        onSubmit() {
            this.$refs["form"].validate(valid => {
                console.log('valid-=--->', valid);
                if (valid) {
                    this.addFormDataRequest();
                } else {
                    this.$message.warning("请将内容填写完整");
                    return false;
                }
            });
        },
        addFormDataRequest() {
            setAgreement(this.form).then(res => res.errcode == 0 ? this.$message.success('操作成功') : this.$message.error(res.errmsg));
        },
    },
};