<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 头部搜索 -->
      <el-tabs v-model="changeIndex" @tab-click="handleClick">
        <el-tab-pane label="修改手机" name="1"></el-tab-pane>
        <el-tab-pane label="解绑微信" name="2"></el-tab-pane>
      </el-tabs>
    </div>

    <div class="changebox">
      <div class="inputbox">
        <div class="leftitle">会员ID：</div>
        <div class="input">
          <el-input
            v-model="listQuery.uid"
            placeholder="请输入会员ID"
          ></el-input>
        </div>
      </div>
      <div class="inputbox" v-if="changeIndex == 1">
        <div class="leftitle">新手机号：</div>
        <div class="input">
          <el-input
            v-model="listQuery.phone"
            placeholder="请输入新手机号"
          ></el-input>
        </div>
      </div>
      <el-button type="primary" class="btn" @click="configtap">确定</el-button>
    </div>
  
  </div>
</template>

<script>
export { default } from "./changeInfoJs.js";
</script>
<style lang="scss" scoped>
.changebox {
  margin-top: 100px;
  .inputbox {
    width: 300px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;

    .leftitle {
      width: 90px;
      text-align: left;
    }

    .input {
      flex: 1;
    }
  }

  .btn {
    width: 300px;
    display: block;
    margin: 100px auto 0;
  }
}
</style>
