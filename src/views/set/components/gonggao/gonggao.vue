<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="input-flex">
        <div class="left">首页公告:</div>
        <input type="text" v-model="gonggao" />
      </div>

      <el-button type="primary" @click="updateData()"> 确定 </el-button>
    </div>
  </div>
</template>

<script>
export { default } from "./gonggaoJs.js";
</script>
<style lang="scss" scoped>
.input-flex {
  display: flex;
  align-items: center;
  height: 50px;
  line-height: 50px;
  .left {
    width: 130px;
  }
  input {
    margin-right: 10px;
  }
}
</style>
