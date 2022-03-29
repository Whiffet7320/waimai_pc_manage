<template>
  <el-row type="flex" class="row-bg" :gutter="10">
    <el-col :xs="15" :sm="15" :md="10" :lg="8" :xl="6">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="返佣等待时间:" class="form_item_label" />
        <el-form-item label="返佣等待时间" prop="fanyongdelay.day">
          <el-input v-model="ruleForm.fanyongdelay.day" type="number" />
        </el-form-item>
        <el-form-item label="支付参数:" class="form_item_label" />
        <el-form-item label="购买主播权益费用" prop="pay.anchor">
          <el-input v-model="ruleForm.pay.anchor" type="number" />
        </el-form-item>
        <el-form-item label="入驻供货商缴费" prop="pay.store_apply">
          <el-input v-model="ruleForm.pay.store_apply" type="number" />
        </el-form-item>
        <el-form-item label="最低提现金额">
          <el-input v-model="ruleForm.withdraw.min" type="number" />
        </el-form-item>
        <el-form-item label="提现费率">
          <el-input v-model="ruleForm.withdraw.rate" type="number" />
        </el-form-item>
        <el-form-item label="取消订单时间（分钟）" prop="pay.time">
          <el-input v-model.number="ruleForm.pay.time" />
        </el-form-item>
        <el-form-item label="佣金参数:" />
        <el-form-item label="播商(百分比%)" prop="zhubofenxiangyongjin.lvlzhubo">
          <el-input v-model="ruleForm.zhubofenxiangyongjin.lvlzhubo" type="number" />
        </el-form-item>
        <el-form-item label="播商服务商(百分比%)" prop="zhubofenxiangyongjin.lvlgaojihehuoren">
          <el-input v-model="ruleForm.zhubofenxiangyongjin.lvlgaojihehuoren" type="number" />
        </el-form-item>

        <!-- <el-form-item label="播商服务商:"></el-form-item>
        <el-form-item label="播商服务商费用(元)" prop="hehuoren.amount">
          <el-input v-model="ruleForm.hehuoren.amount" type="number"></el-input>
        </el-form-item>-->

        <el-form-item label="播商直推(人数)" prop="hehuoren.zhitui">
          <el-input v-model="ruleForm.hehuoren.zhitui" type="number" />
        </el-form-item>

        <el-form-item label="播商团队(人数)" prop="hehuoren.tuandui">
          <el-input v-model="ruleForm.hehuoren.tuandui" type="number" />
        </el-form-item>

        <el-form-item label="招募:" />
        <el-form-item label="招募播商给播商返利(元)" prop="zhaomuzhubo.lvl1zhubo">
          <el-input v-model="ruleForm.zhaomuzhubo.lvl1zhubo" type="number" />
        </el-form-item>
        <el-form-item label="招募播商给服务商返利(元)" prop="zhaomuzhubo.lvl1gaojihehuoren">
          <el-input v-model="ruleForm.zhaomuzhubo.lvl1gaojihehuoren" type="number" />
        </el-form-item>
        <el-form-item label="招募服务商给播商返利(元)" prop="zhaomuzhubo.lvl2zhubo">
          <el-input v-model="ruleForm.zhaomuzhubo.lvl2zhubo" type="number" />
        </el-form-item>
        <el-form-item label="招募服务商给服务商返利(元)" prop="zhaomuzhubo.lvl2gaojihehuoren">
          <el-input v-model="ruleForm.zhaomuzhubo.lvl2gaojihehuoren" type="number" />
        </el-form-item>

        <el-form-item label="主播带货:" />
        <el-form-item label="播商(整数%)" prop="zhubodaihuo.lvl1zhubo">
          <el-input v-model="ruleForm.zhubodaihuo.lvl1zhubo" placeholder="请输入整数(%)" type="number" />
        </el-form-item>
        <el-form-item label="播商服务商(整数%)" prop="zhubodaihuo.lvl1gaojihehuoren">
          <el-input
            v-model="ruleForm.zhubodaihuo.lvl1gaojihehuoren"
            placeholder="请输入整数(%)"
            type="number"
          />
        </el-form-item>

        <el-form-item label="主播带货上级佣金:" />
        <el-form-item label="播商返利比例(整数%)" prop="zhubodaihuo.shangji_lv1_fanli">
          <el-input
            v-model="ruleForm.zhubodaihuo.shangji_lv1_fanli"
            placeholder="请输入整数(%)"
            type="number"
          />
        </el-form-item>
        <el-form-item label="服务商比例返利(整数%)" prop="zhubodaihuo.shangji_lv2_fanli">
          <el-input
            v-model="ruleForm.zhubodaihuo.shangji_lv2_fanli"
            placeholder="请输入整数(%)"
            type="number"
          />
        </el-form-item>
        <!--        <el-form-item label="上级播商" prop="zhubodaihuo.lvl2zhubo">
          <el-input v-model="ruleForm.zhubodaihuo.lvl2zhubo" type="number"></el-input>
        </el-form-item>
        <el-form-item label="上级播商服务商" prop="zhubodaihuo.lvl2gaojihehuoren">
          <el-input v-model="ruleForm.zhubodaihuo.lvl2gaojihehuoren" type="number"></el-input>
        </el-form-item>-->

        <el-form-item label="积分参数:" />
        <!-- <el-form-item label="成为播商服务商" prop="jifen.zhuce">
          <el-input v-model="ruleForm.jifen.zhuce" type="number" />
        </el-form-item>
        <el-form-item label="直推播商服务商" prop="jifen.zhitui">
          <el-input v-model="ruleForm.jifen.zhitui" type="number" />
        </el-form-item>
        <el-form-item label="积分比例" prop="jifen.bili">
          <el-input v-model="ruleForm.jifen.bili" type="number" />
        </el-form-item>-->
        <el-form-item label="升级给的积分">
          <el-input v-model="ruleForm.score.levelup" type="number" />
        </el-form-item>
        <el-form-item label="直推给的积分">
          <el-input v-model="ruleForm.score.zhitui" type="number" />
        </el-form-item>
        <el-form-item label="播商服务商或合伙人给的积分">
          <el-input v-model="ruleForm.score.hehuoren" type="number" />
        </el-form-item>

        <el-form-item label="高级播商服务商:" />
        <el-form-item label="账号数量" prop="account.num">
          <el-input v-model="ruleForm.account.num" type="number" />
        </el-form-item>

        <!--        <el-form-item label="霸买配置:"></el-form-item>
        <el-form-item label="未中奖返利" prop="bamaifanli.amount">
          <el-input v-model="ruleForm.bamaifanli.amount" type="number"></el-input>
        </el-form-item>-->

        <!--        <el-form-item label="上级播商返利" prop="bamaishangjifanli.lvl1zhubo">
          <el-input v-model="ruleForm.bamaishangjifanli.lvl1zhubo" type="number"></el-input>
        </el-form-item>
        <el-form-item label="上级播商服务商返利" prop="bamaishangjifanli.lvl1gaojihehuoren">
          <el-input v-model="ruleForm.bamaishangjifanli.lvl1gaojihehuoren" type="number"></el-input>
        </el-form-item>
        <el-form-item label="上上级播商" prop="bamaishangjifanli.lvl2zhubo">
          <el-input v-model="ruleForm.bamaishangjifanli.lvl2zhubo" type="number"></el-input>
        </el-form-item>
        <el-form-item label="上上级播商服务商返利" prop="bamaishangjifanli.lvl2gaojihehuoren">
          <el-input v-model="ruleForm.bamaishangjifanli.lvl2gaojihehuoren" type="number"></el-input>
        </el-form-item>-->

        <el-form-item label="直播礼物参数:" />
        <el-form-item label="平台抽成" prop="live.platform">
          <el-input v-model="ruleForm.live.platform" type="number" />
        </el-form-item>
        <el-form-item label="平台金币兑换比例" prop="coin.bill">
          <el-input v-model="ruleForm.coin.bill" type="number" />
        </el-form-item>
        <el-form-item label="直播打赏上级返佣比例" prop="live.superior_anchor">
          <el-input v-model="ruleForm.live.superior_anchor" type="number" />
        </el-form-item>
        <el-form-item label="播商分红" prop="live.lvl1zhubo">
          <el-input v-model="ruleForm.live.lvl1zhubo" type="number" />
        </el-form-item>
        <el-form-item label="播商服务商分红" prop="live.lvl1gaojihehuoren">
          <el-input v-model="ruleForm.live.lvl1gaojihehuoren" type="number" />
        </el-form-item>
        <el-form-item label="上级播商分红" prop="live.lvl2zhubo">
          <el-input v-model="ruleForm.live.lvl2zhubo" type="number" />
        </el-form-item>
        <el-form-item label="上级播商服务商分红" prop="live.lvl2gaojihehuoren">
          <el-input v-model="ruleForm.live.lvl2gaojihehuoren" type="number" />
        </el-form-item>
        <el-form-item label="店铺参数:" />
        <el-form-item label="店铺名称" prop="store.store_name">
          <el-input v-model="ruleForm.store.store_name" />
        </el-form-item>
        <el-form-item label="店铺描述" prop="store.store_desc">
          <el-input v-model="ruleForm.store.store_desc" />
        </el-form-item>
        <el-form-item label="店铺头像" prop="store.store_headimg">
          <el-upload
            ref="uploadheading"
            class="avatar-uploader"
            action
            :show-file-list="false"
            :auto-upload="false"
            :on-change="uploadHeading"
            :on-remove="handleRemove"
          >
            <img
              v-if="ruleForm.store.store_headimg"
              :src="ruleForm.store.store_headimg"
              style="width: 100px; height: 100px"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="首页中部图片" prop="between.imgurl">
          <el-upload
            ref="uploadheading"
            class="avatar-uploader"
            action
            :show-file-list="false"
            :auto-upload="false"
            :on-change="uploadBetween"
            :on-remove="handleRemove"
          >
            <img
              v-if="ruleForm.between.imgurl"
              :src="ruleForm.between.imgurl"
              style="width: 100px; height: 100px"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="店铺背景" prop="store.store_img">
          <el-upload
            ref="uploadImg"
            class="avatar-uploader"
            action
            :show-file-list="false"
            :auto-upload="false"
            :on-change="uploadImg"
            :on-remove="handleRemove"
          >
            <img
              v-if="ruleForm.store.store_img"
              :src="ruleForm.store.store_img"
              style="width: 100px; height: 100px"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="审核配置:" />
        <el-form-item label="微信登录开关" prop="shenhe.enable">
          <el-input v-model="ruleForm.shenhe.enable" type="number" />
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import { getDeploy, getAddDeploy } from "@/api/gdzs.js";
import { getBase64, upload } from "@/api/upload";

