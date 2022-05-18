import Pagination from "@/components/Pagination";
import { getUserList, getFiltersUserList } from "@/api/user";
import { fenghao } from "@/api/user";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from '@/utils';
import { setshopconfig } from "@/api/store";

export default {
  name: "Userlist",
  directives: { waves },
  components: { Pagination },
  data() {
    return {
      total: 0,
      // 筛选条件
      listQuery: {
        type: 2,// 1-用户。 2-商家。 3-骑手
        page: 1,
        limit: 10,
        id: "",
        shopname: "",
        shoptitle: "",
        phone: "",
        timefilter: ""
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
      list: [],
      // 编辑弹窗数据
      temp: {
        id: undefined,
        type: 2,
        timestamp: new Date()
      },
      accountstatusOptions: [
        { label: "正常", value: "0" },
        { label: "停封", value: "1" }
      ],
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "创建"
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      getUserList(this.listQuery).then(res => {
        if (res.errcode == 0) {
          this.list = res.list;
          this.total = res.count;
          this.listLoading = false;
        } else {
          this.$message({
            message: res.errmsg,
            type: "error"
          });
        }
      });
    },
    getFiltersUserList() {
      this.listLoading = true;
      getFiltersUserList(this.listQuery).then(res => {
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
            type: "error"
          });
        }
      });
    },
    handleEdit(index, row) {
      // 编辑
      this.temp = Object.assign({}, row); // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp);
      console.log("this.temp--->>>", this.temp);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    updateData() {
      this.dialogFormVisible = false;

      setshopconfig(this.temp).then((res) => {
        if (res.errcode == 0) {
          const index = this.list.findIndex(v => v.id === this.temp.id)
          this.list.splice(index, 1, this.temp)
          console.log(this.temp,"======")
          this.$message.success('操作成功');
        } else {
            this.$message({
                message: res.errmsg,
                type: "error",
            });
        }
    })
      
     
    },
    fenghao(index, row) {
      var data = {
        uid: row.id
      };
      fenghao(data).then(res => {
        if (res.errcode == 0) {
          console.log(res);
          this.$set(this.list, index, res.data.user); // 更新数据
          this.$notify({
            title: "",
            message: "更新成功",
            type: "success",
            duration: 2000
          });
        } else {
          this.$message({
            message: res.errmsg,
            type: "error"
          });
        }
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      delete (this.listQuery['daochu']);
      this.getFiltersUserList();
    },
    handleDownload() {
      this.listQuery.page = 1;
      this.listQuery.daochu = 'ok';
      this.getFiltersUserList();
    },
    exportexcel() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = [
          "店铺ID",
          "商家姓名",
          "店铺名称",
          "联系电话",
          "店铺logo",
          "上级ID",
          "店铺状态",
          "注册时间"
        ];
        const filterVal = [
          "id",
          "shopname",
          "shoptitle",
          "shopphone",
          "shoplogo",
          "shangji",
          "accountstatus",
          "createtime"
        ];
        const list = this.list;
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "storeList",
          autoWidth: true,
          bookType: "xlsx"
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
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
        })
      );
    },
    godetails(row) {
      console.log(row.id);
      this.$router.push({
        path: "/storeManage/goodslist",
        query: {
          storeid: row.id
        }
      });
    }
  }
};
