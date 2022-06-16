import Pagination from "@/components/Pagination";
import { addGoodsApi, cateListApi, goodsListApi, upGoodsApi, deleGoodsApi, editGoodsApi } from "@/api/shop";
import waves from "@/directive/waves"; // waves directive
import { uploadimgtooss, getBase64 } from "@/utils/uploadoss.js"
import FuncFormsEdit from "@/components/FuncFormsEdit/FuncFormsEdit copy"

export default {
    name: "GoodsList",
    directives: { waves },
    components: {
        Pagination,
        FuncFormsEdit
        // FuncFormsEdit: () => import("@/components/FuncFormsEdit"),
    },
    data() {
        return {
            total: 0,
            // 筛选条件
            listQuery: {
                type: 0,
                from: 1,
                count: 10,
                goodsId: "",
                orderId: "",
                timefilter: "",
                tabDay: '0',
            },
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
            goodsList: [],
            showAddGoods: false,
            isAttr: false,
            attrList: [],//规格
            specArr: [],
            goodsItem: {
                id: '',
                name: '',
                img: '', //缩略图
                nowprice: '',
                oldprice: '',
                category_id: '',
                keywords: '', //搜索关键词
                desc: '', //描述
                content: '', //富文本
                sort: '',
                is_attr: 0, //是否多规格
                banner: [],
                canhe: 0,
                dandianpeisong: 0,
                specs: ''  //多规格
            },
            keywords: '',
            dandianpeisong: true,
            cateList: [],//商品类型
            bannerList: [],
            dialogTitle: 1
        };
    },
    mounted() {
        this.getCateList();
        // this.getGoodsList()
    },
    methods: {
        // 通过id获取分类名称
        getCateName(id) {
            if (!id) return ''
            let cateTtem = this.cateList.find((ele) => {
                return ele.id == id
            });
            if(!cateTtem){
              return "该分类被删除"
            }else{
               return cateTtem.name
            }

        },
        // 获取类型列表
        getCateList() {
            cateListApi({ page: 1, limit: 100, store_id: this.$route.query.storeid,uid: this.$route.query.storeid }).then((res) => {
                if (res.errcode == 0) {
                    this.cateList = res.data.list;
                    this.getGoodsList()
                } else {
                    this.$message({
                        message: res.errmsg,
                        type: "error",
                    });
                }
            });
        },
        // 获取商品列表
        getGoodsList() {
            this.listQuery.store_id = this.$route.query.storeid
            goodsListApi(this.listQuery).then((res) => {
              console.log(res,"======")
                if (res.errcode == 0) {
                    this.goodsList = res.data.list;
                } else {
                    this.$message({
                        message: res.errmsg,
                        type: "error",
                    });
                }
            });
        },
        clearList() {
            this.listQuery.page = 1;
            this.goodsList = [];
        },
        // 商品上下架
        optShelf(item, status) {
            upGoodsApi({storeid:176158, id: item.id, status: status }).then((res) => {
                if (res.errcode == 0) {
                    this.$message({
                        message: '操作成功',
                        type: "success",
                    });
                    item.is_up = status
                } else {
                    this.$message({
                        message: res.errmsg,
                        type: "error",
                    });
                }
            });
        },
        // 商品删除
        delect(index, item) {
            this.$confirm('确认删除该商品?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleGoodsApi({ id: item.id,storeid:this.$route.query.storeid }).then((res) => {
                    if (res.errcode == 0) {
                        this.$message({
                            message: '删除成功',
                            type: "success",
                        });
                        this.goodsList.splice(index, 1)
                    } else {
                        this.$message({
                            message: res.errmsg,
                            type: "error",
                        });
                    }
                });

            }).catch(() => {

            });
        },
        // 修改商品
        edit(item) {
            this.goodsItem = Object.assign({}, item); // copy obj
            this.keywords = this.goodsItem.keywords
            this.showAddGoods = true
            this.dialogTitle = 2
            this.isAttr = this.goodsItem.is_attr == 1
            console.log(item.specs,"======")
            if(this.goodsItem.is_attr == 1){
                this.attrList = item.specs
            }
            
            this.bannerList = JSON.parse(item.banner)
            // this.bannerList = item.banner
            this.createSpec()
        },
        // 添加商品
        handleAdd() {
            this.showAddGoods = true
            this.dialogTitle = 1

            this.goodsItem = {
              storeid:this.$route.query.storeid,
                zhekou:0,
                banjia:0,
                id: '',
                name: '',
                img: '', //缩略图
                nowprice: '',
                oldprice: '',
                category_id: '',
                keywords: '', //搜索关键词
                desc: '', //描述
                content: '', //富文本isAttr
                sort: '',
                is_attr: 0, //是否多规格
                banner: [],
                canhe: 0,
                dandianpeisong: 0,
                specs: ''  //多规格
            }
        },
        // 添加分类名称
        addSpecName() {
            var one = { type: '', role: [] }
            this.attrList.push(one);
        },
        // 点击规格名称加号，添加规格内容
        addOne(index) {
            var two = {
                name: '',
                price: ''
            }
            this.attrList[index].role.push(two)
        },
        // 删除规格
        popOne(index) {
            this.attrList.splice(index, 1)
        },
        // 删除规格内容
        popTwo(index, cindex) {
            this.attrList[index].role.splice(cindex, 1)
        },
        // 生成规格
        createSpec() {
            var specArr = []
            console.log('attrList======>', this.attrList)
            if (this.attrList.length == 0) return this.$message('请添加规格')
            for (var i = 0; i < this.attrList.length; i++) {
                var item = this.attrList[i]

                if (!item.type) return this.$message('请填写规格名称')
                if (item.role.length == 0) return this.$message('请添加规格内容')

                for (var j = 0; j < item.role.length; j++) {

                    var citem = this.attrList[i].role[j]
                    if (!citem.price || !citem.name) return this.$message('请补全规格信息')
                    var specObj = {}
                    specObj.type = item.type
                    specObj.price = citem.price
                    specObj.name = citem.name
                    specArr.push(specObj)

                    this.goodsItem.specs = JSON.stringify(specArr);
                    console.log('规格11=====', this.goodsItem.specs)
                    this.$message('生成成功')
                }
            }


        },
        // 富文本添加
        textChange(e) {
            console.log('富文本====', e)
            this.goodsItem.content = e.html
        },
        //    下架
        offShelf(index, item) {
            this.$confirm('确认下架该商品?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 请求下架接口
            }).catch(() => {

            });
        },
        // 上传规格图片
        uploadFormat(file, fileList, index) {
            getBase64(file.raw).then((res) => {
                var self = this;
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
                        self.attrImg.splice(index, 1, res.src);
                        self.$refs.attrUpload[index].clearFiles();
                    } else {
                        this.$message({
                            message: res.errmsg,
                            type: "error",
                        });
                    }
                });
            });
        },
        // 输入验证
        checkInput() {
            if (!this.goodsItem.name) {
                this.$message("请输入商品名称");
                return false
            }
            if (!this.goodsItem.sort) {
                this.$message("请输入商品排序");
                return false
            }
            if (!this.goodsItem.img) {
                this.$message("请上传商品缩略图");
                return false
            }
            if (!this.goodsItem.nowprice) {
                this.$message("请输入商品现价");
                return false
            }
            if (!this.goodsItem.oldprice) {
                this.$message("请输入商品原价");
                return false
            }
            if (!this.goodsItem.category_id) {
                this.$message("请选择商品分类");
                return false
            }
            if (!this.keywords) {
                this.$message("请输入搜索关键词");
                return false
            }
            if (!this.goodsItem.desc) {
                this.$message("请输入商品描述");
                return false
            }
            if (!this.goodsItem.content) {
                this.$message("请输入商品详细内容");
                return false
            }
            if (this.bannerList.length == 0) {
                this.$message("请上传轮播图");
                return false
            }
            return true
        },
        // 确认添加商品/修改
        onConfirm() {
            if (!this.checkInput()) return
            if (this.isAttr && this.goodsItem.specs == '') return this.$message("请生成规格");
            console.log(this.isAttr)
            this.goodsItem.keywords = JSON.stringify(this.keywords.split(","))
            this.goodsItem.dandianpeisong = this.dandianpeisong ? 0 : 1
            this.goodsItem.is_attr = this.isAttr ? 1 : 0
            this.goodsItem.banner = JSON.stringify(this.bannerList)
            this.goodsItem.storeid = this.$route.query.storeid;
            if (this.dialogTitle == 1) {
                addGoodsApi(this.goodsItem).then((res) => {
                    if (res.errcode == 0) {
                        this.$message({
                            message: "添加成功",
                            type: "success",
                        });
                        this.showAddGoods = false;
                        this.getGoodsList();
                    } else {
                        this.$message({
                            message: res.errmsg,
                            type: "error",
                        });
                    }
                });

            } else {
                editGoodsApi(this.goodsItem).then((res) => {
                    if (res.errcode == 0) {
                        this.$message({
                            message: "修改成功",
                            type: "success",
                        });
                        this.showAddGoods = false;
                        this.getGoodsList();
                    } else {
                        this.$message({
                            message: res.errmsg,
                            type: "error",
                        });
                    }
                });

            }
        },
        // 上传缩略图
        handleImgSuccess(file) {
            uploadimgtooss(file).then((res) => {
                console.log(res)
                this.goodsItem.img = res
            })
        },
        // 上传轮播图
        handleBannerSuccess(file) {
            console.log('file====', file)
            uploadimgtooss(file).then((res) => {
                console.log('图片====', res)
                this.bannerList.push(res)
            })
        },
        // 查询
        handleFilter() {
            // 搜索
            this.listQuery.page = 1;
            this.getFiltersUserList();
        },
        getFiltersUserList() {
            this.listLoading = true;
            // getFiltersUserList(this.listQuery).then((res) => {
            //     if (res.errcode == 0) {
            //         this.list = res.list;
            //         this.total = res.count;
            //         this.listLoading = false;
            //     } else {
            //         this.$message({
            //             message: res.errmsg,
            //             type: "error",
            //         });
            //     }
            // });
        },
        // 导出
        handleDownload() {
            // 导出excel
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
        onDelect(index) {
            this.bannerList.splice(index, 1)
        }
    },
};
