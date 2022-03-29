<template>
  <div id="gongjiangmoneyChart" :style="{ width: '100%', height: '230px' }"></div>
</template>
<script>
import echarts from "echarts";
export default {
  props: {
    chartData: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      let myChart = echarts.init(document.getElementById("gongjiangmoneyChart"));
      var option = {
        // 工具提示
        tooltip: {
          // 触发类型  经过轴触发axis  经过轴触发item
          trigger: "item",
          // 轴触发提示才有效
          axisPointer: {
            // 默认为直线，可选为：'line' 线效果 | 'shadow' 阴影效果
            type: "shadow",
          },
        },
        // 图表边界控制
        grid: {
          // 距离 上右下左 的距离
          left: "0",
          right: "3%",
          bottom: "3%",
          top: "5%",
          // 大小是否包含文本【类似于boxsizing】
          containLabel: true,
          //显示边框
          show: true,
          //边框颜色
          borderColor: "rgba(0, 240, 255, 0.3)",
        },
        // 控制x轴
        xAxis: [
          {
            // 使用类目，必须有data属性
            type: "category",
            // 使用 data 中的数据设为刻度文字
            data: ["前6日", "前5日", "前4日", "前3日", "前2日", "昨日", "今日"],
            // 刻度设置
            axisTick: {
              // true意思：图形在刻度中间
              // false意思：图形在刻度之间
              alignWithLabel: false,
              show: false,
            },
            //文字
            axisLabel: {
              color: "#4c9bfd",
            },
          },
        ],
        // 控制y轴
        yAxis: [
          {
            // 使用数据的值设为刻度文字
            type: "value",
            axisTick: {
              // true意思：图形在刻度中间
              // false意思：图形在刻度之间
              alignWithLabel: false,
              show: false,
            },
            //文字
            axisLabel: {
              color: "#4c9bfd",
            },
            splitLine: {
              lineStyle: {
                color: "rgba(0, 240, 255, 0.3)",
              },
            },
          },
        ],
        // 控制x轴
        series: [
          {
            // series配置
            // 颜色
            itemStyle: {
              // 提供的工具函数生成渐变颜色
              color: new echarts.graphic.LinearGradient(
                // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                0,
                0,
                0,
                1,
                [
                  { offset: 0, color: "#00fffb" }, // 0 起始颜色
                  { offset: 1, color: "#0061ce" }, // 1 结束颜色
                ]
              ),
            },
            // 图表数据名称
            name: "工匠交易总额",
            // 图表类型
            type: "bar",
            // 柱子宽度
            barWidth: "60%",
            // 数据
            data: this.chartData,
          },
        ],
      };
      window.onresize = myChart.resize;
      myChart.setOption(option);
    },
  },
};
</script>
