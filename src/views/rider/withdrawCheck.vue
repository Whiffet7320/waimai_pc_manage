<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 头部搜索 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="3"></el-tab-pane>
        <el-tab-pane label="待审核" name="0"></el-tab-pane>
        <el-tab-pane label="已通过" name="1"></el-tab-pane>
        <el-tab-pane label="已拒绝" name="2"></el-tab-pane>
      </el-tabs>
    </div>

    <el-table
      :data="list"
      v-loading="listLoading"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      style="width: 100%"
      stripe
    >
      <el-table-column prop="" label="时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createtime | formatConversion }}
        </template>
      </el-table-column>
      <el-table-column prop="uid" label="ID" align="center">
      </el-table-column>
      <el-table-column label="类型" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.usertype == 1">用户</span>
          <span v-if="scope.row.usertype == 2">商家</span>
          <span v-if="scope.row.usertype == 3">骑手</span>
        </template>
      </el-table-column>
      <el-table-column label="金额" align="center">
        <template slot-scope="scope">
          <span style="color:red;">￥{{ scope.row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提现方式" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 1">微信</span>
          <span v-else>银行卡</span>
        </template>
      </el-table-column>
      <el-table-column label="真实姓名" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 2">{{ scope.row.yhknickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="银行名称" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 2">{{ scope.row.yhkname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支行名称" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 2">{{ scope.row.yhkyh }}</span>
        </template>
      </el-table-column>
      <el-table-column label="银行卡号" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 2">{{ scope.row.yhknum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            style="margin: 0"
            type="primary"
            v-if="scope.row.status == 0"
            >操作</el-button
          >
          <span v-if="scope.row.status == 1">已通过</span>
          <span v-if="scope.row.status == 2">已拒绝</span>
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

    <el-dialog title="提现详情" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left: 50px"
      >
        <el-row class="input-flex">
          <el-col :span="5" style="text-align: right"> ID: </el-col>
          <el-col :span="19" :push="1">
            <span>{{ temp.uid }}</span>
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="5" style="text-align: right"> 联系电话: </el-col>
          <el-col :span="19" :push="1">
            <span>{{ temp.phone }}</span>
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="5" style="text-align: right"> 提现金额: </el-col>
          <el-col :span="19" :push="1">
            <span style="color:red;">￥{{ temp.num }}</span>
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="5" style="text-align: right"> 提现方式: </el-col>
          <el-col :span="19" :push="1">
            <span v-if="temp.type == 1">微信</span>
            <span v-else>银行卡</span>
          </el-col>
        </el-row>
        <el-row class="input-flex" v-if="temp.type == 2">
          <el-col :span="5" style="text-align: right"> 真实姓名: </el-col>
          <el-col :span="19" :push="1">
            {{ temp.yhknickname }}
          </el-col>
        </el-row>
        <el-row class="input-flex" v-if="temp.type == 2">
          <el-col :span="5" style="text-align: right"> 开户银行: </el-col>
          <el-col :span="19" :push="1">
            {{ temp.yhkname }}
          </el-col>
        </el-row>
        <el-row class="input-flex" v-if="temp.type == 2">
          <el-col :span="5" style="text-align: right"> 开户支行: </el-col>
          <el-col :span="19" :push="1">
            {{ temp.yhkyh }}
          </el-col>
        </el-row>
        <el-row class="input-flex" v-if="temp.type == 2">
          <el-col :span="5" style="text-align: right"> 银行卡号: </el-col>
          <el-col :span="19" :push="1">
            {{ temp.yhknum }}
          </el-col>
        </el-row>

        <el-row class="input-flex">
          <el-col :span="5" style="text-align: right"> 审核: </el-col>
          <el-col :span="19" :push="1">
            <el-radio v-model="temp.shenhe" label="1">通过</el-radio>
            <el-radio v-model="temp.shenhe" label="2">拒绝</el-radio>
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="5" style="text-align: right"></el-col>
          <el-col :span="19" :push="1">
            <el-input
              v-if="temp.shenhe == 2"
              type="textarea"
              :rows="2"
              placeholder="请输入拒绝原因"
              v-model="temp.textarea"
            >
            </el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="agreetap()">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export { default } from "./withdrawCheckJs.js";
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
