<template>
  <div class="app-container">
    <div class="filter-container">
       <el-button
            class="filter-item"
            type="primary"
            icon="el-icon-download"
            @click="handlAdd()"
          >
            新增
          </el-button>
      <el-table :data="list" style="width: 100%" stripe>
        <el-table-column prop="text" label="内容" align="center">
        </el-table-column>
      
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <span
              @click="handleEdit(scope.$index, scope.row)"
              style="color: #027aff; cursor: pointer"
              >修改</span
            >
            <span
              @click="handleDel(scope.$index, scope.row)"
              style="color: #027aff; cursor: pointer"
              >删除</span
            >
          </template>

        </el-table-column>

        

        

      </el-table>
    </div>

    <!-- 编辑 -->
    <el-dialog title="公告编辑" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left: 50px"
      >
        <el-row class="input-flex">
          <el-col :span="4" style="text-align: right"> 内容: </el-col>
          <el-col :span="19" :push="1">
            <el-input
              v-model="temp.text"
              placeholder="请输入描述"
              style="width: 200px"
              class="filter-item"
            />
          </el-col>
        </el-row>
      
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> 取消 </el-button>
        <el-button
          type="primary"
          @click="updateData()"
        >
          确定
        </el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
export { default } from "./gonggaoJs.js";
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
