import { checkRecharge,recharge } from "@/api/user";
export default {
    data() {
        return {
            listQuery: {
                uid: "",
                phone: "",
                shifunum: "",
                zengsong: "",
            },
            actindex: 1,
            userdata: {},
        };
    },
    created() {
    },
    methods: {
        nexttwo() {
            if (this.$isEmpty(this.listQuery.uid)) {
                this.$message({
                    message: '请输入充值账号',
                    type: "error",
                });
                return;
            }
            this.listLoading = true;
            checkRecharge(this.listQuery).then((res) => {
                if (res.errcode == 0) {
                    console.log(res);
                    this.userdata = res.data.user;
                    this.actindex = 2;
                    this.listLoading = false;
                } else {
                    this.$message({
                        message: res.errmsg,
                        type: "error",
                    });
                }
            });
        },
        configtap() {
            if (this.$isEmpty(this.listQuery.shifunum)) {
                this.$message({
                    message: '请输入充值金额',
                    type: "error",
                });
                return;
            }
            this.listLoading = true;
            recharge(this.listQuery).then((res) => {
                if (res.errcode == 0) {
                    this.actindex = 3;
                    this.listLoading = false;
                } else {
                    this.$message({
                        message: res.errmsg,
                        type: "error",
                    });
                }
            });
        },

    },
};