export default {
  name: "Deploy",
  data() {
    return {
      //
      ruleForm: {
        fanyongdelay: { day: null },
        shenhe: { enable: null},
        pay: { anchor: null, store_apply: null, time: null },
        commission: { share: null, sheng: null, platform: null },
        hehuoren: { amount: null, zhitui: null, tuandui: null },
        zhaomuzhubo: {
          lvl1zhubo: null,
          lvl1gaojihehuoren: null,
          lvl2zhubo: null,
          lvl2gaojihehuoren: null,
        },
        zhubodaihuo: {
          lvl1zhubo: null,
          lvl1gaojihehuoren: null,
          lvl2zhubo: null,
          lvl2gaojihehuoren: null,
          shangji_lv1_fanli: null,
          shangji_lv2_fanli: null,
        },

        zhubofenxiangyongjin: { lvlzhubo: null, lvlgaojihehuoren: null },
        jifen: { zhece: null, zhitui: null, bili: null },
        coin: { bili: null },
        score: { levelup: null, zhitui: null, hehuoren: null },
        live: {
          platform: null,
          lvl1zhubo: null,
          lvl1gaojihehuoren: null,
          lvl2zhubo: null,
          lvl2gaojihehuoren: null,
          superior_anchor: null,
        },
        account: { account: null },
        withdraw: { min: null, rate: null },
        // bamaifanli: { amount: null },
        // bamaishangjifanli: { lvl1zhubo: null, lvl1gaojihehuoren: null, lvl2zhubo: null, lvl2gaojihehuoren: null },
        store: {
          store_descz: "",
          store_headimg: "",
          store_img: "",
          store_name: "",
        },
        between: {
          imgurl: "",
        },
      },
      rules: {
        "pay.anchor": [
          { required: true, message: "请输入购买主播费用", trigger: "blur" },
        ],
        "pay.store_apply": [
          { required: true, message: "请输入入驻缴费", trigger: "blur" },
        ],
        "pay.time": [
          { required: true, message: "请输入取消订单时间", trigger: "blur" },
        ],
        "commission.share": [
          { required: true, message: "请输入分享购比例", trigger: "blur" },
        ],
        // "commission.platform": [
        //   { required: true, message: "请输入分红", trigger: "blur" }
        // ],

        // "hehuoren.amount": [
        //   { required: true, message: "请输入高级播商服务商费用", trigger: "blur" }
        // ],
        "hehuoren.zhitui": [
          { required: true, message: "请输入播商直推", trigger: "blur" },
        ],
        "hehuoren.tuandui": [
          { required: true, message: "请输入播商团队", trigger: "blur" },
        ],
        "zhaomuzhubo.lvl1zhubo": [
          {
            required: true,
            message: "请输入上级播商招募返利",
            trigger: "blur",
          },
        ],
        "zhaomuzhubo.lvl1hehuoren": [
          {
            required: true,
            message: "请输入上级播商服务商招募返利",
            trigger: "blur",
          },
        ],
        "zhaomuzhubo.lvl2zhubo": [
          {
            required: true,
            message: "请输入上上级播商招募返利",
            trigger: "blur",
          },
        ],
        "zhaomuzhubo.lvl2gaojihehuoren": [
          {
            required: true,
            message: "请输入上上级播商招募返利",
            trigger: "blur",
          },
        ],
        "zhubodaihuo.lvl1zhubo": [
          { required: true, message: "请输入播商带货返利", trigger: "blur" },
        ],
        "zhubodaihuo.lvl1hehuoren": [
          {
            required: true,
            message: "请输入播商服务商带货返利",
            trigger: "blur",
          },
        ],
        "zhubodaihuo.lvl2zhubo": [
          {
            required: true,
            message: "请输入上级播商带货返利",
            trigger: "blur",
          },
        ],
        "zhubodaihuo.lvl2gaojihehuoren": [
          {
            required: true,
            message: "请输入上上级播商招募返利",
            trigger: "blur",
          },
        ],

        "zhubofenxiangyongjin.lvlzhubo": [
          { required: true, message: "请输入播商分享佣金", trigger: "blur" },
        ],

        "zhubofenxiangyongjin.lvlgaojihehuoren": [
          {
            required: true,
            message: "请输入播商服务商分享佣金",
            trigger: "blur",
          },
        ],
        "jifen.zhuce": [
          {
            required: true,
            message: "请输入成为播商服务商获得积分",
            trigger: "blur",
          },
        ],
        "jifen.zhitui": [
          {
            required: true,
            message: "请输入直推播商服务商获得佣金",
            trigger: "blur",
          },
        ],
        "jifen.bili": [
          { required: true, message: "请输入积分比例", trigger: "blur" },
        ],

        "coin.bili": [
          {
            required: true,
            message: "请输入平台金币兑换比例",
            trigger: "blur",
          },
        ],

        "live.platform": [
          { required: true, message: "请输入请输入分红", trigger: "blur" },
        ],
        "live.lvl1zhubo": [
          { required: true, message: "请输入播商分红比例", trigger: "blur" },
        ],
        "live.lvl1gaojihehuoren": [
          {
            required: true,
            message: "请输入播商服务商分红比例",
            trigger: "blur",
          },
        ],
        "live.lvl2zhubo": [
          {
            required: true,
            message: "请输入上级播商分红比例",
            trigger: "blur",
          },
        ],
        "live.lvl2gaojihehuoren": [
          {
            required: true,
            message: "请输入上级播商服务商分红比例",
            trigger: "blur",
          },
        ],
        "account.num": [
          {
            required: true,
            message: "请输入播商服务商赠送账号",
            trigger: "blur",
          },
        ],
        // "bamaifanli.amount": [
        //   { required: true, message: "请输入霸买未中奖返利", trigger: "blur" }
        // ],
        // "bamaishangjifanli.lvl1zhubo": [
        //   { required: true, message: "请输入霸买上级播商返利", trigger: "blur" }
        // ],
        // "bamaishangjifanli.lvl1gaojihehuoren": [
        //   { required: true, message: "请输入霸买上级播商服务商返利", trigger: "blur" }
        // ],
        // "bamaishangjifanli.lvl2zhubo": [
        //   { required: true, message: "请输入霸买上上级播商返利", trigger: "blur" }
        // ],
        // "bamaishangjifanli.lvl2gaojihehuoren": [
        //   { required: true, message: "请输入霸买上上级播商服务商返利", trigger: "blur" }
        // ],
      },
    };
  },
  beforeMount() {
    this.reuqestInfo();
  },
  methods: {
    uploadHeading(file, fileList) {
      getBase64(file.raw).then((res) => {
        var self = this;
        if (res == "") {
          this.$message({
            message: "您没有选择图片",
            type: "warning",
          });
          return;
        }
        var data = { info: res };
        const basedData = data.info.split(",");
        upload({ info: basedData[1] }).then((res) => {
          if (res.errcode == 0) {
            this.$message({
              message: "上传成功",
              type: "success",
            });
            self.ruleForm["store"].store_headimg = res.src;
            this.$refs.uploadheading.clearFiles();
          } else {
            this.$message({
              message: res.errmsg,
              type: "error",
            });
          }
        });
      });
    },

    uploadBetween(file, fileList) {
      getBase64(file.raw).then((res) => {
        var self = this;
        if (res == "") {
          this.$message({
            message: "您没有选择图片",
            type: "warning",
          });
          return;
        }
        var data = { info: res };
        const basedData = data.info.split(",");
        upload({ info: basedData[1] }).then((res) => {
          if (res.errcode == 0) {
            this.$message({
              message: "上传成功",
              type: "success",
            });
            self.ruleForm["between"].imgurl = res.src;
            this.$refs.uploadheading.clearFiles();
          } else {
            this.$message({
              message: res.errmsg,
              type: "error",
            });
          }
        });
      });
    },
    uploadImg(file, fileList) {
      getBase64(file.raw).then((res) => {
        var self = this;
        if (res == "") {
          this.$message({
            message: "您没有选择图片",
            type: "warning",
          });
          return;
        }
        var data = { info: res };
        const basedData = data.info.split(",");
        upload({ info: basedData[1] }).then((res) => {
          if (res.errcode == 0) {
            this.$message({
              message: "上传成功",
              type: "success",
            });
            self.ruleForm["store"].store_img = res.src;
            this.$refs.uploadImg.clearFiles();
          } else {
            this.$message({
              message: res.errmsg,
              type: "error",
            });
          }
        });
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    /**
     * 保存按钮
     */
    isInteger(obj) {
      console.log(obj);
      console.log(obj % 1 == 0);
      return obj % 1 == 0;
    },
    submitForm(formName) {
      console.log(this.isInteger(this.ruleForm.score.levelup));
      if (!this.isInteger(this.ruleForm.score.levelup)) {
        this.$message.error("升级给的积分只能为整数");
        return;
      }
      if (!this.isInteger(this.ruleForm.score.zhitui)) {
        this.$message.error("直推给的积分只能为整数");
        return;
      }
      if (!this.isInteger(this.ruleForm.score.hehuoren)) {
        this.$message.error("播商服务商或合伙人给的积分只能为整数");
        return;
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getAddDeploy(JSON.stringify(this.ruleForm)).then((res) =>
            res.errcode == 0
              ? this.$message.success("操作成功")
              : this.$message.error(res.errmsg)
          );
        } else {
          this.$message.warning("请将内容填写完整");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    reuqestInfo() {
      getDeploy().then((res) => {
        if (res.errcode == 0) {
          // for (let i in res.data) {for (let k in res.data[i]) res.data[i][k] = res.data[i][k] - 0 }
          this.ruleForm = res.data;
          console.log(this.ruleForm, "配置列表");
        } else this.$message.error(res.errmsg);
      });
    },
  },
};
</script>

<style scoped>
.row-bg {
  padding: 30px;
}

.form_item_label {
  color: "#13ce66";
}

.btop {
  border-top: 1px solid #cccccc;
}
</style>
