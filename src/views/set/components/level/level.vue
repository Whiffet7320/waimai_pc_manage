<template>
  <div class="app-container">
    <div class="filter-container">
      <el-table :data="list" style="width: 100%" stripe>
        <el-table-column prop="id" label="序号" align="center">
        </el-table-column>
        <el-table-column prop="text" label="等级名称" align="center">
        </el-table-column>
        <el-table-column prop="fen" label="升级所需积分" align="center">
        </el-table-column>
        <el-table-column prop="coin" label="保证金" align="center">
        </el-table-column>
        <el-table-column prop="fencheng" label="骑手分成" align="center">
        </el-table-column>
        <el-table-column prop="dan" label="同时接单数" align="center">
        </el-table-column>
        <!-- <el-table-column prop="gongli" label="月公里数" align="center">
        </el-table-column> -->
        <el-table-column prop="miao" label="接单延迟" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <span
              @click="handleEdit(scope.$index, scope.row)"
              style="color: #027aff; cursor: pointer"
              >修改</span
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left: 50px"
      >
        <el-row class="input-flex">
          <el-col :span="6" style="text-align: right"> 等级名称: </el-col>
          <el-col :span="17" :push="1">
            <el-input
              v-model="temp.text"
              placeholder="请输入描述"
              style="width: 200px"
              class="filter-item"
            />
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="6" style="text-align: right"> 升级所需积分: </el-col>
          <el-col :span="17" :push="1">
            <el-input
              v-model="temp.fen"
              style="width: 200px"
              class="filter-item"
            />
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="6" style="text-align: right"> 保证金: </el-col>
          <el-col :span="17" :push="1">
            <el-input
              v-model="temp.coin"
              style="width: 200px"
              class="filter-item"
            />元
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="6" style="text-align: right"> 骑士分成: </el-col>
          <el-col :span="17" :push="1">
            <el-input
              v-model="temp.fencheng"
              style="width: 200px"
              class="filter-item"
            />
            %
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="6" style="text-align: right"> 同时接单数: </el-col>
          <el-col :span="17" :push="1">
            <el-input
              v-model="temp.dan"
              style="width: 200px"
              class="filter-item"
            />
            %
          </el-col>
        </el-row>
        <!-- <el-row class="input-flex">
          <el-col :span="6" style="text-align: right"> 月公里数: </el-col>
          <el-col :span="17" :push="1">
            <el-input
              v-model="temp.gongli"
              style="width: 200px"
              class="filter-item"
            />
            %
          </el-col>
        </el-row> -->
        <el-row class="input-flex">
          <el-col :span="6" style="text-align: right"> 接单延迟(s): </el-col>
          <el-col :span="17" :push="1">
            <el-input
              v-model="temp.miao"
              style="width: 200px"
              class="filter-item"
            />
            %
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> 取消 </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export { default } from "./levelJs.js";
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
</style>
