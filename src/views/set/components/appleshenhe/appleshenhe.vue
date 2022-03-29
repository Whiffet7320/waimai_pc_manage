<template>
  <div class="app-container">
    <div class="input-flex">
      <div class="left">审核开关：</div>
      <el-radio v-model="shenhe.enable" :label="0">关闭</el-radio>
      <el-radio v-model="shenhe.enable" :label="1">开启</el-radio>
    </div>

    <div style="height: 50px"></div>
    <el-button type="primary" @click="onSubmit">确定</el-button>
  </div>
</template>

<script>
import { editMoban } from "@/api/set";

export default {
  props: {
    data: {
      type: Object, // 属性类型
      default: {} // 默认值
    },
    dataObj: {
      type: Object, // 属性类型
      default: {} // 默认值
    }
  },
  data() {
    return {
      key: "shenhe",
      alldata: {},
      shenhe: {
        enable: 0
      },
    };
  },
  mounted() {
    this.alldata = this.data;
    console.log(this.dataObj);
    this.shenhe = this.dataObj;
  },
  methods: {
    onSubmit() {
      var data = {};
      data[this.key] = {};
      data[this.key] = this.shenhe;
      editMoban(JSON.stringify(data)).then(res => {
        if (res.errcode == 0) {
          this.$message.success("保存成功");
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
</script>
<style lang="scss" scoped>
.input-flex {
  display: flex;
  align-items: center;
  height: 50px;
  line-height: 50px;
  .left {
    width: 120px;
  }
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border-radius: 5px;
  border: 1px dashed #8c939d;
}
</style>
