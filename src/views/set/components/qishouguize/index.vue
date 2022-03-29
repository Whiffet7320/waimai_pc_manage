<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="input-flex">
        <div class="left">骑手取件时间:</div>
        <input type="number" v-model="qujian.time" />
      </div>
      <div class="input-flex">
        <div class="left">超出取件时间扣分:</div>
        <input type="number" v-model="qujian.timechaochu" />
      </div>
      <div class="input-flex">
        <div class="left">准时取件加分:</div>
        <input type="number" v-model="qujian.timezhunshi" />
      </div>

      <div style="height: 20px"></div>
      <!-- <div class="input-flex">
        <div class="left">骑手送达时间:</div>
        <input type="number" v-model="songda.time" />
      </div> -->
      <div class="input-flex">
        <div class="left">超出送达时间扣分:</div>
        <input type="number" v-model="songda.timechaochu" />
      </div>
      <div class="input-flex">
        <div class="left">准时送达加分:</div>
        <input type="number" v-model="songda.timezhunshi" />
      </div>

      <div style="height: 20px"></div>
      <!-- <div class="input-flex">
        <div class="left">客户投诉扣分:</div>
        <input type="number" v-model="kehu.kehukesu" />
      </div> -->
      <div class="input-flex">
        <div class="left">客户好评加分:</div>
        <input type="number" v-model="kehu.kehuhaoping" />
      </div>

      <div style="height: 20px"></div>
      <div class="input-flex">
        <div class="left">跑单一天加分:</div>
        <input type="number" v-model="huoyuefen.paodanyitian" />
      </div>
      <div class="input-flex">
        <div class="left">工作日午高峰加分(15:00-21:59):</div>
        <input type="number" v-model="huoyuefen.gongzuoriwugaofeng" />
      </div>
      <div class="input-flex">
        <div class="left">非工作日午高峰加分(15:00-21:59):</div>
        <input type="number" v-model="huoyuefen.feigongzuoriwugaofeng" />
      </div>
      <div class="input-flex">
        <div class="left">工作日夜宵加分(22:00-23:59):</div>
        <input type="number" v-model="huoyuefen.gongzuoriyexiao" />
      </div>
      <div class="input-flex">
        <div class="left">非工作日夜宵加分(22:00-23:59):</div>
        <input type="number" v-model="huoyuefen.feigongzuoriyexiao" />
      </div>
      <div class="input-flex">
        <div class="left">恶劣天气加分:</div>
        <input type="number" v-model="huoyuefen.elietianqi" />
      </div>
      <div class="input-flex">
        <div class="left">节日加分:</div>
        <input type="number" v-model="huoyuefen.jierijifen" />
      </div>

      <el-button type="primary" @click="updateData()"> 确定 </el-button>
    </div>
  </div>
</template>

<script>
export { default } from "./index.js";
</script>
<style lang="scss" scoped>
.input-flex {
  display: flex;
  align-items: center;
  height: 40px;
  line-height: 40px;
  .left {
    width: 270px;
  }
  input {
    margin-right: 10px;
  }
}
</style>
