<template>
  <div class="dashboard-editor-container">
    <div class="viewport">
      <div class="top">
        <div class="one">
          <div class="overview panel">
            <div class="inner">
              <div class="item">
                <h4>{{ data.todayhuoyueuser }}</h4>
                <span>
                  <i class="icon-dot" style="color: #006cff"></i>
                  今日活跃
                </span>
              </div>
              <div class="item">
                <h4>{{ data.leijiuser }}</h4>
                <span>
                  <i class="icon-dot" style="color: #6acca3"></i>
                  累计用户
                </span>
              </div>
              <div class="item">
                <h4>{{ data.todaynewuser }}</h4>
                <span>
                  <i class="icon-dot" style="color: #6acca3"></i>
                  今日新用户
                </span>
              </div>
              <div class="item">
                <h4>{{ data.todayxiandan }}</h4>
                <span>
                  <i class="icon-dot" style="color: #ed3f35"></i>
                  总下单额
                </span>
              </div>
            </div>
          </div>
          <div class="scroll">
            <div class="panel">
              <div class="inner orderbox">
                <ul class="tabtitle">
                  <li
                    v-for="(item, index) in tablist"
                    :class="tabindex == index ? 'active' : ''"
                    :key="index"
                    @click="changedata(index)"
                  >
                    {{ item.name }}
                  </li>
                </ul>
                <div class="orderqueen">
                  <vue-seamless-scroll
                    :data="datalist"
                    class="seamless-warp"
                    :class-option="scrollOption"
                  >
                    <div
                      id="con1"
                      ref="con1"
                      :class="{ anim: animate == true }"
                    >
                      <p v-for="(item, index) in datalist" :key="index">
                        <span v-if="tabindex == 0"
                          >用户: {{ item.origin.name | splitStr(5) }} 于
                          {{ item.updatetime | formatConversion }}
                          支付订单</span
                        >
                        <span v-if="tabindex == 1 && !$isEmpty(item.qishoumsg)"
                          >骑手: {{ item.qishoumsg.ridername | splitStr(5) }} 于
                          {{ item.updatetime | formatConversion }}
                          配送订单</span
                        >
                        <span v-if="tabindex == 2"
                          >骑手: {{ item.qishoumsg.ridername | splitStr(5) }} 于
                          {{ item.updatetime | formatConversion }}
                          完成配送订单</span
                        >
                      </p>
                    </div>
                  </vue-seamless-scroll>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="two">
          <div class="map">
            <!-- <h3>
              <span id="lastlvl" @click="backclick">上一级</span>
              <img src="../../../assets/image/title.png" alt="" />
            </h3> -->
            <div id="map"></div>
          </div>
        </div>
        <div class="three">
          <div class="overview panel">
            <div class="inner">
              <div class="item">
                <h4>{{ data.dangqiandan }}</h4>
                <span>
                  <i class="icon-dot" style="color: #006cff"></i>
                  总订单数
                </span>
              </div>
              <div class="item">
                <h4>{{ data.thisweekorder }}</h4>
                <span>
                  <i class="icon-dot" style="color: #6acca3"></i>
                  近7天订单数
                </span>
              </div>
              <div class="item">
                <h4>{{ data.thisweekchoucheng }}</h4>
                <span>
                  <i class="icon-dot" style="color: #6acca3"></i>
                  近7天抽点金额
                </span>
              </div>
              <div class="item">
                <h4>{{ data.thisweekyingli }}</h4>
                <span>
                  <i class="icon-dot" style="color: #ed3f35"></i>
                  近7天盈利金额
                </span>
              </div>
            </div>
          </div>
          <OrderChart
            :ordernum="ordernum"
            :gongjiangnum="gongjiangnum"
            :shopmoney="shopmoney"
            :gongjiangmoney="gongjiangmoney"
            v-if="ordernum.length != 0"
          ></OrderChart>
          <div class="wrap">
            <div class="channel panel">
              <div class="inner">
                <div class="data">
                  <div class="item">
                    <h5>{{ data.todaydan }}</h5>
                    <span> 今日订单数 </span>
                  </div>
                  <div class="item">
                    <h5>{{ data.todaydaijie }}</h5>
                    <span> 今日待接单 </span>
                  </div>
                </div>
                <div class="data">
                  <div class="item">
                    <h5>{{ data.todaypeisong }}</h5>
                    <span> 今日配送中 </span>
                  </div>
                  <div class="item">
                    <h5>{{ data.todaywancheng }}</h5>
                    <span> 今日完成单 </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="channel panel">
              <div class="inner">
                <div class="data">
                  <div class="item">
                    <h5>{{ data.ridernum }}</h5>
                    <span> 骑手数量 </span>
                  </div>
                  <div class="item">
                    <h5>{{ data.shopnum }}</h5>
                    <span> 商家数量 </span>
                  </div>
                </div>
                <div class="data">
                  <div class="item">
                    <h5>{{ data.todaynewrider }}</h5>
                    <span> 今日入驻骑手 </span>
                  </div>
                  <div class="item">
                    <h5>{{ data.todaynewshop }}</h5>
                    <span> 今日入驻商家 </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="panel left1">
          <div class="inner">
            <h3>近十日活跃用户数量</h3>
            <div class="chart">
              <UsernumChart
                :chartData="user"
                v-if="user.length > 0"
              ></UsernumChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { orserList } from "@/api/log";
