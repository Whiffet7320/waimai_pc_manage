<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="input-flex">
        <div class="left">骑手接单费用（元）:</div>
        <input type="number" v-model="price" />
      </div>
      <div class="input-flex">
        <div class="left">骑手抽成比例（百分比）:</div>
        <input type="number" v-model="rider" />
      </div>
      <el-button type="primary" @click="updateData()"> 确定 </el-button>
    </div>
  </div>
</template>

<script>
export { default } from "./riderprice.js";
</script>
<style lang="scss" scoped>
.input-flex {
  display: flex;
  align-items: center;
  height: 50px;
  line-height: 50px;
  .left {
    width: 230px;
  }
  input {
    margin-right: 10px;
  }
}
</style>
