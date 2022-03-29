<template>
  <div class="map">
    <h3>
      <span id="lastlvl" @click="backclick">上一级</span>
    </h3>
    <div id="map"></div>
  </div>
</template>
<script>
import echarts from "echarts";
import Axios from "axios";
export default {
  props: {
    chartData2: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      myChart: "",
      lastname: "",
      curname: "中华人民共和国",
    };
  },
  mounted() {
    console.log(";1111");
    this.draw();
  },
  methods: {
    draw() {
      var _this = this;
      this.myChart = echarts.init(document.getElementById("map"));
      this.$axios({
        method: "get",
        url: "/map/中华人民共和国.json", // 接口地址
        data: {
          keyword: "1", // 传接口参数
        },
      })
        .then((res) => {
          console.log(res.data);
          echarts.registerMap("中华人民共和国", res.data);

          var option = {
            backgroundColor: "#080a20",
            title: {
              left: "left",
              textStyle: {
                color: "#fff",
              },
            },
            tooltip: {
              trigger: "item",
            },
            legend: {
              orient: "vertical",
              top: "bottom",
              left: "right",
              data: ["北京 Top10", "上海 Top10", "广州 Top10"],
              textStyle: {
                color: "#fff",
              },
              selectedMode: "single",
            },
            geo: {
              map: "中华人民共和国",
              zoom: 1.2,
              label: {
                show: true,
                color: "#00d2fc",
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: "#142957",
                  borderColor: "#0692a4",
                },
                emphasis: {
                  areaColor: "#0b1c2d",
                },
              },
            },
            // series: series
          };
          _this.myChart.setOption(option);
        })
        .catch((error) => {
          alert("没有下一级了！");
          return;
        }); // 失败的返回

      // 二级城市
      _this.myChart.on("click", function (params) {
        if (params.componentType == "geo") {
          var name = params.name;
          console.log("name", name);
          _this
            .$axios({
              method: "get",
              url: "/map/" + name + ".json", // 接口地址
              dataType: "json", //返回格式为json
              async: true, //请求是否异步，默认为异步，这也是ajax重要特性
            })
            .then((res) => {
              var center = [];
              if (res.data.features.length != 0) {
                center = res.data.features[0].properties.center;
              }
              _this.lastname = _this.curname;
              _this.curname = name;
              echarts.registerMap(name, res.data);
              var optionbak = {
                backgroundColor: "#080a20",
                title: {
                  left: "left",
                  textStyle: {
                    color: "#fff",
                  },
                },
                tooltip: {
                  trigger: "item",
                },
                legend: {
                  orient: "vertical",
                  top: "bottom",
                  left: "right",
                  data: ["北京 Top10", "上海 Top10", "广州 Top10"],
                  textStyle: {
                    color: "#fff",
                  },
                  selectedMode: "single",
                },
                geo: {
                  map: name,
                  zoom: 1.2,
                  label: {
                    show: true,
                    color: "#00d2fc",
                  },
                  center: center,
                  roam: true,
                  itemStyle: {
                    normal: {
                      areaColor: "#142957",
                      borderColor: "#0692a4",
                    },
                    emphasis: {
                      areaColor: "#0b1c2d",
                    },
                  },
                  regions: [
                    {
                      name: "广东",
                      itemStyle: {
                        areaColor: "red",
                        color: "red",
                      },
                    },
                  ],
                },
              };
              _this.myChart.setOption(optionbak);
            })
            .catch((error) => {
              alert("没有下一级了！");
              return;
            }); // 失败的返回
        }
      });
    },
    backclick() {
      var _this = this;
      
      if (_this.curname == "中华人民共和国") {
        _this.lastname = "";
        alert("已经为最上级");
        return;
      }
      _this.curname = _this.lastname;
      _this.lastname = "中华人民共和国";

      _this
        .$axios({
          method: "get",
          url: "/map/" + _this.curname + ".json", // 接口地址
          dataType: "json", //返回格式为json
          async: true, //请求是否异步，默认为异步，这也是ajax重要特性
        })
        .then((res) => {
          console.log(res.data);
          var center = [];
          if (res.data.features.length != 0) {
            center = res.data.features[0].properties.center;
          }

          echarts.registerMap(_this.curname, res.data);
          console.log('backres------');
          var optionbak = {
            backgroundColor: "#080a20",
            title: {
              left: "left",
              textStyle: {
                color: "#fff",
              },
            },
            tooltip: {
              trigger: "item",
            },
            legend: {
              orient: "vertical",
              top: "bottom",
              left: "right",
              data: ["北京 Top10", "上海 Top10", "广州 Top10"],
              textStyle: {
                color: "#fff",
              },
              selectedMode: "single",
            },
            geo: {
              map: _this.curname,
              center: center,
              zoom: 1.2,
              label: {
                show: true,
                color: "#00d2fc",
                emphasis: {
                  show: false,
                },
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: "#142957",
                  borderColor: "#0692a4",
                },
                emphasis: {
                  areaColor: "#0b1c2d",
                },
              },
            },
            // series: series
          };

          _this.myChart.setOption(optionbak);
        })
        .catch((error) => {
          alert("没有上一级了！");
          return;
        }); // 失败的返回
    },
  },
};
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100%;
}
.map h3 {
  line-height: 1;
  padding: 0.667rem 0;
  margin: 0;
  font-size: 0.833rem;
  color: #fff;
}
#lastlvl {
  margin-left: 1rem;
  background-image: url("../../assets/image/btn.png");
  background-size: cover;
  padding: 0.5rem;
  font-size: 16px;
}
</style>