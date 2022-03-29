<template>
  <div class="app-container">
    <el-steps
      :active="actindex"
      finish-status="success"
      simple
      style="margin-top: 20px"
    >
      <el-step title="输入账号"></el-step>
      <el-step title="进行充值"></el-step>
      <el-step title="充值成功"></el-step>
    </el-steps>

    <div class="box" v-if="actindex == 1">
      <div class="inputbox">
        <div class="leftitle">会员ID：</div>
        <div class="input">
          <el-input v-model="listQuery.uid" placeholder="请输入会员ID："></el-input>
        </div>
      </div>

      <el-button class="btn" type="primary" @click="nexttwo">下一步</el-button>
    </div>

    <div class="box" v-if="actindex == 2 && !$isEmpty(userdata)">
      <div class="inputbox">
        <div class="leftitle">会员账号：</div>
        <div class="input">
          <el-input
            v-model="listQuery.uid"
            readonly
            placeholder="请输入会员账号"
          ></el-input>
        </div>
      </div>
      <div class="inputbox">
        <div class="leftitle">账户余额：</div>
        <div class="input">￥{{userdata.coin}}</div>
      </div>

      <div class="inputbox">
        <div class="leftitle">实付金额：</div>
        <div class="input">
          <el-input
            class="input"
            type="number"
            v-model="listQuery.shifunum"
            placeholder="请输入实付金额"
          ></el-input>
        </div>
      </div>

      <div class="inputbox">
        <div class="leftitle">赠送金额：</div>
        <div class="input">
          <el-input
            class="input"
            type="number"
            v-model="listQuery.zengsong"
            placeholder="请输入赠送金额"
          ></el-input>
        </div>
      </div>

      <el-button class="btn" type="primary" @click="configtap">确认充值</el-button>
    </div>

    <div class="success" v-if="actindex == 3">
      <i class="el-icon-success"></i>
      <span>充值成功</span>
    </div>
  </div>
</template>

<script>
export { default } from "./userRechargeJs.js";
</script>
<style lang="scss" scoped>
.box {
  margin-top: 150px;

  .inputbox {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;

    .leftitle {
      margin-right: 15px;
      width: 90px;
      text-align: right;
    }

    .input {
      width: 200px;
    }
  }

  .btn {
    width: 300px;
    display: block;
    margin: 150px auto 0;
  }
}

.success{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .el-icon-success{
    font-size: 60px;
    margin-top: 200px;
    margin-bottom: 50px;
    color: #027AFF;
  }
}
</style>
