<template>
  <quill-editor
    v-model="content"
    :ref="refkey"
    style="width: 100%;height: 100%;"
    :options="editorOption"
    @change="onEditorChange($event)"
    v-if="show"
  >
    <div :id="toolbarkey" slot="toolbar">
      <button class="ql-bold" title="加粗">Bold</button>
      <button class="ql-italic" title="斜体">Italic</button>
      <button class="ql-underline" title="下划线">underline</button>
      <button class="ql-strike" title="删除线">strike</button>
      <button class="ql-blockquote" title="引用"></button>
      <button class="ql-code-block" title="代码"></button>
      <button class="ql-header" value="1" title="标题1"></button>
      <button class="ql-header" value="2" title="标题2"></button>
      <button class="ql-list" value="ordered" title="有序列表"></button>
      <button class="ql-list" value="bullet" title="无序列表"></button>
      <select class="ql-header" title="段落格式">
        <option selected>段落</option>
        <option value="1">标题1</option>
        <option value="2">标题2</option>
        <option value="3">标题3</option>
        <option value="4">标题4</option>
        <option value="5">标题5</option>
        <option value="6">标题6</option>
      </select>
      <select class="ql-size" title="字体大小">
        <option value="10px">10px</option>
        <option value="12px">12px</option>
        <option value="14px">14px</option>
        <option value="16px" selected>16px</option>
        <option value="18px">18px</option>
        <option value="20px">20px</option>
      </select>
      <select class="ql-font" title="字体">
        <option value="SimSun">宋体</option>
        <option value="SimHei">黑体</option>
        <option value="Microsoft-YaHei">微软雅黑</option>
        <option value="KaiTi">楷体</option>
        <option value="FangSong">仿宋</option>
        <option value="Arial">Arial</option>
      </select>
      <select class="ql-color" value="color" title="字体颜色"></select>
      <select class="ql-background" value="background" title="背景颜色"></select>
      <select class="ql-align" value="align" title="对齐"></select>
      <button class="ql-image"></button>
      <button class="ql-clean" title="还原"></button>
    </div>
  </quill-editor>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { Quill, quillEditor } from "vue-quill-editor";
let Size = Quill.import("attributors/style/size");
Size.whitelist = ["10px", "12px", "14px", "16px", "18px", "20px"];
Quill.register(Size, true);

// 自定义字体类型
var fonts = [
  "SimSun",
  "SimHei",
  "Microsoft-YaHei",
  "KaiTi",
  "FangSong",
  "Arial",
  "Times-New-Roman",
  "sans-serif",
  "宋体",
  "黑体"
];
var Font = Quill.import("formats/font");
Font.whitelist = fonts;
Quill.register(Font, true);
export default {
  props: {
    contents: {
      type: String,
      default: ''
    }
  },
  components: {
    quillEditor
  },
  watch: {
    contents (newvalue) {
      this.content = newvalue
    }
  },
  name: "FuncFormsEdit",
  data() {
    return {
      content: '',
      refkey: '',
      toolbarkey: '',
      show: false,
      editorOption: {
        placeholder: "请输入",
        theme: "snow",
        modules: {
          toolbar: {
            container: ""
          }
        }
      }
    };
  },
  mounted () {
    this.refkey = this.random(4,4)
    this.content = this.$props.contents || ''
    this.toolbarkey = 'toolbar' + this.random(4,4)
    this.editorOption.modules.toolbar.container = '#' + this.toolbarkey
    console.log(this.editorOption, this.toolbarkey)
    this.show = true
  },
  methods: {
    onEditorChange (e) {
      this.$emit('change', e)
    },
    random(quantity, amount) {
      let chars = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ];
      let arr = [];
      for (let k = 0; k < amount; k++) {
        let str = "";
        for (let i = 0; i < quantity; i++) {
          let id = Math.ceil(Math.random() * 35);
          str += chars[id];
        }
        arr.push(str);
      }
      return arr.join("-");
    }
  }
};
</script>

<style scoped>
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="SimSun"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="SimSun"]::before {
  content: "宋体";
  font-family: "SimSun";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="SimHei"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="SimHei"]::before {
  content: "黑体";
  font-family: "SimHei";
}

.ql-snow
  .ql-picker.ql-font
  .ql-picker-label[data-value="Microsoft-YaHei"]::before,
.ql-snow
  .ql-picker.ql-font
  .ql-picker-item[data-value="Microsoft-YaHei"]::before {
  content: "微软雅黑";
  font-family: "Microsoft YaHei";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="KaiTi"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="KaiTi"]::before {
  content: "楷体";
  font-family: "KaiTi";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="FangSong"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="FangSong"]::before {
  content: "仿宋";
  font-family: "FangSong";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="Arial"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="Arial"]::before {
  content: "Arial";
  font-family: "Arial";
}

.ql-snow
  .ql-picker.ql-font
  .ql-picker-label[data-value="Times-New-Roman"]::before,
.ql-snow
  .ql-picker.ql-font
  .ql-picker-item[data-value="Times-New-Roman"]::before {
  content: "Times New Roman";
  font-family: "Times New Roman";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="sans-serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="sans-serif"]::before {
  content: "sans-serif";
  font-family: "sans-serif";
}

.ql-font-SimSun {
  font-family: "SimSun";
}

.ql-font-SimHei {
  font-family: "SimHei";
}

.ql-font-Microsoft-YaHei {
  font-family: "Microsoft YaHei";
}

.ql-font-KaiTi {
  font-family: "KaiTi";
}

.ql-font-FangSong {
  font-family: "FangSong";
}

.ql-font-Arial {
  font-family: "Arial";
}

.ql-font-Times-New-Roman {
  font-family: "Times New Roman";
}

.ql-font-sans-serif {
  font-family: "sans-serif";
}
</style>
