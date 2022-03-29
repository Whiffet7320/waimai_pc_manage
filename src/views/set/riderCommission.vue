<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 头部搜索 -->
      <el-radio-group v-model="commissionindex" style="margin-bottom: 30px">
        <el-radio-button label="1">提成模板</el-radio-button>
        <el-radio-button label="2">绩效原则</el-radio-button>
      </el-radio-group>
    </div>

    <div v-if="commissionindex == 1">
      <el-button type="primary">添加模版</el-button>

      <el-table :data="list" style="width: 100%" stripe>
        <el-table-column prop="id" label="序号" align="center">
        </el-table-column>
        <el-table-column prop="nickname" label="模版名称" align="center">
        </el-table-column>
        <el-table-column prop="phone" label="模版详情" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <span
              @click="handleEdit(scope.$index, scope.row)"
              style="color: #027aff"
              >通过</span
            >
            <span
              @click="handleEdit(scope.$index, scope.row)"
              style="margin-left: 20px; color: red"
              >拒绝</span
            >
            <span
              @click="handleEdit(scope.$index, scope.row)"
              style="margin-left: 20px"
              >设为默认</span
            >
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

    <div v-else class="yuanze">
      <div class="yuanzebox">
        <span>骑手绩效计算规则，</span>
        <input type="text" />
        <span>公里以内为，</span>
        <input type="text" />
        <span>单，每超出</span>
        <input type="text" />
        <span>公里增加</span>
        <input type="text" />
        <span>单</span>
      </div>

      <el-button type="primary" class="btn">保存</el-button>
    </div>

    <!-- 编辑/添加 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left: 50px"
      >
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
export { default } from "./riderCommissionJs.js";
</script>
<style lang="scss" scoped>
.yuanze {
  .yuanzebox {
    display: flex;
    align-items: center;
    input {
      border: none;
      width: 50px;
      border-bottom: 1px solid #666;
      text-align: center;
    }
  }
  .btn {
    margin: 50px 0 0 50px;
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
