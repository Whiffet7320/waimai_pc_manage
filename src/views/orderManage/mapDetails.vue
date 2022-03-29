<template>
  <div id="box">
    <div class="header">
      <div class="title">商家位置</div>
      <div class="right">
        <!-- <div class="fujin">
          <span>附近骑手</span>
          <el-radio-group v-model="tabPosition" @change="handleClick">
            <el-radio-button label="0">全部</el-radio-button>
            <el-radio-button label="1">1km</el-radio-button>
            <el-radio-button label="2">2km</el-radio-button>
            <el-radio-button label="3">3km</el-radio-button>
            <el-radio-button label="5">5km</el-radio-button>
            <el-radio-button label="7">7km</el-radio-button>
          </el-radio-group>
        </div>

        <div class="fujin">
          <span>骑手类型</span>
          <el-radio-group v-model="tabtype" @change="typeClick">
            <el-radio-button label="2">全部</el-radio-button>
            <el-radio-button label="0">全职</el-radio-button>
            <el-radio-button label="1">兼职</el-radio-button>
          </el-radio-group>
        </div> -->

        <el-button type="primary" @click="refresh">刷新</el-button>
      </div>
    </div>
    <div id="myMap"></div>

    <!-- 骑手标记点 -->
    <div class="markets">
      <span>{{ datamap.qishouname }}</span>
      <div class="nums">
        {{ datamap.yuyuedan ? Number(datamap.dangqiandan) + Number(datamap.yuyuedan) : Number(datamap.dangqiandan) }}
      </div>
      <div class="xiangxi">
        <div class="name" @click="zhipai()">指派订单</div>
      </div>
    </div>
  </div>
</template>

<script>
export { default } from "./mapDetailsJs.js";
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 80px;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0 15px;
  .title {
    width: 100px;
    font-weight: bold;
  }
  .right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .fujin {
    display: flex;
    align-items: center;
    font-size: 14px;
    span {
      margin-right: 10px;
    }
  }
}
#myMap {
  width: 100%;
  height: 750px;
  text-align: center;
  // position: absolute;
}
.maract {
  box-shadow: 2px 2px 10px #027aff, -2px -2px 10px #027aff;
}
.markets {
  width: 80px;
  padding: 5px;
  font-size: 12px;
  background: #027aff;
  color: #fff;
  border-radius: 30px;
  text-align: center;
  position: relative;
  cursor: pointer;
  span {
    color: #fff;
    font-size: 12px;
  }
  .nums {
    position: absolute;
    right: -10px;
    top: -10px;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background: #027aff;
    color: #fff;
    border-radius: 50%;
    z-index: 10;
  }

  .xiangxi {
    position: absolute;
    left: -10px;
    top: -40px;
    width: 100px;
    background: #fff;
    z-index: 9;
    text-align: left;
    box-sizing: border-box;
    padding: 10px;
    div {
      font-size: 14px;
      color: #333;
    }
  }
}
</style>
