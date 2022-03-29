<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column prop="id" label="ID" align="center"> </el-table-column>
      <el-table-column prop="fromnickname" label="举报人" align="center">
      </el-table-column>
      <el-table-column prop="fromphone" label="举报人电话" align="center">
      </el-table-column>
      <el-table-column prop="totitle" label="被举报商家" align="center">
      </el-table-column>
      <el-table-column prop="tophone" label="被举报商家电话" align="center">
      </el-table-column>
      <el-table-column prop="shoptext" label="举报原因" align="center">
      </el-table-column>
      <el-table-column label="举报时间" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.createtime | formatConversion}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="状态"
        width="300"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1">已处理</span>
          <el-button v-else type="danger" size="small" @click="chulijubao(scope)">
            处理
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagination
      :total="listQuery.total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { getjubaolist, caozuojubao } from "@/api/store";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination";
import DonMessage from "@/utils/message";

export default {
  name: "ComplexTable",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      list: [],
      listQuery: {
        page: 1,
        limit: 10,
        total: 10,
        status: 2
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      getjubaolist(this.listQuery).then(response => {
        console.log(response, "分类列表");
        if (response.errcode == 0) {
          this.list = response.data.list;
          this.listQuery.total = response.data.count;
          this.listLoading = false;
        } else {
          DonMessage.success(res.errmsg || "请求失败");
        }
      });
    },
    chulijubao(item){
      caozuojubao({id:item.row.id}).then(response => {
        if (response.errcode == 0) {
          this.$message.success('处理成功');
          this.listQuery.page = 1;
          this.getList();
          this.listLoading = false;
        } else {
          DonMessage.success(res.errmsg || "请求失败");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-table--group,
.el-table--border {
  margin-top: 30px;
}
</style>