import GithubCorner from "@/components/GithubCorner";
import PanelGroup from "./components/PanelGroup";
import LineChart from "./components/LineChart";
import RaddarChart from "./components/RaddarChart";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
import TransactionTable from "./components/TransactionTable";
import TodoList from "./components/TodoList";
import BoxCard from "./components/BoxCard";
import {
  getIndex,
  getBigData,
  getGjData,
  getHhrData,
  getZbData
} from "@/api/init";
import { getOrder } from "@/api/order";
import UsernumChart from "@/components/Charts/usernumChart";
import OrderChart from "@/components/Charts/orderChart";
import GongjiangnumChart from "@/components/Charts/gongjiangnumChart";
import ShopmoneyChart from "@/components/Charts/shopmoneyChart";
import GongjiangmoneyChart from "@/components/Charts/gongjiangmoneyChart";
import echarts from "echarts";
// 滚动插件
import vueSeamlessScroll from "vue-seamless-scroll";
// 时间过滤器
import { parseTime } from "@/utils";
export default {
  name: "DashboardAdmin",
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard,
    UsernumChart,
    OrderChart,
    GongjiangnumChart,
    ShopmoneyChart,
    GongjiangmoneyChart,
    vueSeamlessScroll
  },
  data() {
    return {
      myChart: "",
      lastname: "",
      curname: "中华人民共和国",
      data: {},
      user: [],
      ordernum: [],
      gongjiangnum: [],
      shopmoney: [],
      gongjiangmoney: [],
      numsdata: {
        loginusernum: 0,
        allusernum: 0,
        newusernum: 0,
        hehuorennum: 0
      },
      listQuery: {
        status: 1,
        page: 1,
        limit: 50
      },
      animate: false,
      datalist: [],
      orderList: [],
      gjList: [],
      hhrList: [],
      zbList: [],
      tablist: [
        // { id: "1", name: "用户下单" },
        // { id: "2", name: "跑腿配送" },
        // { id: "4", name: "跑腿完成" }
      ],
      tabindex: 0
    };
  },
  filters: {
    splitStr: function(str, num) {
      return str.length > num
        ? Array.from(str)
            .slice(0, num)
            .join("")
        : str;
    }
  },
  created() {},
  mounted() {
    this.init();
    this.draw();
  },
  computed: {
    scrollOption() {
      return {
        step: 0.5, // 数值越大速度滚动越快
        limitMoveNum: this.datalist.length, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      };
    }
  },

  methods: {
    async init() {
      await this.getIndex();
      await this.getOrderList();
      // await this.getData();
      // await this.getGjData();
      // await this.getHhrData();
      // await this.getZbData();
    },
    async getIndex() {
      await getIndex().then(res => {
        this.data = res.data;
        this.user = res.data.tendayusernum;
        this.ordernum = res.data.paotuiorder;
        this.shopmoney = res.data.paotuiprice;
        this.gongjiangnum = res.data.shoporder;
        this.gongjiangmoney = res.data.shopprice;
      });
    },
    async getOrderList() {
      getOrder(this.listQuery).then(res => {
        if (res.errcode == 0) {
          this.datalist = res.data.list;
          // this.total = res.data.count;
          this.listLoading = false;
        } else {
          this.$message({
            message: res.errmsg,
            type: "error"
          });
        }
      });
    },

    async getData(addressname = "") {
      console.log("addressname===", addressname);
      await getBigData({ address: addressname }).then(res => {
        this.numsdata = res.data;
        if (addressname != "") {
          this.selectCity(addressname);
        }
      });
    },

    // 地图
    draw() {
      var _this = this;
      this.myChart = echarts.init(document.getElementById("map"));
      this.$axios({
        method: "get",
        url: "/map/北京市.json", // 接口地址
        data: {
          keyword: "1" // 传接口参数
        }
      })
        .then(res => {
          console.log(res.data);
          echarts.registerMap("中华人民共和国", res.data);

          var option = {
            backgroundColor: "#080a20",
            title: {
              left: "left",
              textStyle: {
                color: "#fff"
              }
            },
            tooltip: {
              trigger: "item"
            },
            legend: {
              orient: "vertical",
              top: "bottom",
              left: "right",
              data: ["北京 Top10", "上海 Top10", "广州 Top10"],
              textStyle: {
                color: "#fff"
              },
              selectedMode: "single"
            },
            geo: {
              map: "中华人民共和国",
              zoom: 1.2,
              label: {
                show: true,
                color: "#00d2fc"
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: "#142957",
                  borderColor: "#0692a4"
                },
                emphasis: {
                  areaColor: "#0b1c2d"
                }
              }
            }
            // series: series
          };
          _this.myChart.setOption(option);
        })
        .catch(error => {
          // alert("没有下一级了！");
          return;
        }); // 失败的返回

      // 二级城市
      // _this.myChart.on("click", function(params) {
      //   console.log("params===", params);
      //   if (params.componentType == "geo") {
      //     var name = params.name;
      //     console.log("name", name);
      //     _this.getData(name);
      //   }
      // });
    },

    // selectCity(name) {
    //   var _this = this;
    //   _this
    //     .$axios({
    //       method: "get",
    //       url: "/map/" + name + ".json", // 接口地址
    //       dataType: "json", //返回格式为json
    //       async: true //请求是否异步，默认为异步，这也是ajax重要特性
    //     })
    //     .then(res => {
    //       var center = [];
    //       if (res.data.features.length != 0) {
    //         center = res.data.features[0].properties.center;
    //       }
    //       _this.lastname = _this.curname;
    //       _this.curname = name;
    //       echarts.registerMap(name, res.data);
    //       var optionbak = {
    //         backgroundColor: "#080a20",
    //         title: {
    //           left: "left",
    //           textStyle: {
    //             color: "#fff"
    //           }
    //         },
    //         tooltip: {
    //           trigger: "item"
    //         },
    //         legend: {
    //           orient: "vertical",
    //           top: "bottom",
    //           left: "right",
    //           data: ["北京 Top10", "上海 Top10", "广州 Top10"],
    //           textStyle: {
    //             color: "#fff"
    //           },
    //           selectedMode: "single"
    //         },
    //         geo: {
    //           map: name,
    //           zoom: 1.2,
    //           label: {
    //             show: true,
    //             color: "#00d2fc"
    //           },
    //           center: center,
    //           roam: true,
    //           itemStyle: {
    //             normal: {
    //               areaColor: "#142957",
    //               borderColor: "#0692a4"
    //             },
    //             emphasis: {
    //               areaColor: "#0b1c2d"
    //             }
    //           },
    //           regions: [
    //             {
    //               name: "广东",
    //               itemStyle: {
    //                 areaColor: "red",
    //                 color: "red"
    //               }
    //             }
    //           ]
    //         }
    //       };
    //       _this.myChart.setOption(optionbak);
    //     })
    //     .catch(error => {
    //       // alert("没有了！");
    //       return;
    //     }); // 失败的返回
    // },
    // async backclick() {
    //   var _this = this;

    //   if (_this.curname == "中华人民共和国") {
    //     _this.lastname = "";
    //     alert("已经为最上级");
    //     return;
    //   }
    //   _this.curname = _this.lastname;
    //   _this.lastname = "中华人民共和国";
    //   await getBigData({
    //     address: _this.curname == "中华人民共和国" ? "" : _this.curname
    //   }).then(res => {
    //     this.numsdata = res.data;
    //     _this
    //       .$axios({
    //         method: "get",
    //         url: "/map/" + _this.curname + ".json", // 接口地址
    //         dataType: "json", //返回格式为json
    //         async: true //请求是否异步，默认为异步，这也是ajax重要特性
    //       })
    //       .then(res => {
    //         console.log(res.data);
    //         var center = [];
    //         if (res.data.features.length != 0) {
    //           center = res.data.features[0].properties.center;
    //         }

    //         echarts.registerMap(_this.curname, res.data);
    //         console.log("backres------");
    //         var optionbak = {
    //           backgroundColor: "#080a20",
    //           title: {
    //             left: "left",
    //             textStyle: {
    //               color: "#fff"
    //             }
    //           },
    //           tooltip: {
    //             trigger: "item"
    //           },
    //           legend: {
    //             orient: "vertical",
    //             top: "bottom",
    //             left: "right",
    //             data: ["北京 Top10", "上海 Top10", "广州 Top10"],
    //             textStyle: {
    //               color: "#fff"
    //             },
    //             selectedMode: "single"
    //           },
    //           geo: {
    //             map: _this.curname,
    //             center: center,
    //             zoom: 1.2,
    //             label: {
    //               show: true,
    //               color: "#00d2fc",
    //               emphasis: {
    //                 show: false
    //               }
    //             },
    //             roam: true,
    //             itemStyle: {
    //               normal: {
    //                 areaColor: "#142957",
    //                 borderColor: "#0692a4"
    //               },
    //               emphasis: {
    //                 areaColor: "#0b1c2d"
    //               }
    //             }
    //           }
    //           // series: series
    //         };

    //         _this.myChart.setOption(optionbak);
    //       })
    //       .catch(error => {
    //         alert("没有上一级了！");
    //         return;
    //       }); // 失败的返回
    //   });
    // },
    async changedata(index) {
      this.tabindex = index;
      this.listQuery.status = this.tablist[index].id;
      this.getOrderList();
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  width: 100%;
  height: 900px;
  background: #101129;
}

