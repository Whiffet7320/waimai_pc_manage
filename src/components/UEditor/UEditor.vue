<template>
  <div id="ueditor">
    <vue-ueditor-wrap
      v-model="datacontent"
      :config="myConfig"
      @ready="onEditorReady($event)"
    ></vue-ueditor-wrap>
  </div>
</template>

<script>
import VueUeditorWrap from "vue-ueditor-wrap";

export default {
  props: {
    contents: {
      type: String,
      default: "",
    },
    height: {
      type: Number,
      default: 200,
    },
  },
  components: {
    VueUeditorWrap,
  },
  watch: {
    datacontent(newValue, oldValue) {
      this.$emit("change", newValue);
    },
    immediate: true,
    contents(newValue, oldValue) {
      this.datacontent = newValue;
    },
  },
  name: "UEditor",
  data() {
    return {
      datacontent: "",
      myConfig: {
        autoHeightEnabled: false,
        initialFrameHeight: 0,
        initialFrameWidth: "100%",
        UEDITOR_HOME_URL: "/UEditor/",
        serverUrl:
          process.env.VUE_APP_API_BASE +
          "/server/img/uploadtoken?type=image&suffix=jpg",
        // serverUrl: "http://35.201.165.105:8000/controller.php?type=img",
        enableAutoSave: true, // 开启从草稿箱恢复功能需要手动设置固定的 editorId，否则组件会默认随机一个，如果页面刷新，下次渲染的时候 editorId 会重新随机，导致无法加载草稿箱数据
      },
    };
  },
  created() {
    this.myConfig.initialFrameHeight = this.height;
  },
  mounted() {
    console.log("ueditor,,,mouted");
  },
  methods: {
    onEditorReady(editorInstance) {
      console.log(`编辑器实例${editorInstance.key}: `, editorInstance);
      // this.content = this.contents;
    },
    onEditorChange(e) {
      console.log("change----->>>", e);
      this.$emit("change", e);
    },
  },
};
</script>

<style>
.edui-default .edui-toolbar .edui-button,
.edui-default .edui-toolbar .edui-splitbutton,
.edui-default .edui-toolbar .edui-menubutton,
.edui-default .edui-toolbar .edui-combox {
  line-height: initial !important;
}
#ueditor .el-form-item__content {
  line-height: initial !important;
}
</style>
