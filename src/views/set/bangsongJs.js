import { setAgreement, getAgreement } from "@/api/set";

export default {
    components: {
        VueUeditorWrap: () => import("@/components/UEditor/UEditor"),
    },
    data() {
        return {
            form: {
                content: "",
                type: 8,
            },
            formRules: {
                content: [
                    { required: true, message: "请输入内容", trigger: "blur" },
                ],
            },
        };
    },
    created() {
        this.getagreement();
    },
    methods: {
        getagreement() {
            getAgreement(this.form.type).then(res => res.errcode == 0 ? this.form.content = res.data.list.text : this.$message.error(res.errmsg));
        },
        change(event) {
            this.form.content = event;
        },
        onSubmit() {
            console.log(this.form.content);
            if (this.form.content == '') return this.$message.warning("请将内容填写完整");
            this.addFormDataRequest();
        },
        addFormDataRequest() {
            setAgreement(this.form).then(res => res.errcode == 0 ? this.$message.success('操作成功') : this.$message.error(res.errmsg));
        },
    },
};