<template>
  <div class="app-container">
    <div class="filter-container">
        <el-col :span="8">
          <el-button
            class="filter-item"
            type="primary"
            icon="el-icon-search"
            @click="handlejiesuan"
          >
            结算
          </el-button>
         
        </el-col>
    </div>
    <el-table :data="list" style="width: 100%" stripe>
      <el-table-column prop="phone" label="手机号码" align="center">
         
      </el-table-column>
      <el-table-column prop="coin" label="账户内金额" align="center">
      </el-table-column>
      <el-table-column prop="yijiesuan" label="已结算金额" align="center">
      </el-table-column>
      <el-table-column prop="yitixian" label="已提现金额" align="center">
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
import { getShopAndQishouList,jiesuan } from "@/api/money";
export default {
  components: { Pagination },
  data() {
    return {
      total: 0,
      // 筛选条件
      listQuery: {
        page: 1,
        limit: 10,
        from:2
      },
      //数据
      list: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handlejiesuan(){
        jiesuan({'from':2}).then(res => {
           this.$message({
              message: res.msg,
              type: "success"
            });
        });
    }, 
    getList() {
      this.listLoading = true;
      getShopAndQishouList(this.listQuery).then(res => {
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
