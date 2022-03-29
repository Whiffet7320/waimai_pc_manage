import Pagination from "@/components/Pagination";
import { changInfoWx, changInfoPhone } from "@/api/set";
import waves from "@/directive/waves"; // waves directive

export default {
    name: "Userlist",
    directives: { waves },
    components: { Pagination },
    data() {
        return {
            changeIndex: "1",
            listQuery: {
                uid: "",
                phone: "",
            },
        };
    },
    created() {
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab.name);
            this.changeIndex = tab.name;
            this.listQuery.uid = '';
            this.listQuery.phone = '';
        },
        configtap() {
            console.log('this.listQuery.uid---->>', this.listQuery.uid);
            if (this.listQuery.uid == '') return this.$message.error('请输入会员ID');
            if (this.changeIndex == 1) {
                if (this.listQuery.phone == '') return this.$message.error('请输入新手机号');
            }
            this.$confirm("此操作不可恢复，确认执行?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                center: true,
            }).then(() => {
                if (this.changeIndex == 1) {
                    this.chagePhone();
                } else {
                    this.chageWx();
                }
            }).catch(() => { });
        },
        chagePhone() {
            this.listLoading = true;
            changInfoPhone(this.listQuery).then((res) => {
                this.listLoading = false;
                if (res.errcode == 0) {
                    this.$message.success('操作成功')
                    this.listQuery.uid = '';
                    this.listQuery.phone = '';
                } else {
                    this.$message.error(res.errmsg);
                }
            });
        },
        chageWx() {
            this.listLoading = true;
            changInfoWx(this.listQuery).then((res) => {
                this.listLoading = false;
                if (res.errcode == 0) {
                    this.$message.success('操作成功')
                } else {
                    this.$message.error(res.errmsg);
                }
            });
        }
    },
};