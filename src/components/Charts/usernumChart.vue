<template>
  <div id="myChart1" :style="{ width: '100%', height: '230px' }"></div>
</template>
<script>
import echarts from "echarts";
export default {
  props: {
    chartData: {
      type: Array,
      require: true,
      // default:[120, 40, 30, 20, 50],
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.draw();
    console.log('------');
    console.log(this.chartData);
  },
  methods: {
    draw() {
      let myChart = echarts.init(document.getElementById("myChart1"));
      var option = {
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
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "前9日",
            "前8日",
            "前7日",
            "前6日",
            "前5日",
            "前4日",
            "前3日",
            "前2日",
            "昨日",
            "今日",
          ],
          //文字
          axisLabel: {
            color: "#4c9bfd",
            
          },
        },
        yAxis: {
          type: "value",
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
        // 鼠标移上控制,显示数量
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        series: [
          {
            // data: [120, 40, 30, 20, 50,120, 40, 30, 20, 50],
            data: this.chartData,
            type: "line",
            areaStyle: {},
            name: "活跃用户数量",
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
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>
