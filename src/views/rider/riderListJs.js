import Pagination from "@/components/Pagination";
import { getUserList, getFiltersUserList, editRiderInfo, recharge, rechargeJifen } from "@/api/user";
import { getBase64, upload,getmap } from '@/api/upload'
import waves from "@/directive/waves"; // waves directive
import { parseTime } from '@/utils';
import { getriderorderlist } from "@/api/rider";

export default {
    name: "riderlist",
    directives: { waves },
    components: { Pagination },
    data() {
        return {
            total: 0,
            // 筛选条件
            listQuery: {
                uid: "",
                type: 3,// 1-用户。 2-商家。 3-骑手
                page: 1,
                limit: 10,
                id: "",
                phone: "",
                level: "0",
                xiadannum: '0',
                phone: "",
                mincoin: "",
                maxcoin: "",
                timefilter: "",
                tabDay: '0',
                xiaofevalue: '',
            },
            gridData: [],            
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            downloadLoading: false,
            //数据
            list: [],
            // 编辑弹窗数据
            temp: {
                id: undefined,
                type: 3, // 1-用户，2-商家，3-骑手
                uid: "",
                ridername: "",
                phone: "",
                timestamp: new Date(),
                sex: "1",
                headimgurl: "",
                rideridcarzheng: "",
                rideridcarfan: "",
                rideridcarshouchi: "",
                riderjiankang: "",
                iszhuanzhi: "",
                riderstatus: "",
                coin: "",
                rideradress: "",
                riderhelpname: "",
                riderhelpphone: "",
                accountstatus: "0",
                money: "",
                riderfen: "",
                jifen: "",
                fencheng:0,
                fenchengfee:"0"
            },
            accountstatusOptions: [{ label: "正常", value: "0" }, { label: "停封", value: "1" }],
            dialogFormVisible: false,
            dialogStatus: "",
            textMap: {
                update: "编辑",
                create: "创建",
            },

            dialogImageUrl: '',
            dialogVisible: false,
            dialogJifenVisible: false,
            dialogMapVisible:false,
            mapurl:"https://restapi.amap.com/v3/staticmap?markers=-1,https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png,0:120.635399,27.966388&key=db02839d3d4b5cd28ca4f5d631d303db",
            fit:['fill'],
            dialogTableVisible:false
        };
    },
    created() {
        this.getUserList();
    },
    methods: {
        getorderid(detail){
            return detail[0].orderid
        },
        getstatusname(status,type){
            //0待付款  1已付款等待商家接单 2.商家已接单等待骑手接单 3骑手接单去取货 4骑手送货中 5已完成 6已取消
            if(type == 'quhuo' ){
                if(status == 4){
                    return '已取货' 
                }else{
                    return '未取货'
                }
            }

            if(type == 'wancheng'){
                if(status == 5){
                    return '已完成' 
                }else{
                    return '未完成'
                }
            }
           
        },
        getreceiptname(isreceipt){
            if(isreceipt == 1){
                return '未接单'
            }else{
                return '可接单'
            }
        },
        handleOrder(index,row){
            this.dialogTableVisible = true
            getriderorderlist({status:1,rider_id:row.id,from:1,count:10}).then( res => {
                this.gridData = res.data.list
                console.log(this.gridData,"========")
            })
        },
     
        handleMap(index, row){
            this.dialogMapVisible = true
        },
        getUserList() {
            this.listLoading = true;
            getUserList(this.listQuery).then((res) => {
                if (res.errcode == 0) {
                    this.list = res.list;
                    this.total = res.count;
                    this.listLoading = false;
                } else {
                    this.$message({
                        message: res.errmsg,
                        type: "error",
                    });
                }
            });
        },
        getFiltersUserList() {
            this.listLoading = true;
            getFiltersUserList(this.listQuery).then((res) => {
                if (res.errcode == 0) {
                    this.list = res.list;
                    this.total = res.count;
                    this.listLoading = false;
                    if (this.listQuery.hasOwnProperty('daochu')) {
                        this.exportexcel();
                    }
                } else {
                    this.$message({
                        message: res.errmsg,
                        type: "error",
                    });
                }
            });
        },
        handleEdit(index, row) { // 编辑
            this.temp = Object.assign({}, row); // copy obj
            this.temp.timestamp = new Date(this.temp.timestamp);
            this.dialogStatus = "update";
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs["dataForm"].clearValidate();
            });
        },
        updateData() { // 编辑保存
            this.$refs['dataForm'].validate((valid) => {
                if (valid) {
                    const tempData = Object.assign({}, this.temp)
                    tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
                    tempData['uid'] = tempData.id;
                    editRiderInfo(tempData).then((res) => {
                        if (res.errcode == 0) {
                            const index = this.list.findIndex(v => v.id === this.temp.id)
                            this.list.splice(index, 1, this.temp)
                            this.dialogFormVisible = false
                            this.$notify({
                                title: '',
                                message: '更新成功',
                                type: 'success',
                                duration: 2000
                            })
                        } else {
                            this.$message({
                                message: res.errmsg,
                                type: "error",
                            });
                        }
                    })
                }
            })
        },
        handleFilter() {
            // 搜索
            this.listQuery.page = 1;
            delete (this.listQuery['daochu']);
            this.getFiltersUserList();
        },
        // 上传图片
        getheadFile(file, fileList) {
            getBase64(file.raw).then(res => {
                if (!res) return this.$message.warning('您没有选择图片')
                const basedData = res.split(',')
                upload({ info: basedData[1] }).then(res => {
                    if (res.errcode == 0) {
                        this.$message.success('上传成功')
                        this.temp.headimgurl = res.src
                        this.$refs.upload.clearFiles()
                    } else {
                        this.$message.error(res.errmsg)
                    }
                })
            })
        },
        handlePictureCardPreview(imgsrc) { // 图片预览
            this.dialogImageUrl = imgsrc;
            this.dialogVisible = true;
        },
        handleDownload() {
            this.listQuery.page = 1;
            this.listQuery.daochu = 'ok';
            this.getFiltersUserList();
        },
        exportexcel() {
            this.downloadLoading = true;
            import("@/vendor/Export2Excel").then((excel) => {
                const tHeader = ["timestamp", "title", "type", "importance", "status"];
                const filterVal = [
                    "timestamp",
                    "title",
                    "type",
                    "importance",
                    "status",
                ];
                const data = this.formatJson(filterVal);
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: "table-list",
                });
                this.downloadLoading = false;
            });
        },
        addCoin() {
            this.dialogVisible = true;
        },
        addJifen() {
            this.dialogJifenVisible = true;
        },
        configCoin() {
            if (this.$isEmpty(this.temp.money)) {
                this.$message({
                    message: '请输入充值金额',
                    type: "error",
                });
                return;
            }
            let data = {
                uid: this.temp.id,
                shifunum: this.temp.money,
            }
            this.listLoading = true;
            recharge(data).then((res) => {
                if (res.errcode == 0) {
                    let coin = Number(this.temp.coin) + Number(this.temp.money);
                    this.temp.coin = coin;
                    this.dialogVisible = false;
                    this.listLoading = false;
                    this.$message({
                        message: '充值成功',
                        type: "success",
                    });

                } else {
                    this.$message({
                        message: res.errmsg,
                        type: "error",
                    });
                }
            });
        },
        configJifen() {
            if (this.$isEmpty(this.temp.jifen)) {
                this.$message({
                    message: '请输入充值积分',
                    type: "error",
                });
                return;
            }
            let data = {
                uid: this.temp.id,
                fen: this.temp.jifen,
            }

            this.listLoading = true;
            rechargeJifen(data).then((res) => {
                if (res.errcode == 0) {
                    let jifen = Number(this.temp.riderfen) + Number(this.temp.jifen);
                    this.temp.riderfen = jifen;
                    this.dialogJifenVisible = false;
                    this.listLoading = false;
                    this.$message({
                        message: '成功',
                        type: "success",
                    });

                } else {
                    this.$message({
                        message: res.errmsg,
                        type: "error",
                    });
                }
            });
        },
        handleDownload() {
            this.downloadLoading = true
            import('@/vendor/Export2Excel').then(excel => {
                const tHeader = ['骑手ID', '姓名', '手机号', '上级ID', '性别', '骑手余额', '骑手应缴', '培训状态', '骑手状态', '注册时间']
                const filterVal = ['id', 'ridername', 'phone', 'shangji', 'sex', 'coin', 'baozhengjin', 'riderpeixunstatus', 'accountstatus', 'createtime']
                const list = this.list
                const data = this.formatJson(filterVal, list)
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: 'riderList',
                    autoWidth: true,
                    bookType: 'xlsx'
                })
                this.downloadLoading = false
            })
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => {
                if (j === "createtime") {
                    return parseTime(v[j]);
                } else if (j === "riderpeixunstatus") {
                    return v[j] == 0 ? "未培训" : "已培训";
                } else if (j === "accountstatus") {
                    return v[j] == 0 ? "正常" : "封号";
                } else if (j === "sex") {
                    return v[j] == 1 ? "男" : "女";
                } else {
                    return v[j];
                }
            }))
        }
    },
};