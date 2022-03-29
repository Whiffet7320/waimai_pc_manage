<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="input-flex">
        <div class="left">骑手每日首单保险金额（元）:</div>
        <input type="number" v-model="num" />
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
