<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 头部搜索 -->
      <el-row :gutter="20">
        <el-col :span="8"
          ><div class="input-flex">
            <div class="left">骑手ID：</div>
            <el-input
              v-model="listQuery.uid"
              placeholder="请输入骑手ID"
              style="width: 200px"
              class="filter-item"
            /></div
        ></el-col>
        <el-col :span="8">
          <div class="input-flex">
            联系电话：
            <el-input
              v-model="listQuery.phone"
              placeholder="请输入电话"
              style="width: 200px"
              class="filter-item"
            />
          </div>
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

      <el-row :gutter="20" style="margin-top: 20px">
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
      <el-table-column prop="id" label="骑手ID" align="center">
      </el-table-column>
      <el-table-column prop="ridername" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" align="center">
      </el-table-column>
      <el-table-column prop="shangji" label="上级ID" align="center">
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.sex == 1">男</span>
          <span v-else>女</span>
        </template>
      </el-table-column>
      <el-table-column prop="coin" label="骑手余额" align="center">
      </el-table-column>
      <el-table-column prop="baozhengjin" label="骑手应缴" align="center">
      </el-table-column>
      <el-table-column label="培训状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.riderpeixunstatus == 0">未培训</span>
          <span v-else>已培训</span>
        </template>
      </el-table-column>
      <el-table-column label="骑手状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.accountstatus == 1">封号</span>
          <span v-else>正常</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="注册时间" align="center">
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
            >操作</el-button
          >
          <!-- 
          <el-button
            size="mini"
            @click="handleDel(scope.$index, scope.row)"
            style="margin: 0"
            type="danger"
            >删除</el-button
          > -->
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
        <el-row class="input-flex">
          <el-col :span="5" style="text-align: right"> 性别: </el-col>
          <el-col :span="19" :push="1">
            <el-radio v-model="temp.sex" label="1">男</el-radio>
            <el-radio v-model="temp.sex" label="2">女</el-radio>
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
            <!-- <el-upload
              ref="upload"
              class="avatar-uploader"
              action
              :show-file-list="false"
              :auto-upload="false"
              :on-change="getheadFile"
            >
              <div class="imgbox">
                <img
                  v-if="temp.headimgurl"
                  :src="temp.headimgurl"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <span
                  v-if="temp.headimgurl"
                  class="imgPre"
                  @click="handlePictureCardPreview(temp.headimgurl)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
              </div>
            </el-upload> -->
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
          <el-col :span="5" style="text-align: right"> 学生证: </el-col>
          <el-col :span="19" :push="1">
            <el-image
              style="width: 100px; height: 100px"
              :src="temp.studentzheng"
              :preview-src-list="[temp.studentzheng]"
            >
            </el-image>
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="5" style="text-align: right"> 专职/兼职: </el-col>
          <el-col :span="19" :push="1">
            <el-radio v-model="temp.iszhuanzhi" label="0">专职</el-radio>
            <el-radio v-model="temp.iszhuanzhi" label="1">兼职</el-radio>
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="5" style="text-align: right"> 允许抢单: </el-col>
          <el-col :span="19" :push="1">
            <el-radio v-model="temp.riderstatus" label="1">是</el-radio>
            <el-radio v-model="temp.riderstatus" label="2">否</el-radio>
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="5" style="text-align: right"> 骑手余额: </el-col>
          <el-col :span="6" :push="1"> ￥{{ temp.coin }} </el-col>
          <el-col :span="13"
            ><span @click="addCoin()" style="cursor: pointer"
              >增加</span
            ></el-col
          >
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
          <el-col :span="5" style="text-align: right"> 培训状态: </el-col>
          <el-col :span="19" :push="1">
            <el-radio v-model="temp.riderpeixunstatus" label="1">完成</el-radio>
            <el-radio v-model="temp.riderpeixunstatus" label="0">未完成</el-radio>
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="5" style="text-align: right"> 封号: </el-col>
          <el-col :span="19" :push="1">
            <el-select v-model="temp.accountstatus" class="filter-item">
              <el-option
                v-for="item in accountstatusOptions"
                :key="item.label"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
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

    <!-- //   图片预览 -->
    <el-dialog :visible.sync="dialogVisible" title="骑手余额" width="500px">
      <div class="addcoinbox">
        <div>
          <span>加补贴：</span>
          <el-input
            v-model="temp.money"
            style="width: 200px"
            class="filter-item"
          />
        </div>
        <el-button class="btn" type="primary" @click="configCoin"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export { default } from "./schoolRiderListJs.js";
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
