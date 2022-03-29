<template>
  <div :style="{ width: '100%', height: '250px' }">
    <div class="sales panel">
      <div class="inner">
        <div class="caption" ref="caption">
          <h3>销售额统计</h3>
          <a
            href="javascript:;"
            v-for="(item, index) in tablist"
            :class="tabindex == index ? 'active' : ''"
            :key="index"
            @click="changedata(index)"
            >{{ item }}</a
          >
        </div>
        <div class="chart">
          <div class="line" id="orderChart"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  props: {
    ordernum: {
      type: Array,
      default:[10, 40, 50, 20, 50],
    },
    gongjiangnum: {
      type: Array,
      default:[20, 40, 60, 20, 50],
    },
    shopmoney: {
      type: Array,
      default:[120, 40, 80, 20, 50],
    },
    gongjiangmoney: {
      type: Array,
      default:[120, 40, 100, 20, 50],
    },
    chartData: {
      require: true,
    },
  },
  data() {
    return {
      option: {},
      myChart: null,
      tablist: ["订单数", "销售额"],
      tabindex: 0,
    };
  },
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      var _this = this;
      this.myChart = echarts.init(document.getElementById("orderChart"));
      this.option = {
        //鼠标提示工具
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          // 类目类型
          type: "category",
          // x轴刻度文字
          data: ["前6日", "前5日", "前4日", "前3日", "前2日", "昨日", "今日"],
          axisTick: {
            show: false, //去除刻度线
          },
          axisLabel: {
            color: "#4c9bfd", //文本颜色
          },
          axisLine: {
            show: false, //去除轴线
          },
          boundaryGap: false, //去除轴内间距
        },
        yAxis: {
          // 数据作为刻度文字
          type: "value",
          axisTick: {
            show: false, //去除刻度线
          },
          axisLabel: {
            color: "#4c9bfd", //文本颜色
          },
          axisLine: {
            show: false, //去除轴线
          },
          boundaryGap: false, //去除轴内间距
        },
        //图例组件
        legend: {
          textStyle: {
            color: "#4c9bfd", // 图例文字颜色
          },
          right: "5%", //距离右边10%
          top: "0",
        },
        // 设置网格样式
        grid: {
          show: true, // 显示边框
          top: "20%",
          left: "3%",
          right: "4%",
          bottom: "3%",
          borderColor: "#012f4a", // 边框颜色
          containLabel: true, // 包含刻度文字在内
        },
        series: [
          {
            name: "跑腿订单",
            // 数据
            data: this.ordernum,
            // 图表类型
            type: "line",
            // 圆滑连接
            smooth: true,
            itemStyle: {
              color: "#00f2f1", // 线颜色
            },
          },
          {
            name: "外卖订单",
            // 数据
            data: this.gongjiangnum,
            // 图表类型
            type: "line",
            // 圆滑连接
            smooth: true,
            itemStyle: {
              color: "#ed3f35", // 线颜色
            },
          },
        ],
      };
      window.onresize = this.myChart.resize;
      this.myChart.setOption(this.option);

      //点击效果
      //   var data = {
      //     year: [
      //       [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
      //       [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
      //     ],
      //     quarter: [
      //       [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
      //       [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34],
      //     ],
      //   };

      //   this.$refs.caption.on("click", ".caption a", function () {
      //     $(this).addClass("active").siblings("a").removeClass("active");
      //     //option series   data
      //     //获取自定义属性值
      //     var key = $(this).attr("data-type");
      //     //取出对应的值
      //     key = data[key];
      //     //将值设置到 图表中
      //     option.series[0].data = key[0];
      //     option.series[1].data = key[1];
      //     //再次调用才能在页面显示
      //     myechart.setOption(option);
      //   });
      //   //定时器
      var index = 0;
      var timer = setInterval(function () {
        index++;
        if (index > 1) {
          index = 0;
        }
        _this.changedata(index);
      }, 2000);
    },

    changedata(index) {
      console.log(index);
      this.tabindex = index;
      if (index == 0) {
        // 订单数
        this.option.series[0].data = this.ordernum;
        this.option.series[1].data = this.gongjiangnum;
      } else {
        this.option.series[0].data = this.shopmoney;
        this.option.series[1].data = this.gongjiangmoney;
      }

      //再次调用才能在页面显示
      this.myChart.setOption(this.option);
    },
  },
};
</script>
<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
.panel {
  /* 边框 */
  box-sizing: border-box;
  border: 2px solid red;
  border-image: url("../../assets/image/border.png") 51 38 21 132;
  border-width: 2.125rem 1.583rem 0.875rem 5.5rem;
  position: relative;
  margin-bottom: 0.833rem;
  width: 100%;
  height: 100%;
}

.panel .inner {
  /* 装内容 */
  /* height: 60px; */
  position: absolute;
  top: -55px;
  right: -1.583rem;
  bottom: -0.875rem;
  left: -5.5rem;
  padding: 1rem 1.5rem;
}

.panel h3 {
  font-size: 16px;
  color: #fff;
}

.sales {
  height: 100%;
}
.sales .caption {
  height: 30px;
  display: flex;
  margin-top: 20px;
}
.sales h3 {
  height: 30px;
  line-height: 30px;
  padding-right: 10px;
  border-right: 1px solid #00f2f1;
  margin-right: 10px;
}
.sales a {
  display: block;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  border-radius: 5px;
  color: #0bace6;
  padding: 0 10px;
}
.sales a.active {
  background-color: #4c9bfd;
  color: #fff;
}
.sales .inner {
  display: flex;
  flex-direction: column;
}
.sales .chart {
  flex: 1;
  position: relative;
}
.sales .label {
  position: absolute;
  left: 10px;
  top: 0px;
  color: #4996f5;
  font-size: 14px;
}
.sales .line {
  width: 100%;
  height: 100%;
}
</style>