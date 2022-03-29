<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="input-flex">
        <div class="left">退款时平台扣除得费用:</div>
        <input type="number" v-model="pingtai" />
      </div>
      <div class="input-flex">
        <div class="left">退款骑士补贴:</div>
        <input type="number" v-model="qishi" />
        元
      </div>

      <el-button type="primary" @click="updateData()"> 确定 </el-button>
    </div>
  </div>
</template>

<script>
export { default } from "./tuihuoJs.js";
</script>
<style lang="scss" scoped>
.input-flex {
  display: flex;
  align-items: center;
  height: 50px;
  line-height: 50px;
  .left {
    width: 200px;
  }
  input {
    margin-right: 10px;
  }
}
</style>
