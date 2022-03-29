<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddRole">
      添加管理员
    </el-button>

    <el-table :data="adminList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="ID" width="220">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户名" width="220">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="最后登录IP">
        <template slot-scope="scope">
          {{ scope.row.last_login_ip }}
        </template>
      </el-table-column>
       <el-table-column align="center" label="登录状态">
        <template slot-scope="scope">
             <el-button
            v-if="scope.row.status == 1"
            type="success"
            size="small"
            @click="handleModifyStatus(scope.row)"
          >
            正常
          </el-button>
          <el-button
            v-if="scope.row.status == 0"      
            size="small"
            @click="handleModifyStatus(scope.row)"
          >
            禁用
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="280" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">
            编辑管理员
          </el-button>
          <el-button
            v-if="scope.row.id != 1"
            type="danger"
            size="small"
            @click="handleDelete(scope)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :visible.sync="dialogVisible"
      @close="close"
      :title="dialogType === 'edit' ? '编辑管理员' : '添加管理员'"
    >
      <el-form :model="admin" label-width="80px" label-position="left">
        <el-form-item label="用户名">
          <el-input v-model="username" placeholder="用户名" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="password" placeholder="密码" />
        </el-form-item>
        <el-form-item label="权限">
          <el-radio-group v-model="roleId">
            <el-radio
              v-for="item in rolesList"
              :key="item.id"
              :label="item.id"
              >{{ item.desc }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible = false">
          {{ $t("permission.cancel") }}
        </el-button>
        <el-button type="primary" @click="confirmAdmin">
          {{ $t("permission.confirm") }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from "path";
import { deepClone } from "@/utils";
import {
  getRoutes,
  getRoles,
  addRole,
  deleteRole,
  updateRole
} from "@/api/role";
import { getList, deleteAdmin, updateAdmin, addAdmin ,getStatus} from "@/api/user";
import i18n from "@/lang";

const defaultAdmin = {
  id: "",
  username: "",
  password: "",
  roles: ""
};

export default {
  data() {
    return {
      admin: Object.assign({}, defaultAdmin),
      adminList: [],
      rolesList: [],
      dialogVisible: false,
      dialogType: "new",
      checkStrictly: false,
      defaultProps: {
        children: "children",
        label: "title"
      },
      roleId: "",
      username: "",
      password: "",     
    };
  
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getList();
    this.getRoles();
  },
  methods: {

     handleModifyStatus(row) {
      const update_id = row.id
      const status = row.status
      const xg = {update_id,status}
      
      getStatus(xg).then(res=> {
        if(res.errcode == 0) {
           this.getList();
           this.$message({
              type: 'success',
              message: '操作成功'
          })

        } else {
             this.$message({
              type: 'error',
              message: '操作失败'
          })
        }
      })
           
    },
    async getList() {
      const res = await getList();
      this.adminList = res.data;
    },
    async getRoles() {
      const res = await getRoles();
      this.rolesList = res.data;
    },
    close() {
      this.username = '';
      this.roleId = '';
      this.password = ''
    },
    handleAddRole() {
      this.admin = Object.assign({}, defaultAdmin);
      this.dialogType = "new";
      this.dialogVisible = true;
      this.username = '';
      this.roleId = ''
    },
    handleEdit(scope) {
      this.dialogType = "edit";
      this.dialogVisible = true;
      this.admin = Object.assign({}, scope.row);
      this.admin.password = "";     

      this.username = this.admin.username;
      this.roleId = this.admin.roles_id
    },

    async confirmAdmin() {
      const isEdit = this.dialogType === "edit";
      if (isEdit) {
        
         if(this.password == '') {

         } else if (this.password.length <6){
            this.$message({
              message: "密码长度不能少于6位",
              type: "warning"
            });
          return;
         } else {

         }

        const bj = {
          id:this.admin.id,
          roles:this.admin.roles,
          username:this.username,
          password:this.password,
          roles_id:this.roleId}
      
        var res = await updateAdmin(bj)
        // console.log(res);
        if(res.errcode == 0){
          this.getList();
          this.$message({
              type: 'success',
              message: '编辑成功'
          })
          this.dialogVisible = false;
           
        }else{
          this.$message({
              type: 'error',
              message: '编辑失败'
          })
        }
      } else {
        if (this.username == "") {
          this.$message({
            message: "请输入用户名",
            type: "warning"
          });
          return;
        }

        if (this.password == "") {
          this.$message({
            message: "请输入密码",
            type: "warning"
          });
          return;
        }
        
        if(this.password.length < 6) {
           this.$message({
            message: "密码长度不能少于6位",
            type: "warning"
          });
          return;
         }

        if (this.roleId == "") {
          this.$message({
            message: "请选择权限",
            type: "warning"
          });
          return;
        }

        const { username, password, roleId: roles_id, rolesList } = this;
        let roles = "";
        
        for (let i = 0; i < rolesList.length; i++) {
          if (rolesList[i].id === roles_id) {
            roles = rolesList[i].roles;
            break;
          }
        }
        const qx = { roles_id, roles, username, password };
      
        var res = await addAdmin(qx);
        if (res.errcode == 0) {
          this.$message({
            type: "success",
            message: "添加成功"
          });
          this.dialogVisible = false;
        } else {
          this.$message({
            type: "error",
            message: "添加失败"
          });
        }
      }
      var self = this;
      setTimeout(function() {
        self.dialogVisible = false;
        self.getList();
        self.getRoles();
      }, 1000);
    },
    
    handleDelete({ $index, row }) {
      this.$confirm("确认删除该管理么?", "Warning", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
         
          await deleteAdmin({ id: row.id });
          this.rolesList.splice($index, 1);
          this.$message({
            type: "success",
            message: "删除成功"
          });
          var self = this;
          setTimeout(function() {
            self.dialogVisible = false;
            self.getList();
            self.getRoles();
          }, 1000);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>

.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
