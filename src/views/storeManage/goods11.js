import Pagination from "@/components/Pagination";
import { goodsListApi, cateListApi } from "@/api/store";
import waves from "@/directive/waves"; // waves directive

export default {
  name: "GoodsList",
  directives: { waves },
  components: {
    Pagination,
    FuncFormsEdit: () => import("@/components/FuncFormsEdit/FuncFormsEdit")
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
        tabDay: "0"
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      downloadLoading: false,
      //数据
      goodsList: [],
      showAddGoods: false,
      isAttr: false,
      attrList: [], //规格
      specArr: [],
      goodsItem: {
        id: "",
        name: "",
        img: "", //缩略图
        nowprice: 0,
        oldprice: 0,
        category_id: "",
        keywords: "", //搜索关键词
        desc: "", //描述
        content: "", //富文本
        sort: 0,
        is_attr: 0, //是否多规格
        banner: [],
        canhe: 0,
        dandianpeisong: 0,
        specs: "" //多规格
      },
      keywords: "",
      dandianpeisong: true,
      cateList: [], //商品类型
      bannerList: [],
      dialogTitle: 1
    };
  },
  mounted() {
    this.getCateList();
  },
  methods: {
    getCateName(id) {
      if (!id) return "";
      let cateTtem = this.cateList.find(ele => {
        return ele.id == id;
      });
      return cateTtem.name;
    },
    getCateList() {
      cateListApi({
        page: 1,
        limit: 100,
        store_id: 176158,
        // uid: this.$route.query.storeid
      }).then(res => {
        if (res.errcode == 0) {
          this.cateList = res.data.list;
          this.getGoodsList();
        } else {
          this.$message({
            message: res.errmsg,
            type: "error"
          });
        }
      });
    },
    // 获取商品列表
    getGoodsList() {
      this.listQuery.store_id = 176158;
      this.listQuery.uid = 176158;
      goodsListApi(this.listQuery).then(res => {
        if (res.errcode == 0) {
          this.goodsList = res.data.list;
        } else {
          this.$message({
            message: res.errmsg,
            type: "error"
          });
        }
      });
    },
    clearList() {
      this.listQuery.page = 1;
      this.goodsList = [];
    },
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
    }
  }
};
