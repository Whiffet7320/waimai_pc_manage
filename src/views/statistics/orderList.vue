<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 头部搜索 -->
      <el-row :gutter="20">
        <el-col :span="8"
          ><div class="input-flex">
            <div class="left">会员ID：</div>
            <el-input
              v-model="listQuery.uid"
              placeholder="请输入会员ID"
              style="width: 200px"
              class="filter-item"
            /></div
        ></el-col>
        <el-col :span="8">
          <div class="input-flex">
            会员等级：
            <el-select
              v-model="listQuery.level"
              style="width: 150px"
              class="filter-item"
            >
              <el-option
                v-for="item in lvlOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="input-flex">
            下单次数：
            <el-select
              v-model="listQuery.xiadannum"
              style="width: 150px"
              class="filter-item"
            >
              <el-option
                v-for="item in xiadannumOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
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
            会员余额：
            <el-input
              v-model="listQuery.mincoin"
              placeholder=""
              style="width: 90px"
              class="filter-item"
            />
            <span style="margin: 0 10px">至</span>
            <el-input
              v-model="listQuery.maxcoin"
              placeholder=""
              style="width: 90px"
              class="filter-item"
            />
          </div>
        </el-col>
        <el-col :span="8">
          <div class="input-flex">
            消费行为：
            <el-cascader
              v-model="listQuery.xiaofevalue"
              :options="xiaofeioptions"
              @change="xiaofeiChange"
            ></el-cascader>
          </div>
        </el-col>
        <!-- <el-col :span="8">
          <div class="input-flex">
            收款方式：
            <el-select
              v-model="listQuery.placeorder"
              style="width: 150px"
              class="filter-item"
            >
              <el-option
                v-for="item in placeorderOptions"
                :key="item"
                :value="item"
              />
            </el-select>
          </div>
        </el-col> -->
      </el-row>

      <el-row :gutter="20">
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
        <el-col :span="8">
          <el-radio-group v-model="listQuery.tabDay" class="input-flex">
            <el-radio-button label="1">今日</el-radio-button>
            <el-radio-button label="2">本周</el-radio-button>
            <el-radio-button label="3">本月</el-radio-button>
          </el-radio-group>
        </el-col>
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
      <el-table-column prop="id" label="用户ID" align="center">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" align="center">
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
      <el-table-column prop="coin" label="余额" align="center">
      </el-table-column>
      <el-table-column label="用户状态" align="center">
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
            >详情</el-button
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
          <el-col :span="4" style="text-align: right"> 用户ID: </el-col>
          <el-col :span="19" :push="1">
            {{ temp.uid }}
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="4" style="text-align: right"> 昵称: </el-col>
          <el-col :span="19" :push="1">
            <el-input
              v-model="temp.nickname"
              placeholder="请输入会员账号"
              style="width: 200px"
              class="filter-item"
            />
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="4" style="text-align: right"> 联系电话: </el-col>
          <el-col :span="19" :push="1">
            {{ temp.phone }}
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="4" style="text-align: right"> 注册时间: </el-col>
          <el-col :span="19" :push="1">
            {{ temp.createtime | formatConversion }}
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="4" style="text-align: right"> 账户余额: </el-col>
          <el-col :span="19" :push="1"> ￥{{ temp.coin }} </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="4" style="text-align: right"> 封号: </el-col>
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
  </div>
</template>

<script>
export { default } from "./orderListJs.js";
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
