<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px" :rules="formRules">
      <el-form-item label="关于我们" prop="about" class="form-item">
        <VueUeditorWrap
          :contents="form.about"
          style="width: 80%"
          @change="bitcoinChange($event, 'about')"
        />
      </el-form-item>
      <el-form-item label="注册协议" prop="registe" class="form-item">
        <VueUeditorWrap
          :contents="form.registe"
          style="width: 80%"
          @change="bitcoinChange($event, 'registe')"
        />
      </el-form-item>
      <el-form-item label="合作协议" prop="teamwork" class="form-item">
        <VueUeditorWrap
          :contents="form.teamwork"
          style="width: 80%"
          @change="bitcoinChange($event, 'teamwork')"
        />
      </el-form-item>
      <el-form-item label="隐私协议" prop="privacy" class="form-item">
        <VueUeditorWrap
          :contents="form.privacy"
          style="width: 80%"
          @change="bitcoinChange($event, 'privacy')"
        />
      </el-form-item>
      <el-form-item label="骑士课堂" prop="classroom" class="form-item">
        <VueUeditorWrap
          :contents="form.classroom"
          style="width: 80%"
          @change="bitcoinChange($event, 'classroom')"
        />
      </el-form-item>
      <el-form-item label="骑士规则" prop="rule" class="form-item">
        <VueUeditorWrap
          :contents="form.rule"
          style="width: 80%"
          @change="bitcoinChange($event, 'rule')"
        />
      </el-form-item>
       <el-form-item>
        <el-button type="primary" @click="onSubmit">修改协议</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export { default } from "./agreementJs.js";
</script>
<style lang="scss" scoped>
</style>
