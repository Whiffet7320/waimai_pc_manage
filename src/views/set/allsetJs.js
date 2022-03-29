import Pagination from "@/components/Pagination";
import { getSet } from "@/api/set";
import waves from "@/directive/waves"; // waves directive
import xiaofei from "./components/xiaofei/xiaofei.vue";
import weight from "./components/weight/weight.vue";
import baojia from "./components/baojia/baojia.vue";
import car from "./components/car/car.vue";
import fenxiao from "./components/fenxiao/fenxiao.vue";
import jiaji from "./components/jiaji/jiaji.vue";
import jixiao from "./components/jixiao/jixiao.vue";
import level from "./components/level/level.vue";
import songhuo from "./components/songhuo/songhuo.vue";
import timetemp from "./components/timetemp/timetemp.vue";
import tuisong from "./components/tuisong/tuisong.vue";
import typetemp from "./components/typetemp/typetemp.vue";
import yijia from "./components/yijia/yijia.vue";
import tuihuo from "./components/tuihuo/tuihuo.vue";
import kaiping from "./components/kaipingadv/adv.vue";
import riderjiedan from "./components/riderjiedan/riderjiedan.vue";
import riderprice from "./components/riderprice/riderprice.vue";
import choucheng from "./components/choucheng/choucheng.vue";
import appleshenhe from "./components/appleshenhe/appleshenhe.vue";
import qishoubaoxian from "./components/qishoubaoxian/index.vue";
import qishouguize from "./components/qishouguize/index.vue";
import usecoupon from "./components/usecoupon/index.vue";
export default {
  directives: { waves },
  components: {
    Pagination,
    xiaofei,
    weight,
    baojia,
    car,
    fenxiao,
    jiaji,
    jixiao,
    level,
    songhuo,
    timetemp,
    tuisong,
    typetemp,
    yijia,
    tuihuo,
    kaiping,
    riderjiedan,
    riderprice,
    choucheng,
    appleshenhe,
    qishoubaoxian,
    qishouguize,
    usecoupon
  },
  data() {
    return {
      changeIndex: "1",
      data: {},
      xiaofeitemp: {},
      weighttemp: {},
      baojiatemp: {},
      typetemp: {},
      jiajitemp: {},
      cartemp: {},
      yijiatemp: {},
      timetemp: {},
      riderlevel: {},
      tuihuobutie: {},
      position: {}, // 送货设置 // 距离价钱
      delivery: {}, // 送货设置 // 时间价钱
      fenchengtemp: {}, // 绩效分成 // 分成模版
      jixiaotemp: {}, // 绩效分成 // 绩效模版
      fenxiaotemp: {},
      tuisong: {},
      kaiping: {},
      riderjiedan: {},
      choucheng: {},
      shenhe: {},
      baoxian: {},
      qishouguize: {},
      usecoupon:{},
    };
  },
  created() {
    this.getSet();
  },
  methods: {
    handleClick(tab, event) {
      this.changeIndex = tab.name;
    },
    getSet() {
      this.listLoading = true;
      getSet().then(res => {
        if (res.errcode == 0) {
          this.data = res.data;
          console.log(res.data);
          this.xiaofeitemp = res.data.xiaofeimoban;
          this.weighttemp = res.data.weightmoban;
          this.baojiatemp = res.data.orderjiazhi;
          this.typetemp = res.data.typemoban;
          this.jiajitemp = res.data.jiajimoban;
          this.cartemp = res.data.carmoban;
          this.yijiatemp = res.data.yijiamoban;
          this.timetemp = res.data.timemoban;
          this.riderlevel = res.data.riderlevel;
          this.tuihuobutie = res.data.tuihuobutie;
          this.position = res.data.positionprice;
          this.delivery = res.data.deliverytime;
          this.fenchengtemp = res.data.ridermoban;
          this.jixiaotemp = res.data.jixiaomoban;
          this.fenxiaotemp = res.data.fenxiaomoban;
          this.tuisong = res.data.tuisong;
          this.kaiping = res.data.kaiping;
          this.riderjiedan = res.data.riderjiedan;
          this.choucheng = res.data.choucheng;
          this.shenhe = res.data.shenhe;
          this.baoxian = res.data.riderfirst;
          this.qishouguize = res.data.riderfenrule;
          this.usecoupon = res.data.youhuiflag;
          this.listLoading = false;
        } else {
          this.$message({
            message: res.errmsg,
            type: "error"
          });
        }
      });
    }
  }
};