.viewport {
  /* 限定大小 */
  min-width: 1024px;
  height: 100%;
  margin: 0 auto;
  // background: url(../images/logo.png) no-repeat 0 0 / contain;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  // padding: 90px 0.833rem 0;
  .top {
    width: 100%;
    flex: 1;
    display: flex;
    padding: 10px 20px;
    .one,
    .three {
      width: 500px;
      height: 100%;
      display: flex;
      flex-direction: column;
      /* 概览区域 */
      .overview {
        height: 100px;
      }
      .overview .inner {
        display: flex;
        justify-content: space-between;
      }
      .overview h4 {
        font-size: 23px;
        padding-left: 10px;
        color: #fff;
        margin-bottom: 10px;
      }
      .overview span {
        font-size: 16px;
        color: #4c9bfd;
      }

      .scroll {
        flex: 1;
        .orderbox {
          display: flex;
          flex-direction: column;
        }
        .orderqueen {
          flex: 1;
          overflow: hidden;

          .anim {
            transition: all 0.8s;
          }
          #con1 p {
            padding: 0;
            margin: 0;
            height: 40px;
            line-height: 40px;
            color: #61a8ff;
          }
        }
      }

      .tabtitle {
        width: 100%;
        display: flex;
        padding: 0;
        margin: 0;
        margin-top: 20px;
        padding-bottom: 20px;
        li {
          flex: 1;
          text-align: center;
          font-size: 16px;
          color: #0bace6;
          list-style: none;
          padding: 5px 0;
          border-radius: 5px;
          cursor: pointer;
        }
        .active {
          background-color: #4c9bfd;
          color: #fff;
        }
      }
    }

    .two {
      flex: 1;
      //   flex: 1;
      margin: 0 10px 0;
      display: flex;
      flex-direction: column;
      .map {
        width: 100%;
        flex: 2;
      }
      #map {
        width: 100%;
        height: 100%;
      }
      .map h3 {
        line-height: 1;
        padding: 0;
        margin: 0;
        font-size: 14px;
        color: #fff;
        position: relative;
        img {
          width: 100%;
        }
        span {
          position: absolute;
          top: 20px;
        }
      }
      #lastlvl {
        -moz-user-select: none; /*火狐*/
        -webkit-user-select: none; /*webkit浏览器*/
        -ms-user-select: none; /*IE10*/
        -khtml-user-select: none; /*早期浏览器*/
        user-select: none;
        margin-left: 1rem;
        background-image: url("../../../assets/image/btn.png");
        background-size: cover;
        padding: 0.5rem;
        font-size: 16px;
        cursor: pointer;
      }
    }

    .three {
      .wrap {
        display: flex;
        width: 100%;
        flex: 1;
        margin-top: 20px;
      }
      .channel,
      .quarter {
        flex: 1;
        height: 100%;
      }
      .channel {
        margin-right: 10px;
      }
      .channel .data {
        width: 100%;
        height: 50%;
        overflow: hidden;
        display: flex;
        .item {
          flex: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      }
      .data:nth-child(1) {
        margin-top: 10px;
      }
      .channel h5 {
        color: #fff;
        font-size: 23px;
        margin: 0;
        padding: 0;
      }
      .channel span {
        display: block;
        color: #4c9bfd;
        font-size: 16px;
        margin-top: 10px;
      }
    }
  }
  .bottom {
    width: 100%;
    height: 330px;
    padding: 0px 20px 20px;
  }
}

.panel {
  /* 边框 */
  box-sizing: border-box;
  border: 2px solid red;
  border-image: url("../../../assets/image/border.png") 51 38 21 132;
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
</style>
