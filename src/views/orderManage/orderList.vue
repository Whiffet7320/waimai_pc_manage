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
            用户昵称：
            <el-input
              v-model="listQuery.username"
              placeholder="请输入用户昵称"
              style="width: 200px"
              class="filter-item"
            />
          </div>
        </el-col>
        <el-col :span="8">
          <div class="input-flex">
            联系电话：
            <el-input
              v-model="listQuery.userphone"
              placeholder="请输入电话"
              style="width: 200px"
              class="filter-item"
            />
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="24">
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
        <!-- <el-col :span="8" style="height: 50px; line-height: 50px">
          <el-popover placement="bottom" title="骑手列表" trigger="click">
            <div class="searchqishou">
              <el-input placeholder="请输入内容" class="inputwidth"></el-input>
              <el-button slot="reference" type="primary">搜索</el-button>
            </div>
            <div class="qishouname">
              <div class="qishou" v-for="(item, index) in qishoulist" :key="index" :class="index == act">{{item.ridername}}</div>
            </div>

            <pagination
              small
              layout="prev, pager, next"
              :total="qishouQuery.total"
              :page.sync="qishouQuery.page"
              :limit.sync="qishouQuery.limit"
              @pagination="getQiShou"
            />

            <el-button slot="reference" type="primary">选择骑手</el-button>
          </el-popover>
        </el-col> -->
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
          :loading="downloadLoading"
          class="filter-item"
          type="primary"
          icon="el-icon-download"
          @click="handleDownload"
        >
          导出
        </el-button>
      </el-row>
    </div>

    <el-tabs v-model="listQuery.status" @tab-click="handleClick">
      <el-tab-pane label="全部" name="6"></el-tab-pane>
      <el-tab-pane label="待付款" name="0"></el-tab-pane>
      <el-tab-pane label="待抢单" name="1"></el-tab-pane>
      <el-tab-pane label="骑手取货" name="2"></el-tab-pane>
      <el-tab-pane label="配送中" name="3"></el-tab-pane>
      <el-tab-pane label="已完成" name="4"></el-tab-pane>
      <el-tab-pane label="已取消" name="5"></el-tab-pane>
    </el-tabs>

    <el-table :data="list" style="width: 100%" stripe>
        <el-table-column label="" width="80" align="center">
        <template slot-scope="scope"> 
            <span style="font-size:14px;color:blue;margin-right:10px;" v-if="scope.row.destination.length > 1">顺单</span>
            <span style="font-size:14px;color:red;margin-right:10px;" v-if="parseInt(scope.row.deliverytime) > 0">预约单</span>
        </template>
      </el-table-column>
      <el-table-column label="订单号" align="center">
        <template slot-scope="scope"> 
            {{ scope.row.id }} 
        </template>
      </el-table-column>
      <el-table-column label="订单价格" align="center">
        <template slot-scope="scope"> ￥{{ scope.row.price }} </template>
      </el-table-column>
      <!-- <el-table-column prop="phone" label="用户昵称" align="center">
      </el-table-column> -->
      <el-table-column prop="origin.name" label="发货人" align="center">
      </el-table-column>
      <el-table-column prop="" label="下单时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createtime | formatConversion }}
        </template>
      </el-table-column>
      <el-table-column label="付款状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">待付款</span>
          <span v-else>已付款</span>
        </template>
      </el-table-column>
      <el-table-column label="付款方式" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.pay_state == 0">余额</span>
          <span v-else-if="scope.row.pay_state == 1">微信</span>
          <span v-else-if="scope.row.pay_state == 2">支付宝</span>
          <span v-else-if="scope.row.pay_state == 3">发件人付</span>
          <span v-else>收件人付</span>
        </template>
      </el-table-column>
      <el-table-column label="骑手名称" align="center">
        <template slot-scope="scope">
          <span v-if="$isEmpty(scope.row.qishouuid)">暂未接单</span>
          <span v-else>{{ scope.row.qishoumsg.ridername }}</span>
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
      @pagination="getList"
    />

    <!-- 编辑 -->
    <el-dialog title="订单详情" :visible.sync="dialogFormVisible" width="60%">
      <el-form ref="dataForm" :model="temp">
        <el-row :gutter="24">
          <el-col :span="8" class="detailsbox">
            <div class="leftitlte">订单号：</div>
            <div class="content">{{ temp.id }}</div>
          </el-col>
          <el-col :span="8" class="detailsbox">
            <!-- <div class="leftitlte">配送距离：</div>
            <div class="content">{{ temp.juli }}</div> -->
          </el-col>
          <el-col :span="8" class="detailsbox">
            <div class="leftitlte">骑士信息：</div>
            <div class="content" v-if="$isEmpty(temp.qishouuid)">暂无信息</div>
            <div class="content" v-else>{{ temp.qishoumsg.ridername }}</div>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="8" class="detailsbox">
            <div class="leftitlte">订单价格：</div>
            <div class="content">
              ￥{{ temp.price }}(实付￥{{ temp.price - temp.hongbao }})
            </div>
          </el-col>
          <el-col :span="8" class="detailsbox">
            <div class="leftitlte">付款状态：</div>
            <div class="content" v-if="temp.status == 0">待付款</div>
            <div class="content" v-else>已付款</div>
          </el-col>
          <el-col :span="8" class="detailsbox">
            <div class="leftitlte">下单时间：</div>
            <div class="content">{{ temp.createtime | formatConversion }}</div>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="24" class="detailsbox">
            <div class="leftitlte">价格详情：</div>
            <div class="content">
              总价：￥{{ temp.price }}(加急费：{{ temp.jiajiprice }}，汽车：{{
                temp.carprice
              }}，重量加价：{{ temp.weightprice }},小费 {{ temp.coin }},保价：{{
                temp.baojia
              }}，溢价：{{ temp.yijia }}，专送：{{ temp.zhuansongprice }})
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24" class="detailsbox">
            <div class="leftitlte">订单补贴：</div>
            <div class="content">{{ temp.butie }}</div>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="8" class="detailsbox">
            <div class="leftitlte">支付类型：</div>
            <div class="content" v-if="temp.pay_state == 0">余额</div>
            <div class="content" v-if="temp.pay_state == 1">微信</div>
            <div class="content" v-if="temp.pay_state == 2">支付宝</div>
            <div class="content" v-if="temp.pay_state == 3">发件人付</div>
            <div class="content" v-if="temp.pay_state == 4">收件人付</div>
          </el-col>
          <el-col :span="8" class="detailsbox"> </el-col>
          <el-col :span="8" class="detailsbox">
            <div class="leftitlte">接单时间：</div>
            <div class="content">{{ temp.jiedantime | formatConversion }}</div>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="8" class="detailsbox">
            <div class="leftitlte">货物类型：</div>
            <div class="content">{{ temp.stdmode }}</div>
          </el-col>
          <el-col :span="8" class="detailsbox"> </el-col>
          <el-col :span="8" class="detailsbox">
            <div class="leftitlte">发货时间：</div>
            <div class="content">暂无信息</div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="8" class="detailsbox">
            <div class="leftitlte">会员：</div>
            <div class="content">{{ temp.origin.name }}</div>
          </el-col>
          <el-col :span="8" class="detailsbox"> </el-col>
          <el-col :span="8" class="detailsbox">
            <div class="leftitlte">收货时间：</div>
            <div class="content">暂无</div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="8" class="detailsbox">
            <div class="leftitlte">订单类型：</div>
            <div class="content" v-if="temp.deliverytime == 0">普通订单</div>
            <div class="content" v-else>预约订单</div>
          </el-col>
          <el-col :span="8" class="detailsbox"> </el-col>
          <el-col :span="8" class="detailsbox">
            <div class="leftitlte">预约时间：</div>
            <div class="content" v-if="temp.deliverytime == 0">非预约</div>
            <div class="content" v-else>
              {{ temp.deliverytime | formatConversion }}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="8" class="detailsbox">
            <div class="leftitlte">取件码：</div>
            <div class="content">{{ temp.qjcode }}</div>
          </el-col>
          <el-col :span="8" class="detailsbox"> </el-col>
          <el-col :span="8" class="detailsbox" style="height: auto">
            <div class="leftitlte">核销图片：</div>
            <div class="content">
              <el-image
                style="width: 100px; height: 100px"
                :src="temp.img1"
                :preview-src-list="[temp.img1]"
              >
              </el-image>
            </div>
          </el-col>
        </el-row>
        <div style="width: 100%; height: 1px; background: #f5f5f5"></div>

        <el-row :gutter="24">
          <el-col :span="8">
            <div class="detailsbox">
              <div class="leftitlte">发货人：</div>
              <div class="content">{{ temp.origin.name }}</div>
              <div
                class="addrdeta"
                v-if="temp.status == 1 || temp.status == 2 || temp.status == 3"
                @click="goMap"
              >
                发货地址
              </div>
            </div>
            <div class="detailsbox">
              <div class="leftitlte">电话：</div>
              <div class="content">{{ temp.origin.phone }}</div>
            </div>
            <div class="detailsbox">
              <div class="leftitlte">发货地址：</div>
              <div class="content">
                {{ temp.origin.province }}{{ temp.origin.city
                }}{{ temp.origin.region }}{{ temp.origin.address
                }}{{ temp.origin.menpai }}
              </div>
            </div>
            <div class="detailsbox">
              <div class="leftitlte">备注：</div>
              <div class="content">{{ temp.remarks }}</div>
            </div>
          </el-col>
          <el-col :span="8" class="detailsbox"> </el-col>
          <el-col :span="8">
            <div
              class="addressbox"
              v-for="(item, index) in temp.destination"
              :key="index"
            >
              <div class="detailsbox">
                <div class="leftitlte">收货人：</div>
                <div class="content">{{ item.name }}</div>
              </div>
              <div class="detailsbox">
                <div class="leftitlte">电话：</div>
                <div class="content">{{ item.phone }}</div>
              </div>
              <div class="detailsbox">
                <div class="leftitlte">收货地址：</div>
                <div class="content">
                  {{ item.province }}{{ item.city }}{{ item.region
                  }}{{ item.address }}{{ item.menpai }}
                </div>
              </div>
              <div class="detailsbox">
                <div class="leftitlte">距离：</div>
                <div class="content">{{ item.juli | filterJuli }}</div>
              </div>
              <div class="detailsbox">
                <div class="leftitlte">核销码：</div>
                <div class="content">{{ temp.qscode["key" + item.id] }}</div>
              </div>
              <div class="detailsbox" style="height: auto">
                <div class="leftitlte">核销图片：</div>
                <div class="content">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="temp.img2['key' + item.id]"
                    :preview-src-list="[temp.img2['key' + item.id]]"
                  >
                  </el-image>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" type="primary">
          取消
        </el-button>

        <el-button
          @click="tuidan"
          type="danger"
          v-if="temp.status == 0 || temp.status == 1 || temp.status == 2"
        >
          退单
        </el-button>

        <el-button @click="shifang" type="warning"> 释放 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export { default } from "./orderListJs.js";
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
