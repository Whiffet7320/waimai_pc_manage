<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddRole">
      添加轮播图
    </el-button>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column prop="id" label="ID" align="center"> </el-table-column>
      <el-table-column label="图片" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.img"
            :preview-src-list="[scope.row.img]"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" align="center">
      </el-table-column>
      <el-table-column label="添加时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createtime | formatConversion }}
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="操作"
        width="300"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="row">
          <el-button type="primary" size="small" @click="handleEdit(row)">
            编辑
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      @close="close"
      :visible.sync="dialogVisible"
      :title="dialogType === 'edit' ? '编辑分类' : '添加分类'"
    >
      <el-form label-width="80px" label-position="left">
        <el-form-item label="图片">
          <el-upload
            ref="avatar-uploader"
            class="avatar-uploader"
            action
            :show-file-list="false"
            :auto-upload="false"
            :on-change="file => handleImgSuccess(file)"
          >
            <el-image
              style="width: 100px; height: 100px"
              :src="temp.url"
              v-if="temp.url"
            >
            </el-image>

            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="排序">
          <el-input
            v-model="classSort"
            placeholder="仅能输入数字"
            type="number"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" :loading="isButFlag" @click="confirmAdmin">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getbanner, delbanner, addbanner, editbanner } from "@/api/set";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { getBase64, upload } from "@/api/upload";
import DonMessage from "@/utils/message";
import { uploadimgtooss } from "@/utils/uploadoss.js";

export default {
  name: "ComplexTable",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      isButFlag: false,
      typeList: [
        { id: "1", name: "平台分类" },
        { id: "2", name: "供货商分类" }
      ],
      typeId: "",
      // admin: Object.assign({}, defaultAdmin),
      dialogVisible: false,
      imgdialogVisible: false,
      dialogType: "new",
      hidden: false,
      classSort: "",
      tableKey: 0,
      list: null,
      img: "",
      id: "",
      isHidden: 0,
      listLoading: false,
      showReviewer: false,
      temp: {
        id: undefined,
        uid: 0,
        url: "",
        sort: 0
      }
    };
  },
  created() {
    this.getManageList();
  },
  methods: {
    close() {
      this.img = "";
      this.classSort = "";
      this.temp.url = "";
      this.isHidden = 0;
      this.typeId = "";
    },
    //上传图片
    handleImgSuccess(file, type) {
      uploadimgtooss(file).then(res => {
        console.log(res);
        this.temp.url = res;
      });
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //编辑
    handleEdit(row) {
      console.log(row.row, "编辑");
      this.dialogType = "edit";
      this.dialogVisible = true;
      this.classSort = row.row.sort;
      this.temp.url = row.row.img;
      this.id = row.row.id;
      this.admin = Object.assign({}, row.row);
    },
    //删除
    handleDelete(row) {
      var self = this;
      this.$confirm("您确定删除么?", "警告！", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          delbanner({ id: row.row.id }).then(res => {
            console.log(res);
            if (res.errcode == 0) {
              DonMessage.success("删除成功");
              this.dialogVisible = false;
              this.getManageList();
            } else {
              DonMessage.error("删除失败");
              this.dialogVisible = false;
              this.getManageList();
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    //添加
    handleAddRole() {
      // this.admin = Object.assign({}, defaultAdmin);
      this.dialogType = "new";
      this.temp.url = "";
      this.dialogVisible = true;
    },
    async confirmAdmin() {
      if (this.temp.url == "") {
        DonMessage.warning("请上传图片");
        return;
      }
      if (this.classSort == "") {
        DonMessage.warning("请输入排序");
        return;
      }
      var that = this;
      if (!this.isButFlag) {
        this.isButFlag = true;

        const isEdit = this.dialogType === "edit";
        if (isEdit) {
          const bj = {
            img: this.temp.url,
            sort: this.classSort,
            id: this.id
          };

          editbanner(bj).then(res => {
            if (res.errcode == 0) {
              DonMessage.success("编辑成功");
              this.dialogVisible = false;
              this.isButFlag = false;
              this.getManageList();
            } else {
              DonMessage.error(res.errmsg || "请求失败");
              that.isButFlag = false;
            }
          });
        } else {
          console.log("tj");

          if (this.hidden == true) {
            this.isHidden = 1;
          } else {
            this.isHidden = 0;
          }
          const tj = {
            img: this.temp.url,
            sort: this.classSort
          };
          addbanner(tj).then(res => {
            console.log(res, "添加返回");
            if (res.errcode == 0) {
              DonMessage.success("添加成功");
              this.dialogVisible = false;
              this.isButFlag = false;
              this.getManageList();
            } else {
              DonMessage.success(res.errmsg || "请求失败");
              this.isButFlag = false;
            }
          });
        }
      }
    },
    getManageList() {
      this.listLoading = true;
      getbanner(this.listQuery).then(response => {
        console.log(response, "分类列表");
        if (response.errcode == 0) {
          this.list = response.list;
          this.listLoading = false;
        } else {
          DonMessage.success(res.errmsg || "请求失败");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-table--group,
.el-table--border {
  margin-top: 30px;
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
