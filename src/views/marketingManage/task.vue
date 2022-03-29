<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 头部搜索 -->
      <el-row :gutter="24">
        <el-col :span="8"
          ><div class="input-flex">
            <div class="left">有效时间：</div>
            <el-date-picker
              style="width: 250px"
              v-model="timevalue"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="timestamp"
            >
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="input-flex">
            适用骑手：
            <el-checkbox v-model="listQuery.iszhuanzhi">专职</el-checkbox>
            <el-checkbox v-model="listQuery.isjianzhi">兼职</el-checkbox>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="24">
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
          class="filter-item"
          type="primary"
          @click="addCoupon"
          style="margin-left: 20px"
        >
          添加
        </el-button>
      </el-row>
    </div>

    <el-table
      :data="list"
      style="width: 100%"
      stripe
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
    >
      <!-- <el-table-column prop="id" label="任务ID" align="center">
      </el-table-column> -->
      <el-table-column prop="title" label="任务名称" align="center">
      </el-table-column>
      <el-table-column label="任务单数" align="center">
        <template slot-scope="scope">
          {{ scope.row.dannum }}
        </template>
      </el-table-column>
      <el-table-column label="任务奖励" align="center">
        <template slot-scope="scope">
          {{ scope.row.jiangli }}
        </template>
      </el-table-column>
      <el-table-column label="有效时间" align="center">
        <template slot-scope="scope">
          <div>{{ scope.row.begintime | formatConversion }}</div>
          至
          <div>{{ scope.row.endtime | formatConversion }}</div>
        </template>
      </el-table-column>

      <el-table-column label="骑手类型" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.iszhuanzhi == '1'" style="margin-right:10px">专职</span>
          <span v-if="scope.row.isjianzhi == '1'">兼职</span>
        </template>
      </el-table-column>

      <!-- <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <span @click="handleDel(scope.row)" style="color: #027aff">删除</span>
        </template>
      </el-table-column> -->
    </el-table>

    <!-- 分页 -->
    <pagination
      :total="listQuery.total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <!-- 添加 -->
    <el-dialog title="添加任务" :visible.sync="addcoupondialog" width="50%">
      <el-form ref="dataForm" :model="addQuery">
        <el-row :gutter="24">
          <el-col :span="24">
            <div class="input-flex">
              <div class="left">任务名称：</div>
              <el-input
                class="input"
                v-model="addQuery.title"
                placeholder="请输入任务名称"
              ></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <div class="input-flex">
              <div class="left">选择时间：</div>
              <el-date-picker
                style="width: 250px"
                v-model="timevalue"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="timestamp"
              >
              </el-date-picker>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <div class="input-flex">
              适用骑手类型：
              <el-checkbox v-model="addQuery.iszhuanzhi">专职</el-checkbox>
              <el-checkbox v-model="addQuery.isjianzhi">兼职</el-checkbox>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="24">
            <div class="input-flex">
              <div class="left">使用条件：</div>
              <div>
                <span>规定时间内完成</span>
                <el-input
                  class="input"
                  type="number"
                  v-model="addQuery.dannum"
                  style="width: 80px"
                ></el-input>
                <span>单，奖励</span>
                <el-input
                  class="input"
                  type="number"
                  v-model="addQuery.jiangli"
                  style="width: 80px"
                ></el-input>
                <span>元</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addcoupondialog = false"> 取消 </el-button>
        <el-button @click="addtap" type="primary">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export { default } from "./taskJs.js";
</script>
<style lang="scss" scoped>
.searchqishou {
  // padding: 15px;
  display: flex;
  align-items: center;
  .inputwidth {
    width: 250px;
    margin-right: 10px;
  }
}
.qishouname {
  display: flex;
  flex-wrap: wrap;
  max-width: 360px;
  margin-top: 20px;
  .qishou {
    width: 80px;
    height: 30px;
    background: #ececec;
    color: #000000;
    line-height: 30px;
    text-align: center;
    border-radius: 5px;
    margin-bottom: 10px;
    margin-right: 5px;
    cursor: pointer;
  }
  .act {
    background: #0ccca7;
  }
}

.input-flex {
  display: flex;
  align-items: center;
  height: 50px;
  line-height: 50px;
  .left {
    width: 100px;
    text-align: left;
  }
  .input {
    width: 200px;
  }
}
.detailsbox {
  display: flex;
  align-items: center;
  height: 40px;
  .leftitlte {
    font-weight: bold;
    font-size: 14px;
    width: 70px;
    text-align: right;
  }
}

.addrdeta {
  border: 1px solid #01cc00;
  padding: 3px 5px;
  border-radius: 5px;
  color: #01cc00;
  font-size: 12px;
  margin-left: 20px;
  cursor: pointer;
}
</style>
