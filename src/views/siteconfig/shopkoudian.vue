<template>
  <div class="app-container">
    <div class="input-flex">
      <div class="left">商家抽成(%)：</div>
      <input type="number" v-model="koudian" />
      (0为不开启)
    </div>
    <el-button type="primary" @click="onSubmit">确定</el-button>
  </div>
</template>

<script>
export { default } from "./shopkoudianJs.js";
</script>
<style lang="scss" scoped>
.input-flex {
  display: flex;
  align-items: center;
  height: 50px;
  line-height: 50px;
  .left {
    width: 120px;
  }
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border-radius: 5px;
  border: 1px dashed #8c939d;
}
</style>
