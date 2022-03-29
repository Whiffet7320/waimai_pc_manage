<template>
    <div>
        
        <!--富文本编辑器组件-->
        <el-row v-loading="quillUpdateImg">
            <quill-editor
                    v-model="content"
                    ref="myQuillEditor"
                    style="width: 100%;height: 400px;"
                    :options="editorOption"
                    @change="onEditorChange($event)"
                    @ready="onEditorReady($event)"
            >
            </quill-editor>
        </el-row>
        <!-- 图片上传组件辅助-->
        <el-upload
                id="quill-upload"
                class="avatar-uploader"
                action
                name="img"
                :auto-upload="false"
                :show-file-list="false"
                :on-error="uploadError"
                :on-change="upload"
                >
        </el-upload>
    </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { Quill, quillEditor } from "vue-quill-editor";
import {getFileNameUUID, put } from "@/utils/alioss";
const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{'header': 1}, {'header': 2}],               // custom button values
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
        [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
        [{'direction': 'rtl'}],                         // text direction

        [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
        [{'header': [1, 2, 3, 4, 5, 6, false]}],

        [{'color': []}, {'background': []}],          // dropdown with defaults from theme
        [{'font': []}],
        [{'align': []}],
        ['link', 'image', 'video'],
        ['clean']                                         // remove formatting button
    ]

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
      quillUpdateImg: false,
      show: false,
      editorOption: {
        placeholder: "请输入",
        theme: "snow",
        modules: {
          toolbar: {
              container: toolbarOptions,  // 工具栏
              handlers: {
                  'image': function (value) {
                      if (value) {
                          document.querySelector('#quill-upload input').click()
                      } else {
                          this.quill.format('image', false);
                      }
                  }
              }
          }
        }
      }
    };
  },
  methods:{
    onEditorChange (e) {
      this.$emit('change', e)
    },
    onEditorReady() {
    },
    // 上传图片前
    beforeUpload(res, file) {
      this.quillUpdateImg = true
    },
    upload(file) {
      let quill = this.$refs.myQuillEditor.quill
      var filePath = file.name;
      //获取最后一个.的位置
      var index= filePath.lastIndexOf(".");
      //获取后缀
      var ext = filePath.substr(index + 1);
      //输出结果
      var filename = getFileNameUUID() + '.' + ext;
      put(filename, file.raw).then(res => {
        if (res.res.statusCode == 200) {
          var imgurl = "http://image.duduyijiang.com/" + filename;
          const img = "<img src='" + imgurl + "'/>"
          quill.insertEmbed(length, 'image', imgurl)
        }
        this.quillUpdateImg = false
      });
    },
  // 上传图片失败
  uploadError(res, file) {
      // loading动画消失
      this.quillUpdateImg = false
      this.$message.error('图片插入失败')
  }
  }
}
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
.ql-container{
  height: 400px;
}
</style>
