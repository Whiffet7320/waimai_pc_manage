import Pagination from "@/components/Pagination";
import { getTaskList, addTask, delTask } from "@/api/market";
import waves from "@/directive/waves"; // waves directive

export default {
    directives: { waves },
    components: { Pagination },
    data() {
        return {
            listQuery: {
                page: 1,
                limit: 10,
                total: 0,
                iszhuanzhi: false,
                isjianzhi: false,
                begintime: "",
                endtime: "",
            },
            addQuery: {
                title: '',
                text: '',
                dannum: '',
                jiangli: '',
                iszhuanzhi: false,
                isjianzhi: false,
                begintime: "",
                endtime: "",
            },
            timevalue: "",
            downloadLoading: false,
            list: [],
            addcoupondialog: false,
        };
    },
    created() {
        this.resetpage();
    },
    methods: {
        addCoupon() {
            this.addcoupondialog = true
            this.addQuery.title = '';
            this.addQuery.text = '';
            this.addQuery.dannum = '';
            this.addQuery.jiangli = '';
            this.addQuery.begintime = '';
            this.addQuery.endtime = '';
            this.timevalue = "";
        },
        handleFilter() { // 查询
            // this.status = tab.name;
            // this.listQuery.page = 1;
            this.resetpage();
        },
        resetpage() {
            this.listQuery.page = 1;
            this.getList();
        },
        getList() {
            this.listLoading = true;
            this.listQuery['zhuanzhi'] = this.listQuery.iszhuanzhi ? 'ok' : '';
            this.listQuery['jianzhi'] = this.listQuery.isjianzhi ? 'ok' : '';
            getTaskList(this.listQuery).then((res) => {
                if (res.errcode == 0) {
                    this.list = res.data.list;
                    this.listQuery.total = res.data.count;
                    this.listLoading = false;
                } else {
                    this.$message({
                        message: res.errmsg,
                        type: "error",
                    });
                }
            });
        },
        addtap() { // 添加
            if (this.$isEmpty(this.addQuery.title)) return this.$message.error('请输入任务名称');
            if (this.$isEmpty(this.addQuery.dannum) || this.$isEmpty(this.addQuery.jiangli)) return this.$message.error('请输入任务条件');
            if (this.$isEmpty(this.timevalue)) return this.$message.error('请选择有效时间');
            this.addQuery.text = '规定时间内完成' + this.addQuery.dannum + '单，奖励' + this.addQuery.jiangli + '元';
            this.addQuery.begintime = this.timevalue[0] / 1000;
            this.addQuery.endtime = this.timevalue[1] / 1000;
            this.addQuery['zhuanzhi'] = this.addQuery.iszhuanzhi ? 'ok' : '';
            this.addQuery['jianzhi'] = this.addQuery.isjianzhi ? 'ok' : '';
            addTask(this.addQuery).then((res) => {
                if (res.errcode == 0) {
                    this.$message.success('添加成功');
                    this.addcoupondialog = false;
                    this.resetpage();
                } else {
                    this.$message({
                        message: res.errmsg,
                        type: "error",
                    });
                }
            });
        },
        handleDel(row) { // 发放优惠券
            let data = {
                id: row.id,
            };
            delTask(data).then((res) => {
                if (res.errcode == 0) {
                    this.$message.success('删除成功');
                    this.addcoupondialog = false;
                    this.resetpage();
                } else {
                    this.$message({
                        message: res.errmsg,
                        type: "error",
                    });
                }
            });
        }
    },
};