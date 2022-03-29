<template>
  <div class="app-container">
    <el-table :data="list" style="width: 100%" stripe>
      <el-table-column prop="orderid" label="订单ID" align="center">
      </el-table-column>
      <el-table-column prop="uid" label="被抽成人ID" align="center">
      </el-table-column>
      <el-table-column prop="bili" label="抽成比例(%)" align="center">
      </el-table-column>
      <el-table-column prop="num" label="抽成金额" align="center">
      </el-table-column>
      <el-table-column label="类型" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 1">骑手跑腿抽成</span>
          <span v-else-if="scope.row.type == 2">骑手外卖抽成</span>
          <span v-else> 商家外卖抽成</span>
        </template>
      </el-table-column>
      <el-table-column prop="desc" label="描述" align="center">
      </el-table-column>
      <el-table-column prop="" label="创建时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createtime | formatConversion }}
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagination
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { getchoucenglist } from "@/api/money";
export default {
  components: { Pagination },
  data() {
    return {
      total: 0,
      // 筛选条件
      listQuery: {
        page: 1,
        limit: 10
      },
      //数据
      list: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      getchoucenglist(this.listQuery).then(res => {
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
    }
  }
};
</script>
<style lang="scss" scoped>
.addcoinbox {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .btn {
    margin-top: 50px;
  }
}
.input-flex {
  display: flex;
  align-items: center;
  height: 50px;
  line-height: 50px;
  .left {
    width: 80px;
  }
}
.input-img {
  height: auto;
  line-height: normal;

  .imgbox {
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    border: 1px solid #f5f5f5;
    border-radius: 10px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .imgPre {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }
  }
}
.filter-container .timeBox {
  display: flex;
  padding-bottom: 20px;
  justify-content: space-between;
}

.demonstration {
  font-size: 15px;
  color: #606266;
  margin-top: 5px;
}
.cell {
  .el-button {
    // width: 40%;
    margin-bottom: 10px;
  }
}
</style>
