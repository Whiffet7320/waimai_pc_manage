<template>
  <div class="app-container">
    <div class="filter-container">
      <span>用户端广告：</span>
      <el-radio v-model="user.iskaiqi" :label="0">关闭</el-radio>
      <el-radio v-model="user.iskaiqi" :label="1">开启</el-radio>
    </div>
    <el-upload
      ref="avatar-uploader"
      class="avatar-uploader"
      action
      :show-file-list="false"
      :auto-upload="false"
      :on-change="(file) => handleImgSuccess(file, 'user')"
    >
      <el-image
        style="width: 100px; height: 100px"
        :src="user.imgsrc"
        v-if="user.imgsrc"
      >
      <!-- :preview-src-list="[user.imgsrc]" 预览--> 
      </el-image>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <div style="height: 50px"></div>
    <div class="filter-container">
      <span>骑手端广告：</span>
      <el-radio v-model="rider.iskaiqi" :label="0">关闭</el-radio>
      <el-radio v-model="rider.iskaiqi" :label="1">开启</el-radio>
    </div>
    <el-upload
      ref="avatar-uploader"
      class="avatar-uploader"
      action
      :show-file-list="false"
      :auto-upload="false"
      :on-change="(file) => handleImgSuccess(file, 'rider')"
    >
      <el-image
        style="width: 100px; height: 100px"
        :src="rider.imgsrc"
        v-if="rider.imgsrc"
      >
      </el-image>

      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <div style="height: 50px"></div>
    <el-button type="primary" @click="onSubmit">确定</el-button>
  </div>
</template>

<script>
export { default } from "./advJs";
</script>
<style lang="scss" scoped>
.input-flex {
  display: flex;
  align-items: center;
  height: 50px;
  line-height: 50px;
  .left {
    width: 80px;
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
