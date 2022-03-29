<template>
  <div class="app-container">
    <div class="filter-container">
      <el-radio-group v-model="tabfilter" style="margin-bottom: 30px">
        <el-radio-button label="pos">距离设置</el-radio-button>
        <el-radio-button label="time">时间设置</el-radio-button>
      </el-radio-group>

      <div v-show="tabfilter == 'pos'">
        <div class="input-flex">
          <div class="left">起步价:</div>
          ￥<input type="number" v-model="beginMoney" />含
          <input type="number" v-model="beginPos" />公里
        </div>
        <div class="input-flex">
          <div class="left">中间价:</div>
          ￥<input type="number" v-model="secondMoney" />
          <input type="number" v-model="beginPos" readonly />公里 至
          <input type="number" v-model="endPos" />公里
        </div>
        <div class="input-flex">
          <div class="left">最终价:</div>
          ￥<input type="number" v-model="lastMoney" /> 超过<input
            type="number"
            v-model="endPos"
            readonly
          />公里
        </div>

        <el-button type="primary" @click="posconfig()"> 确定 </el-button>
      </div>
      <!-- 时间设置 -->
      <div v-show="tabfilter == 'time'">
        <div class="input-flex">
          <div class="left">3公里内:</div>
          <input type="number" v-model="begintime" />分钟送达
        </div>
        <div class="input-flex">
          <div class="left">3-5公里内:</div>
          <input type="number" v-model="secondtime" />分钟送达
        </div>
        <div class="input-flex">
          <div class="left">每超出5公里增加:</div>
          <input type="number" v-model="lasttime" />分钟送达
        </div>

        <el-button type="primary" @click="timeconfig()"> 确定 </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export { default } from "./songhuoJs.js";
</script>
<style lang="scss" scoped>
.input-flex {
  display: flex;
  align-items: center;
  height: 50px;
  line-height: 50px;
  .left {
    width: 140px;
  }
  input {
    width: 70px;
    margin: 0 10px;
  }
}
</style>
