import Pagination from "@/components/Pagination";
import { getCouponList, addCoupon, sendCoupon, setCoupon } from "@/api/market";
import waves from "@/directive/waves"; // waves directive

export default {
    name: "Userlist",
    directives: { waves },
    components: { Pagination },
    data() {
        return {
            listQuery: {
                page: 1,
                limit: 10,
                total: 0,
                starttype: '0',
                type: '0',
                name: "",
            },
            isChoujiang:[
              {
                "value": "0",
                "label": "不参与",
              },
              {
                "value": "1",
                "label": "参与",
              }
            ],
            starttypeList: [
                {
                    "value": "0",
                    "label": "全部",
                },
                {
                    "value": "1",
                    "label": "未开始",
                },
                {
                    "value": "2",
                    "label": "使用中",
                },
                {
                    "value": "3",
                    "label": "已结束",
                },
            ],
            typeList: [
                {
                    "value": "0",
                    "label": "全部",
                },
                {
                    "value": "1",
                    "label": "满减",
                },
                {
                    "value": "2",
                    "label": "满折",
                }
            ],
            addQuery: {
                name: '',
                type: '1',
                num: '',
                menkan: '',
                timetype: '1',
                day: '',
                starttime: '',
                endtime: '',
                choujiang_wight:0,
                is_choujiang:0,
                is_xinyonghu:0
            },
            addTypeList: [
                {
                    "value": "1",
                    "label": "折扣券",
                },
                // {
                //     "value": "2",
                //     "label": "现金抵扣券",
                // }
            ],
            addTimeTypeList: [
                {
                    "value": "1",
                    "label": "自定义使用时间",
                },
                {
                    "value": "2",
                    "label": "领券后有效天数",
                },
                {
                    "value": "3",
                    "label": "永久有效",
                }
            ],
            timevalue: "",
            downloadLoading: false,
            //数据
            list: [],
            addcoupondialog: false,
            sendQuery: {
                "id": "",
                "type": "1",
                "xiadannum": "",
                "level": "",
                "mincoin": "",
                "maxcoin": "",
                "num": "",
                "userlist": "",
            },
            sendcoupondialog: false,
            sendTypeList: [
                {
                    "value": "1",
                    "label": "按账号发放",
                },
                {
                    "value": "2",
                    "label": "批量发放",
                }
            ],
        };
    },
    created() {
        this.resetpage();
    },
    methods: {
        addCoupon() {
            this.addcoupondialog = true
            this.addQuery.name = '';
            this.addQuery.type = '1';
            this.addQuery.num = '';
            this.addQuery.menkan = '';
            this.addQuery.timetype = '1';
            this.addQuery.day = '';
            this.addQuery.starttime = '';
            this.addQuery.endtime = '';
            this.timevalue = "";
        },
        handleFilter() { // 查询
            this.resetpage();
        },
        resetpage() {
            this.listQuery.page = 1;
            this.getList();
        },
        getList() {
            this.listLoading = true;
            getCouponList(this.listQuery).then((res) => {
                if (res.errcode == 0) {
                    this.list = res.list;
                    this.listQuery.total = res.count;
                    this.listLoading = false;
                } else {
                    this.$message({
                        message: res.errmsg,
                        type: "error",
                    });
                }
            });
        },
        handleSend(row) { // 发放优惠券
            this.sendQuery.id = row.id;
            this.sendQuery.type = "1";
            this.sendQuery.xiadannum = "";
            this.sendQuery.level = "";
            this.sendQuery.mincoin = "";
            this.sendQuery.maxcoin = "";
            this.sendQuery.userlist = "";
            this.sendQuery.num = "";
            this.sendcoupondialog = true;
        },
        addtap() { // 添加优惠券
            if (this.$isEmpty(this.addQuery.name)) return this.$message.error('请输入名称');
            if (this.$isEmpty(this.addQuery.num)) {
                if (this.addQuery.type == 1) {
                    this.$message.error('请输入折扣数');
                } else {
                    this.$message.error('请输入折扣金额');
                }
                return;
            }
            if (this.addQuery.timetype == 1) {
                if (this.$isEmpty(this.timevalue)) return this.$message.error('请选择有效时间');
                this.addQuery.starttime = this.timevalue[0] / 1000;
                this.addQuery.endtime = this.timevalue[1] / 1000;
            } else if (this.addQuery.timetype == 2) {
                if (this.$isEmpty(this.addQuery.day)) return this.$message.error('请输入有效时间');
            }
            addCoupon(this.addQuery).then((res) => {
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
        sendtap() { // 发放优惠券
            sendCoupon(this.sendQuery).then((res) => {
                if (res.errcode == 0) {
                    this.$message.success('发放成功');
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
        handleStop(row, type) {
            let data = {
                id: row.id,
                isstop: type,
            }
            setCoupon(data).then((res) => {
                if (res.errcode == 0) {
                    this.$message.success('操作成功');
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
        handleDel(row) {
            this.$confirm("此操作不可恢复，确认执行?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                center: true,
            }).then(() => {
                this.del(row);
            }).catch(() => { });
        },
        del(row) {
            let data = {
                id: row.id,
                isstop: row.isstop,
                isdel: "ok",
            }
            setCoupon(data).then((res) => {
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
