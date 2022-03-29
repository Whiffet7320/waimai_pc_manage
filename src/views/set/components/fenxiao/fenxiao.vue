<template>
  <div class="app-container">
    <div class="filter-container">
      <div>
        <div class="input-flex">
          <div class="left">用户推用户一级比例:</div>
          <input type="number" v-model="utu1" />
        </div>
        <div class="input-flex">
          <div class="left">用户推商家一级比例:</div>
          <input type="number" v-model="uts1" />
        </div>
        <div class="input-flex">
          <div class="left">用户推骑手一级比例:</div>
          <input type="number" v-model="utq1" />
        </div>

        <div class="input-flex">
          <div class="left">商家推用户一级比例:</div>
          <input type="number" v-model="stu1" />
        </div>
        <div class="input-flex">
          <div class="left">商家推商家一级比例:</div>
          <input type="number" v-model="sts1" />
        </div>
        <div class="input-flex">
          <div class="left">商家推骑手一级比例:</div>
          <input type="number" v-model="stq1" />
        </div>

        <div class="input-flex">
          <div class="left">骑手推用户一级比例:</div>
          <input type="number" v-model="qtu1" />
        </div>
        <div class="input-flex">
          <div class="left">骑手推商家一级比例:</div>
          <input type="number" v-model="qts1" />
        </div>
        <div class="input-flex">
          <div class="left">骑手推骑手一级比例:</div>
          <input type="number" v-model="qtq1" />
        </div>
      </div>

      <div>
        <div class="input-flex">
          <div class="left">用户推用户二级比例:</div>
          <input type="number" v-model="utu2" />
        </div>
        <div class="input-flex">
          <div class="left">用户推商家二级比例:</div>
          <input type="number" v-model="uts2" />
        </div>
        <div class="input-flex">
          <div class="left">用户推骑手二级比例:</div>
          <input type="number" v-model="utq2" />
        </div>

        <div class="input-flex">
          <div class="left">商家推用户二级比例:</div>
          <input type="number" v-model="stu2" />
        </div>
        <div class="input-flex">
          <div class="left">商家推商家二级比例:</div>
          <input type="number" v-model="sts2" />
        </div>
        <div class="input-flex">
          <div class="left">商家推骑手二级比例:</div>
          <input type="number" v-model="stq2" />
        </div>

        <div class="input-flex">
          <div class="left">骑手推用户二级比例:</div>
          <input type="number" v-model="qtu2" />
        </div>
        <div class="input-flex">
          <div class="left">骑手推商家二级比例:</div>
          <input type="number" v-model="qts2" />
        </div>
        <div class="input-flex">
          <div class="left">骑手推骑手二级比例:</div>
          <input type="number" v-model="qtq2" />
        </div>
      </div>
    </div>
    <el-button type="primary" @click="updateData()"> 确定 </el-button>
  </div>
</template>

<script>
export { default } from "./fenxiaoJs.js";
</script>
<style lang="scss" scoped>
.filter-container {
  display: flex;
}
.filter-container > div{
  margin-right: 20px;
}
.input-flex {
  display: flex;
  align-items: center;
  height: 50px;
  line-height: 50px;
  .left {
    width: 160px;
  }
  input {
    margin-right: 10px;
  }
}
</style>
