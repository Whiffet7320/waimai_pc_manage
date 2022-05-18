<template>
  <div class="app-container">
    <div class="input-flex">
      <div class="left">商家抽成：</div>
      <el-radio v-model="city.iskaiqi" :label="0">关闭</el-radio>
      <el-radio v-model="city.iskaiqi" :label="1">开启</el-radio>
    </div>
    <div class="input-flex">
      <div class="left">抽成比例(%)：</div>
      <input type="number" v-model="city.bili" />
    </div>
    <div class="input-flex">
      <div class="left">默认配送费：</div>
      <input type="number" v-model="city.peisong" />
    </div>

    <div style="height: 50px"></div>
    <!-- <div class="input-flex">
      <div class="left">校园商家抽成：</div>
      <el-radio v-model="school.iskaiqi" :label="0">关闭</el-radio>
      <el-radio v-model="school.iskaiqi" :label="1">开启</el-radio>
    </div>
    <div class="input-flex">
      <div class="left">抽成比例(%)：</div>
      <input type="number" v-model="school.bili" />
    </div>
    <div class="input-flex">
      <div class="left">默认配送费：</div>
      <input type="number" v-model="school.peisong" />
    </div>
    <div style="height: 50px"></div> -->
    <el-button type="primary" @click="onSubmit">确定</el-button>
  </div>
</template>

<script>
export { default } from "./chouchengJs.js";
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
