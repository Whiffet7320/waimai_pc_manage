<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 头部搜索 -->
      <el-tabs v-model="changeIndex" @tab-click="handleClick">
        <el-tab-pane label="跑腿小费设置" name="1"></el-tab-pane>
        <el-tab-pane label="跑腿重量设置" name="2"></el-tab-pane>
        <el-tab-pane label="跑腿保价设置" name="3"></el-tab-pane>
        <el-tab-pane label="跑腿类型设置" name="4"></el-tab-pane>
        <el-tab-pane label="跑腿加急单设置" name="5"></el-tab-pane>
        <!-- <el-tab-pane label="车辆设置" name="6"></el-tab-pane> -->
        <el-tab-pane label="跑腿溢价设置" name="7"></el-tab-pane>
        <el-tab-pane label="跑腿高峰时段" name="8"></el-tab-pane>
        <el-tab-pane label="通用骑手等级" name="9"></el-tab-pane>
        <el-tab-pane label="跑腿退货补贴" name="10"></el-tab-pane>
        <el-tab-pane label="通用送货设置" name="11"></el-tab-pane>
        <el-tab-pane label="通用绩效分成" name="12"></el-tab-pane>
        <!-- <el-tab-pane label="分销模板" name="13"></el-tab-pane> -->
        <!-- <el-tab-pane label="推送延迟" name="14"></el-tab-pane> -->
        <el-tab-pane label="开屏广告" name="15"></el-tab-pane>
        <el-tab-pane label="骑手接单费用" name="17" v-if="riderjiedan.price"></el-tab-pane>
        <el-tab-pane label="接单公里限制" name="16" v-else></el-tab-pane>
        <el-tab-pane label="抽成比例" name="18"></el-tab-pane>
        <el-tab-pane label="苹果审核" name="19"></el-tab-pane>
        <el-tab-pane label="骑士保险" name="20"></el-tab-pane>
        <el-tab-pane label="跑腿骑士规则" name="21"></el-tab-pane>
        <!-- <el-tab-pane label="优惠券设置" name="22"></el-tab-pane> -->
        <el-tab-pane label="公告设置" name="23"></el-tab-pane>
      </el-tabs>
    </div>

    <!-- 小费 -->
    <xiaofei v-if="changeIndex == 1 && !$isEmpty(xiaofeitemp)" :data="data" :dataObj="xiaofeitemp"></xiaofei>
    <!-- 重量 -->
    <weight v-if="changeIndex == 2 && !$isEmpty(weighttemp)" :data="data" :dataObj="weighttemp"></weight>
    <!-- 保价 -->
    <baojia v-if="changeIndex == 3 && !$isEmpty(baojiatemp)" :data="data" :dataObj="baojiatemp"></baojia>
    <!-- 类型 -->
    <typetemp v-if="changeIndex == 4 && !$isEmpty(typetemp)" :data="data" :dataObj="typetemp"></typetemp>
    <!-- 加急 -->
    <jiaji v-if="changeIndex == 5 && !$isEmpty(jiajitemp)" :data="data" :dataObj="jiajitemp"></jiaji>
     <!-- 车辆设置 -->
    <car v-if="changeIndex == 6 && !$isEmpty(cartemp)" :data="data" :dataObj="cartemp"></car>
    <!-- 溢价设置 -->
    <yijia v-if="changeIndex == 7 && !$isEmpty(yijiatemp)" :data="data" :dataObj="yijiatemp"></yijia>
    <!-- 高峰时段 -->
    <timetemp v-if="changeIndex == 8 && !$isEmpty(timetemp)" :data="data" :dataObj="timetemp"></timetemp>
    <!-- 骑手等级 -->
    <level v-if="changeIndex == 9 && !$isEmpty(riderlevel)" :data="data" :dataObj="riderlevel"></level>
    <!-- 退货补贴 -->
    <tuihuo v-if="changeIndex == 10 && !$isEmpty(tuihuobutie)" :data="data" :dataObj="tuihuobutie"></tuihuo>
    <!-- 送货设置 -->
    <songhuo v-if="changeIndex == 11 && !$isEmpty(position)" :data="data" :dataObj="position" :timeObj="delivery"></songhuo>
    <!-- 绩效分成 -->
    <jixiao v-if="changeIndex == 12 && !$isEmpty(fenchengtemp)" :data="data" :dataObj="fenchengtemp" :jixiaoObj="jixiaotemp"></jixiao>
    <!-- 推送设置 -->
    <fenxiao v-if="changeIndex == 13 && !$isEmpty(fenxiaotemp)" :data="data" :dataObj="fenxiaotemp"></fenxiao>
    <!-- 分销设置 -->
    <tuisong v-if="changeIndex == 14 && !$isEmpty(tuisong)" :data="data" :dataObj="tuisong"></tuisong>
    <!-- 开屏广告 -->
    <kaiping v-if="changeIndex == 15 && !$isEmpty(kaiping)" :data="data" :dataObj="kaiping"></kaiping>
    <!-- 接单公里限制 -->
    <riderjiedan v-if="changeIndex == 16 && !$isEmpty(riderjiedan)" :dataObj="riderjiedan"></riderjiedan>

    <riderprice v-if="changeIndex == 17 && !$isEmpty(riderjiedan)" :dataObj="riderjiedan"></riderprice>
    <!-- 抽成比例 -->
    <choucheng v-if="changeIndex == 18 && !$isEmpty(choucheng)" :data="data" :dataObj="choucheng"></choucheng>
     <!-- 苹果审核 -->
    <appleshenhe v-if="changeIndex == 19 && !$isEmpty(shenhe)" :data="data" :dataObj="shenhe"></appleshenhe>
    <!-- 骑士保险 -->
    <qishoubaoxian v-if="changeIndex == 20 && !$isEmpty(baoxian)" :data="data" :dataObj="baoxian"></qishoubaoxian>
    <!-- 骑士规则 -->
    <qishouguize v-if="changeIndex == 21 && !$isEmpty(qishouguize)" :data="data" :dataObj="qishouguize"></qishouguize>
    <!-- 优惠券设置 -->
    <usecoupon v-if="changeIndex == 22 && !$isEmpty(usecoupon)" :data="data" :dataObj="usecoupon"></usecoupon>
    <!-- 首页公告 -->
    <gonggao v-if="changeIndex == 23 && !$isEmpty(gonggao)" :data="data" :dataObj="gonggao"></gonggao>
  </div>
</template>

<script>
export { default } from "./allsetJs.js";
</script>
<style lang="scss" scoped>
</style>
