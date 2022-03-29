import Pagination from "@/components/Pagination";
import { getwithdrawlist , agreeWithdraw } from "@/api/rider";
import waves from "@/directive/waves"; // waves directive

export default {
  directives: { waves },
  components: { Pagination },
  data() {
    return {
      activeName: "3",
      total: 0,
      // 筛选条件
      listQuery: {
        status: 3,
        page: 1,
        limit: 10
      },
      list: [],
      temp: {
        id: undefined,
        timestamp: new Date(),
        shenhe: "0"
      },
      dialogFormVisible: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      getwithdrawlist(this.listQuery).then(res => {
        if (res.errcode == 0) {
          this.list = res.data.list;
          this.total = res.data.count;
          this.listLoading = false;
        } else {
          this.$message({
            message: res.errmsg,
            type: "error"
          });
        }
      });
    },
    handleEdit(index, row) {
      this.temp = Object.assign({}, row); // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp);
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleClick(tab) {
      this.listQuery.status = tab.name;
      this.listQuery.page = 1;
      this.getList();
    },
    agreetap() {
        if (this.$isEmpty(this.temp.shenhe)) return this.$message.error('未选择审核类型');
        const tempData = Object.assign({}, this.temp);
        tempData.timestamp = +new Date(tempData.timestamp) //; change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
        if (tempData['shenhe'] == "1") {
            tempData['agree'] = 'ok';
        } else {
            tempData["agree"] = "ng";
        }
        agreeWithdraw(tempData).then(res => {
            if (res.errcode == 0) {
            const index = this.list.findIndex(
                v => v.id === this.temp.id
            );
            this.list.splice(index, 1, this.temp);
            this.dialogFormVisible = false;
            this.$message.success("操作成功");
            } else {
            this.$message({
                message: res.errmsg,
                type: "error"
            });
            }
        });
    },
  }
};