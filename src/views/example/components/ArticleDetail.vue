<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" class="form-container">
      <sticky :z-index="10" :class-name="'sub-navbar '+postForm.status">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
          保存
        </el-button>
      </sticky>
      <div class="createPost-main-container">
        <el-form-item style="margin-bottom: 30px;" label="提醒">
          <Tinymce ref="editor" v-model="postForm.content" :height="400" />
        </el-form-item>
        <el-form-item style="margin-bottom: 30px;" label="广告图片">
          <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :auto-upload="false"
                :on-change="getFile1"
                >
                <img v-if="guanggaoimg" :src="guanggaoimg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </el-form-item>

        <el-form-item style="margin-bottom: 30px;" label="关注二维码">
        <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :auto-upload="false"
                :on-change="getFile2"
                >
                <img v-if="guanzhuimg" :src="guanzhuimg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Sticky from '@/components/Sticky' // 粘性header组件
import Warning from './Warning'
import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './Dropdown'
import { getBase64, upload } from '@/api/upload'
import { getConfig, saveConfig } from '@/api/config'

const defaultForm = {
  status: 'draft',
  content: '', // 文章内容
  guanzhuimg: '', //
  guanggaoimg: '', //

}
export default {
  name: 'ArticleDetail',
  components: { Tinymce, Sticky, Warning, CommentDropdown, PlatformDropdown, SourceUrlDropdown },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      guanzhuimg:'',
      guanggaoimg:'',
    }
  },

  created() {
    this.getConfig()
  },

  methods: {
    getConfig(){
       getConfig().then(response => {
        console.log(response);
        this.postForm = response.data.param
        this.guanzhuimg = response.data.param.guanzhuimg
        this.guanggaoimg = response.data.param.guanggaoimg
       })
    },
    getFile1(file, fileList) {
      getBase64(file.raw).then(res => {
          var self = this;
            if (res == "") {
                this.$message({
                    message: "您没有选择图片",
                    type: "warning"
                });
                return;
            }
            var data = { info : res };
            upload(data).then(res => {
                console.log(res);
            if (res.errcode == 0) {
                this.$message({
                    message: '上传成功',
                    type: "success"
                });
                self.guanggaoimg = res.src;
                self.postForm.guanggaoimg = res.src;
            } else {
                this.$message({
                    message: res.errmsg,
                    type: "error"
                });
            }
            })    
      });
    },

    getFile2(file, fileList) {
      getBase64(file.raw).then(res => {
          var self = this;
            if (res == "") {
                this.$message({
                    message: "您没有选择图片",
                    type: "warning"
                });
                return;
            }
            var data = { info : res };
            upload(data).then(res => {
                console.log(res);
            if (res.errcode == 0) {
                this.$message({
                    message: '上传成功',
                    type: "success"
                });
                self.guanzhuimg = res.src;
                self.postForm.guanzhuimg = res.src;
            } else {
                this.$message({
                    message: res.errmsg,
                    type: "error"
                });
            }
            })    
      });
    },

    submitForm() {
        saveConfig('param', JSON.stringify(this.postForm)).then(() => {
        this.$notify({
            title: '成功',
            message: '保存成功',
            type: 'success',
            duration: 2000
        })
        var self = this;
        setTimeout(() => {
          self.getConfig()
        }, 2 * 1000)
        })
    },
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea /deep/ {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
