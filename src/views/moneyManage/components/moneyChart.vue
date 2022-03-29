<template>
  <div id="myChart1" :style="{ width: '100%', height: '300px' }"></div>
</template>
<script>
import echarts from "echarts";
export default {
  props: {
    chartData: {
      type: Array,
      require: true
      // default:[120, 40, 30, 20, 50],
    },
    type: {
      type: String,
      default: "1"
    }
  },
  data() {
    return {
      myChart: null,
      option: {},
      xDataYear: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      xData: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30
      ]
    };
  },
  mounted() {
    this.draw();
    console.log("------");
    console.log(this.chartData);
  },
  watch: {
    chartData: function() {
      console.log("数据变化");
      this.draw();
    }
  },
  methods: {
    draw() {
      this.myChart = echarts.init(document.getElementById("myChart1"));
      this.option = {
        grid: {
          // 距离 上右下左 的距离
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "10%",
          // 大小是否包含文本【类似于boxsizing】
          containLabel: true,
          //显示边框
          show: true,
          //边框颜色
          borderColor: "#f5f5f5"
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.type == 1 ? this.xData : this.xDataYear,
          //文字
          axisLabel: {
            textStyle: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              color: "#333"
            }
          }
        },
        yAxis: {
          type: "value",
          //文字
          axisLabel: {
            color: "#333"
          },
          splitLine: {
            lineStyle: {
              color: "#eee"
            }
          }
        },
        // 鼠标移上控制,显示数量
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#f5f5f5"
            }
          }
        },
        series: [
          {
            // data: [120, 40, 30, 20, 50,120, 40, 30, 20, 50],
            data: this.chartData,
            type: "line",
            // areaStyle: {},
            name: "活跃用户数量",
            itemStyle: {
              normal: {
                // 折线点文字
                label: {
                  show: true,
                  formatter: "{c}",
                  textStyle: {
                    color: "#000"
                  }
                }
              },
              color: "#027AFF"
            }
            // 颜色
            // itemStyle: {
            // 提供的工具函数生成渐变颜色
            // color: new echarts.graphic.LinearGradient(
            //   // (x1,y2) 点到点 (x2,y2) 之间进行渐变
            //   0,
            //   0,
            //   0,
            //   1,
            //   [
            //     { offset: 0, color: "#00fffb" }, // 0 起始颜色
            //     { offset: 1, color: "#0061ce" }, // 1 结束颜色
            //   ]
            // ),
            // },
          }
        ]
      };
      this.myChart.setOption(this.option);
    }
  }
};
</script>
