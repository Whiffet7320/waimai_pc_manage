<template>
  <div class="app-container">
    <div class="balance">
      账户余额：<span>{{ balance  | filterTwoNums}}</span>
    </div>
    <div class="topbox">
      <div>
        <p>可提现金额（元）</p>
        <span>{{ tixianbalance }}</span>
      </div>
      <div>
        <p>充值金额（元）</p>
        <span>{{ chongzhibalance }}</span>
      </div>
    </div>
    <div class="line"></div>
    <div class="centertitle">
      <div>统计看板</div>
      <div>
        <el-select
          v-model="timeselect"
          style="width:80px"
          @change="onChange"
        >
          <el-option
            v-for="item in timeoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-date-picker
          v-model="valuetime"
          :type="timeselect == 1 ? 'month' : 'year'"
          placeholder="选择日期"
          @change="onChange"
        >
        </el-date-picker>
      </div>
    </div>
    <div class="centerbox">
      <div class="cbox">
        <p>跑腿订单金额（元）</p>
        <span>{{ paotuilist.allprice | filterNull}}</span>
        <div>
          <p>微信支付：{{paotuilist.wxprice | filterNull}}</p>
          <p>支付宝：{{paotuilist.zfbprice | filterNull}}</p>
        </div>
        <div>
          <p>余额支付：{{paotuilist.yueprice | filterNull}}</p>
          <p>订单数：{{paotuilist.totalcount | filterNull}}</p>
        </div>
      </div>
      <div class="cbox">
        <p>外卖订单金额（元）</p>
        <span>{{ waimailist.allprice | filterNull}}</span>
        <div>
          <p>微信支付：{{waimailist.wxprice | filterNull}}</p>
          <p>支付宝：{{waimailist.zfbprice | filterNull}}</p>
        </div>
        <div>
          <p>余额支付：{{paotuilist.yueprice | filterNull}}</p>
          <p>订单数：{{paotuilist.totalcount | filterNull}}</p>
        </div>
      </div>
      <div class="cbox">
        <p>支出总额（元）</p>
        <span>{{zhichumoney.allzhichu | filterNull}}</span>
        <div>
          <p>骑士提现：{{zhichumoney.ridertixian | filterNull}}</p>
          <p>订单补助：{{zhichumoney.butie | filterNull}}</p>
        </div>
        <div>
          <p>优惠支出：{{zhichumoney.rideryouhui | filterNull}}</p>
          <p>冲单奖励：{{zhichumoney.chongdan | filterNull}}</p>
        </div>
      </div>
      <div class="cbox">
        <p>骑士收入（元）</p>
        <span>{{usershouru.userallshouru | filterNull}}</span>
        <div>
          <p>骑手收入：{{usershouru.rideryouhui | filterNull}}</p>
          <p>商家收入：{{usershouru.shopshouru | filterNull}}</p>
        </div>
        <div>
          <p>一级返利：{{usershouru.lvl1money | filterNull}}</p>
          <p>二级返利：{{usershouru.lvl2money | filterNull}}</p>
        </div>
      </div>
      <div class="cbox">
        <p>充值总额（元）</p>
        <span>{{chongzhi.allmoney | filterNull}}</span>
        <div>
          <p>平台实付金额：{{chongzhi.admin | filterNull}}</p>
          <p>微信实付金额：{{chongzhi.wx | filterNull}}</p>
        </div>
        <div>
          <p>支付宝实付金额：{{chongzhi.zfb | filterNull}}</p>
          <p>赠送金额：{{chongzhi.adminzengsong | filterNull}}</p>
        </div>
      </div>
    </div>

    <div class="centertitle">
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="订单总额" name="1"></el-tab-pane>
          <el-tab-pane label="盈利" name="2"></el-tab-pane>
          <el-tab-pane label="充值金额" name="3"></el-tab-pane>
          <el-tab-pane label="骑士收入" name="4"></el-tab-pane>
          <el-tab-pane label="支出总额" name="5"></el-tab-pane>
        </el-tabs>
      </div>
      <div>
        <el-select
          v-model="timeselect1"
          style="width:80px"
          @change="onChange1"
        >
          <el-option
            v-for="item in timeoptions1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-date-picker
          v-model="valuetime1"
          :type="timeselect1 == 1 ? 'month' : 'year'"
          placeholder="选择日期"
          @change="onChange1"
        >
        </el-date-picker>
      </div>
    </div>
    <MoneyChart
      ref="chartChild"
      :chartData="chardata"
      :type="timeselect1"
    ></MoneyChart>
  </div>
</template>

