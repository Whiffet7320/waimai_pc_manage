<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 头部搜索 -->
      <el-tabs v-model="listQuery.status" @tab-click="handleClick">
        <el-tab-pane label="全部" name="3"></el-tab-pane>
        <el-tab-pane label="待审核" name="0"></el-tab-pane>
        <el-tab-pane label="已通过" name="1"></el-tab-pane>
        <el-tab-pane label="已拒绝" name="2"></el-tab-pane>
      </el-tabs>
    </div>

    <el-table :data="list" style="width: 100%" stripe>
      <el-table-column prop="uid" label="骑手ID" align="center">
      </el-table-column>
      <el-table-column prop="ridername" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" align="center">
      </el-table-column>
      <el-table-column label="配送方式" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.vehicle == 1"
            >汽车 {{ scope.row.ridercarnum }}</span
          >
          <span v-else>电动车</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.sex == 1">男</span>
          <span v-else>女</span>
        </template>
      </el-table-column>
      <el-table-column label="工作经历" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.riderjingli == 1">美团</span>
          <span v-else-if="scope.row.riderjingli == 2">饿了么</span>
          <span v-else-if="scope.row.riderjingli == 3">顺丰速运</span>
          <span v-else>暂无工作经历</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="申请时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createtime | formatConversion }}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            style="margin: 0"
            type="primary"
            v-if="scope.row.status == 0"
            >操作</el-button
          >
          <span v-else-if="scope.row.status == 1">已通过</span>
          <span v-else>已拒绝</span>
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
          <el-col :span="5" style="text-align: right"> 骑手姓名: </el-col>
          <el-col :span="19" :push="1">
            <el-input
              v-model="temp.ridername"
              placeholder="请输入骑手姓名"
              style="width: 200px"
              class="filter-item"
              readonly
            />
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="5" style="text-align: right"> 联系电话: </el-col>
          <el-col :span="19" :push="1">
            <el-input
              v-model="temp.phone"
              placeholder="请输入骑手电话"
              style="width: 200px"
              class="filter-item"
              readonly
            />
          </el-col>
        </el-row>
        <el-row class="input-flex input-img">
          <el-col :span="5" style="text-align: right"> 头像: </el-col>
          <el-col :span="19" :push="1">
            <el-image
              style="width: 100px; height: 100px"
              :src="temp.headimgurl"
              :preview-src-list="[temp.headimgurl]"
            >
            </el-image>
          </el-col>
        </el-row>
        <el-row class="input-flex input-img">
          <el-col :span="5" style="text-align: right"> 身份证照片: </el-col>
          <el-col :span="19" :push="1">
            <el-image
              style="width: 100px; height: 100px"
              :src="temp.rideridcarzheng"
              :preview-src-list="[temp.rideridcarzheng]"
            >
            </el-image>
            <el-image
              style="width: 100px; height: 100px"
              :src="temp.rideridcarfan"
              :preview-src-list="[temp.rideridcarfan]"
            >
            </el-image>
            <el-image
              style="width: 100px; height: 100px"
              :src="temp.rideridcarshouchi"
              :preview-src-list="[temp.rideridcarshouchi]"
            >
            </el-image>
          </el-col>
        </el-row>
        <el-row class="input-flex input-img">
          <el-col :span="5" style="text-align: right"> 健康证: </el-col>
          <el-col :span="19" :push="1">
            <el-image
              style="width: 100px; height: 100px"
              :src="temp.riderjiankang"
              :preview-src-list="[temp.riderjiankang]"
            >
            </el-image>
          </el-col>
        </el-row>

        <el-row class="input-flex">
          <el-col :span="5" style="text-align: right"> 地址: </el-col>
          <el-col :span="19" :push="1">
            {{ temp.rideradress }}
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="5" style="text-align: right"> 紧急联系人: </el-col>
          <el-col :span="19" :push="1">
            {{ temp.riderhelpname }}{{ temp.riderhelpphone }}
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="5" style="text-align: right"> 审核: </el-col>
          <el-col :span="19" :push="1">
            <el-radio v-model="temp.status" label="1">通过</el-radio>
            <el-radio v-model="temp.status" label="2">拒绝</el-radio>
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="5" style="text-align: right"></el-col>
          <el-col :span="19" :push="1">
            <el-input
              v-if="temp.status == 2"
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
export { default } from "./riderCheckJs.js";
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
