<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 头部搜索 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="input-flex">
            充值类型：
            <el-select
              v-model="listQuery.rechargetype"
              style="width: 150px"
              class="filter-item"
            >
              <el-option
                v-for="item in rechargetypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <el-radio-group v-model="listQuery.tabDay" class="input-flex">
            <el-radio-button label="1">今日</el-radio-button>
            <el-radio-button label="2">本周</el-radio-button>
            <el-radio-button label="3">本月</el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="8">
          <div class="input-flex">
            注册时间：
            <el-date-picker
              v-model="listQuery.timefilter"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              style="width: 250px"
              value-format="timestamp"
            >
            </el-date-picker>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-button
            v-waves
            class="filter-item"
            type="primary"
            icon="el-icon-search"
            @click="handleFilter"
          >
            查询
          </el-button>
          <el-button
            v-waves
            :loading="downloadLoading"
            class="filter-item"
            type="primary"
            icon="el-icon-download"
            @click="handleDownload"
          >
            导出
          </el-button>
        </el-col>
      </el-row>
    </div>

    <el-table :data="list" style="width: 100%" stripe>
      <el-table-column prop="uid" label="充值ID" align="center">
      </el-table-column>
      <el-table-column prop="num" label="充值金额" align="center">
      </el-table-column>
      <el-table-column prop="zengsong" label="赠送金额" align="center">
      </el-table-column>
      <el-table-column prop="desc" label="类型" align="center">
      </el-table-column>
      <el-table-column prop="" label="充值时间" align="center">
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
      @pagination="getlist"
    />

  </div>
</template>

<script>
export { default } from "./rechargelistJs.js";
</script>
<style lang="scss" scoped>
.input-flex {
  display: flex;
  align-items: center;
  height: 50px;
  line-height: 50px;
  .left {
    width: 80px;
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
