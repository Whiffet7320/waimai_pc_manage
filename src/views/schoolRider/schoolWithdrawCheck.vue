<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 头部搜索 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="0"></el-tab-pane>
        <el-tab-pane label="待审核" name="1"></el-tab-pane>
        <el-tab-pane label="已通过" name="2"></el-tab-pane>
        <el-tab-pane label="已拒绝" name="3"></el-tab-pane>
      </el-tabs>
    </div>

    <el-table :data="list" style="width: 100%" stripe>
      <el-table-column prop="" label="时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createtime | formatConversion }}
        </template>
      </el-table-column>

      <el-table-column prop="ridername" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="金额" align="center">
      </el-table-column>
      <el-table-column prop="shangji" label="银行" align="center">
      </el-table-column>
      <el-table-column prop="shangji" label="银行卡号" align="center">
      </el-table-column>
      
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <span @click="handleEdit(scope.$index, scope.row)" style="color:#027AFF">通过</span>
          <span @click="handleEdit(scope.$index, scope.row)" style="margin-left:20px;color:red">拒绝</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagination
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getUserList"
    />
  </div>
</template>

<script>
export { default } from "./schoolWithdrawCheckJs.js";
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
