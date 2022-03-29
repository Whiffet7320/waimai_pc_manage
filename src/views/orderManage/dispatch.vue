<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 头部搜索 -->
      <el-row :gutter="24">
        <el-col :span="8"
          ><div class="input-flex">
            <div class="left">订单号：</div>
            <el-input
              v-model="listQuery.id"
              placeholder="请输入订单号"
              style="width: 200px"
              class="filter-item"
            /></div
        ></el-col>
        <el-col :span="8">
          <div class="input-flex">
            下单时间：
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
          <el-radio-group v-model="listQuery.needdate" class="input-flex">
            <el-radio-button label="1">今日</el-radio-button>
            <el-radio-button label="2">本周</el-radio-button>
            <el-radio-button label="3">本月</el-radio-button>
          </el-radio-group>
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
      </el-row>
    </div>

    <el-table
      :data="list"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      style="width: 100%"
      stripe
    >
      <el-table-column prop="id" label="订单号" align="center">
      </el-table-column>
      <el-table-column label="发货信息" align="center">
        <template slot-scope="scope"> ￥{{ scope.row.price }} </template>
      </el-table-column>
      <!-- <el-table-column prop="phone" label="用户昵称" align="center">
      </el-table-column> -->
      <el-table-column prop="origin.name" label="收货信息" align="center">
      </el-table-column>
      <el-table-column prop="" label="下单时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createtime | formatConversion }}
        </template>
      </el-table-column>
      <el-table-column label="订单状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">待付款</span>
          <span v-else>已付款</span>
        </template>
      </el-table-column>

      <el-table-column label="订单状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.status | orderStatus }}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            style="margin: 0"
            type="primary"
            >派单</el-button
          >
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

    <el-dialog title="派单" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="left"
        label-width="70px"
      >
        <div class="searchqishou">
          <el-input
            placeholder="请输入骑手名称或电话"
            class="inputwidth"
            v-model="searchKey"
          ></el-input>
          <el-button slot="reference" type="primary" @click="searchRider">搜索</el-button>
        </div>

        <el-table
          :data="qishoulist"
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
          height="500px"
          stripe
          @row-click="selectRider"
        >
          <el-table-column prop="ridername" label="骑手名称" align="center">
          </el-table-column>
          <el-table-column prop="phone" label="骑手手机号" align="center">
          </el-table-column>

          <el-table-column prop="dangqiandan" label="普通单数" align="center">
          </el-table-column>
          <el-table-column prop="yuyuedan" label="预约单数" align="center">
          </el-table-column>
          <el-table-column label="当前状态" align="center">
            <template slot-scope="scope">
              <span v-if="$isEmpty(scope.row.dangqiandan)">空闲</span>
              <span v-else>配送中</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <!-- <el-radio v-model="radio" :label="scope.row.id" name=""></el-radio> -->
              <img
                class="select"
                src="../../assets/image/wxz.png"
                v-if="selectRiderId != scope.row.id"
                alt=""
              />
              <img
                class="select"
                src="../../assets/image/xz.png"
                v-else
                alt=""
              />
            </template>
          </el-table-column>
        </el-table>
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
export { default } from "./dispatchJs.js";
</script>
<style lang="scss" scoped>
.select {
  width: 20px;
}
.searchqishou {
  // padding: 15px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
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
    width: 80px;
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
</style>
