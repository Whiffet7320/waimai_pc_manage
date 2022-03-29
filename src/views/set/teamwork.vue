<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px" :rules="formRules">
      <el-form-item label="合作协议" prop="content" class="form-item">
        <VueUeditorWrap
          :contents="form.content"
          :height="500"
          style="width: 80%"
          @change="change($event, 'content')"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export { default } from "./teamworkJs.js";
</script>
<style lang="scss" scoped>
</style>
