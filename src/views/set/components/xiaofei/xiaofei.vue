<template>
  <div class="app-container">
    <div class="filter-container">
      <el-table :data="list" style="width: 100%" stripe>
        <el-table-column prop="id" label="序号" align="center">
        </el-table-column>
        <el-table-column prop="text" label="描述" align="center">
        </el-table-column>
        <el-table-column prop="coin" label="加价" align="center">
        </el-table-column>
        <el-table-column prop="fencheng" label="骑手分成" align="center">
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
          <el-col :span="4" style="text-align: right"> 描述: </el-col>
          <el-col :span="19" :push="1">
            <el-input
              v-model="temp.text"
              placeholder="请输入描述"
              style="width: 200px"
              class="filter-item"
            />
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="4" style="text-align: right"> 额外加价: </el-col>
          <el-col :span="19" :push="1">
            <el-input
              v-model="temp.coin"
              style="width: 200px"
              class="filter-item"
            />元
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="4" style="text-align: right"> 骑士分成: </el-col>
          <el-col :span="19" :push="1">
            <el-input
              v-model="temp.fencheng"
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
export { default } from "./xiaofeiJs.js";
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