<script>
import MoneyChart from "./components/moneyChart";
import { gettopmoney, getcentermoney,getbottommoney } from "@/api/money";
export default {
  components: {
    MoneyChart
  },
  data() {
    return {
      valuetime: new Date(),
      timeselect: "1",
      valuetime1: new Date(),
      timeselect1: "1",
      timeoptions: [
        {
          value: "1",
          label: "月"
        },
        {
          value: "2",
          label: "年"
        }
      ],
      timeoptions1: [
        {
          value: "1",
          label: "月"
        },
        // {
        //   value: "2",
        //   label: "年"
        // }
      ],
      activeName: "1",
      balance: "0",
      tixianbalance: "0",
      chongzhibalance: "0",
      paotuilist:{},
      waimailist:{},
      zhichumoney:{},
      usershouru:{},
      chongzhi:{},
      chardata: []
    };
  },
  created() {},
  mounted() {
    this.gettopmoney();
    this.getcentermoney(this.valuetime.getFullYear(),this.valuetime.getMonth() + 1);
    this.getbottommoney(this.valuetime.getFullYear(),this.valuetime.getMonth() + 1);
  },
  methods: {
    gettopmoney() {
      this.listLoading = true;
      gettopmoney().then(res => {
        if (res.errcode == 0) {
          this.balance = res.data.allyue;
          this.chongzhibalance = res.data.allchongzhiyue;
          this.tixianbalance = res.data.totalketixian;
          this.listLoading = false;
        } else {
          this.$message({
            message: res.errmsg,
            type: "error"
          });
        }
      });
    },
    getcentermoney(year = 0, month = 0) {
      this.listLoading = true;
      var data = {};
      data["year"] = year;
      data["month"] = month;
      getcentermoney(data).then(res => {
        if (res.errcode == 0) {
          this.paotuilist = res.data.paotuilist;
          this.waimailist = res.data.waimailist;
          this.zhichumoney = res.data.zhichumoney;
          this.usershouru = res.data.usershouru;
          this.chongzhi = res.data.chongzhi;
          this.listLoading = false;
        } else {
          this.$message({
            message: res.errmsg,
            type: "error"
          });
        }
      });
    },
    getbottommoney(year = 0, month = 0) {
      this.listLoading = true;
      var data = {};
      data["year"] = year;
      data["month"] = month;
      data["type"] = this.activeName;
      getbottommoney(data).then(res => {
        if (res.errcode == 0) {
          this.chardata = res.list;
          this.listLoading = false;
        } else {
          this.$message({
            message: res.errmsg,
            type: "error"
          });
        }
      });
    },
    onChange() { // 统计看板切换
      if (this.timeselect == 1) {
        this.getcentermoney(this.valuetime.getFullYear(),this.valuetime.getMonth() + 1);
      } else {
        this.getcentermoney(this.valuetime.getFullYear());
      }
    },
    onChange1() {
      if (this.timeselect1 == 1) {
        this.getbottommoney(this.valuetime.getFullYear(),this.valuetime.getMonth() + 1);
      } else {
        this.getbottommoney(this.valuetime.getFullYear());
      }
    },
    handleClick(tab) {
      this.activeName = tab.name;
      if (this.timeselect1 == 1) {
        this.getbottommoney(this.valuetime.getFullYear(),this.valuetime.getMonth() + 1);
      } else {
        this.getbottommoney(this.valuetime.getFullYear());
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.balance {
  // height: 50px;
  // line-height: 50px;
  span {
    font-size: 25px;
    font-weight: bold;
    color: #ee6c1e;
  }
}
.topbox {
  display: flex;
  margin-top: 20px;
  div {
    width: 220px;
    height: 120px;
    background: #fbe9dd;
    border: 1px solid #f2d3c1;
    float: left;
    margin-left: 20px;
    padding: 10px;
    text-align: center;
    p {
      text-align: left;
    }
    span {
      font-size: 25px;
      font-weight: bold;
    }
  }
}
.centertitle {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.centerbox {
  display: flex;
  justify-content: space-between;
  .cbox {
    width: 19%;
    min-width: 275px;
    min-height: 130px;
    background: #e6edfd;
    border: 1px solid #b9ccf6;
    float: left;
    margin-top: 20px;
    padding: 10px;
    text-align: center;
    p {
      text-align: left;
    }
    span {
      font-size: 20px;
      font-weight: bold;
      color: #ee6c1e;
    }
    div {
      display: flex;
      p {
        width: 50%;
        font-size: 14px;
      }
    }
  }
}
.line {
  width: 100%;
  height: 10px;
  background: #f5f5f5;
  margin-top: 20px;
}
</style>
