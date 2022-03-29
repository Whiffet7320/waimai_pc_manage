<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddRole">
      添加分类
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
      <el-table-column prop="name" label="分类名称" align="center">
      </el-table-column>
      <el-table-column prop="sort" label="排序" align="center">
      </el-table-column>
      <el-table-column prop="createtime" label="添加时间" align="center">
      </el-table-column>

      <el-table-column
        align="center"
        label="操作"
        width="300"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="row">
          <el-button type="primary" size="small" @click="handleEdit(row)">
            编辑分类
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
        <el-form-item label="分类名称">
          <el-input v-model="className" placeholder="分类名称" />
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
import { getManageList, deleteClass, addClass, editClass } from "@/api/store";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { getBase64, upload } from "@/api/upload";
import { getConfig, saveConfig } from "@/api/config";
import DonMessage from "@/utils/message";

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
      className: "",
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
        title: "",
        url: "",
        ctime: 0
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
      this.className = "";
      this.isHidden = 0;
      this.typeId = "";
    },
    //上传图片
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
        var data = { info: res };
        const basedData = data.info.split(",");
        upload({ info: basedData[1] }).then(res => {
          console.log(res);
          if (res.errcode == 0) {
            DonMessage.success("上传成功");
            self.img = res.src;
            this.$refs.upload.clearFiles();
          } else {
            DonMessage.error(res.errmsg || "上传失败");
          }
        });
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
      this.className = row.row.name;
      this.id = row.row.id;
      this.typeId = row.row.type;
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
          deleteClass({ id: row.row.id }).then(res => {
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
    //进入二级分类
    joinSecond(row) {
      this.$router.push({
        path: "./secondClassPage",
        query: {
          id: row.row.id,
          typeId: row.row.type
        }
      });
    },
    //添加分类
    handleAddRole() {
      console.log("add....");
      // this.admin = Object.assign({}, defaultAdmin);
      this.dialogType = "new";
      this.dialogVisible = true;
    },
    async confirmAdmin() {
      if (this.className == "") {
        DonMessage.warning("请输入分类名称");
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
            name: this.className,
            sort: this.classSort,
            id: this.id,
          };

          editClass(bj).then(res => {
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
            name: this.className,
            sort: this.classSort,
          };
          addClass(tj).then(res => {
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
      getManageList(this.listQuery).then(response => {
        console.log(response, "分类列表");
        if (response.errcode == 0) {
          this.list = response.data;
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
</style>
