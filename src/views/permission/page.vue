<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddRole">
      {{ $t('permission.addRoles') }}
    </el-button>

    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="ID" width="220">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="分组名称" width="220">
        <template slot-scope="scope">
          {{ scope.row.roles }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="权限描述">
        <template slot-scope="scope">
          {{ scope.row.desc }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)" v-if="scope.row.id != 1">
            {{ $t('permission.editRoles') }}
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)" v-if="scope.row.id != 1">
            {{ $t('permission.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑分组':'添加分组'">
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="分组名称">
          <el-input v-model="role.roles" placeholder="分组名称" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input
            v-model="role.desc"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="请输入权限描述"
          />
        </el-form-item>
        <el-form-item label="系统菜单">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="routesData"
            :props="defaultProps"
            show-checkbox
            node-key="id"
            class="permission-tree"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">
          {{ $t('permission.cancel') }}
        </el-button>
        <el-button type="primary" @click="confirmRole">
          {{ $t('permission.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from 'path'
import { deepClone } from '@/utils'
import { getRoles, addRole, updateRole, deleteRole } from '@/api/role'
import i18n from '@/lang'
import { Message } from 'element-ui'
import { getAllMenu } from '@/api/menu'
import store from '@/store'

const defaultRole = {
  id: '',
  roles: '',
  desc: ''
}
export default {
  data() {
    return {
      role: Object.assign({}, defaultRole),
      routes: [],
      rolesList: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      checked:[],
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    this.getRoles()
    this.getMenu()
  },
  methods: {
    async getRoles() {
      const res = await getRoles()
      console.log(res,'权限列表');
      this.rolesList = res.data
    },
    async getMenu() {
      const result = await getAllMenu()
      this.routes = this.generateRoutes(result.menu)
    },
    i18n(routes) {
      const app = routes.map(route => {
        if (/^[\u4e00-\u9fa5]+$/.test(route.meta.title)) {
            route.title = route.meta.title
          } else {
            route.title = i18n.t(`route.${route.meta.title}`)
          }
        //route.title = i18n.t(`route.${route.title}`)
        if (route.children) {
          route.children = this.i18n(route.children)
        }
        return route
      })
      return app
    },
    // Reshape the routes structure so that it looks the same as the sidebar
    generateRoutes(routes, basePath = '/') {
      const res = []

      for (let route of routes) {
        // skip some route
        if (route.hidden) { continue }

        const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)

        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild
        }

        const data = {
          id: route.id,
          path: path.resolve(basePath, route.path),
          title: route.meta && route.meta.title

        }

        // recursive child routes
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path)
        }
        res.push(data)
      }
      return res
    },
    generateArr(routes) {
      let data = []
      routes.forEach(route => {
        data.push(route)
        if (route.children) {
          const temp = this.generateArr(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    },
    handleAddRole() {
      this.role = Object.assign({}, defaultRole)
      console.log('add.....');
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      console.log("edit")
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.role.id = scope.row.id
      this.role.roles = scope.row.roles
      this.role.desc = scope.row.desc
      var checked = scope.row.routes.split(",");
      var arr = [];
      for(var i = 0; i < checked.length; i ++)
      {
          arr.push({id:checked[i]})
      } 
      this.$nextTick(() => {
        this.$refs.tree.setCheckedNodes(arr)
        this.checkStrictly = false
      })
    },
    handleDelete({ $index, row }) {
      console.log($index);
      console.log(row);
      this.$confirm('您确定删除分组么?', '警告！', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteRole(row.id)
          this.rolesList.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(err => { 

        })
    },
    generateTree(routes, basePath = '/', checkedKeys) {
      const res = []

      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path)

        // recursive child routes
        if (route.children) {
          route.children = this.generateTree(route.children, routePath, checkedKeys)
        }

        if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
          res.push(route)
        }
      }
      return res
    },
    async confirmRole() {
      const routes = this.$refs.tree.getCheckedNodes();

      const parentroutes = this.$refs.tree.getHalfCheckedNodes();

      var arr = [];
      for(var i = 0; i < routes.length; i ++)
      {
          arr.push(routes[i]['id'])
      } 
      for(var i = 0; i < parentroutes.length; i ++)
      {
          arr.push(parentroutes[i]['id'])
      } 
      const isEdit = this.dialogType === 'edit'
      var data = this.role;
      data.routes = arr;
      console.log("this is arr",arr);
      if (isEdit) {

        const res = await updateRole(data)
        if(res.errcode == 0){
          this.$message({
              type: 'success',
              message: '编辑成功'
          })
          this.dialogVisible = false;
           this.getRoles();

        }else{
          this.$message({
              type: 'error',
              message: '编辑失败'
          })
        }
      } else {

        if(data.roles == '') {
           this.$message({
          message: '请输入分组名称',
          type: 'warning'
        });
          return
        }

        if(data.desc == '') {
           this.$message({
          message: '请输入权限描述',
          type: 'warning'
        });
          return
        }

        if(data.routes.length == 0) {
           this.$message({
            message: '请选择系统菜单',
            type: 'warning'
          });
            return
        }
     
        addRole(data).then(res=>{
           console.log(res,'???')
           if(res.errcode == 0) {
              Message({
                type: 'success',
                message: '添加成功'
              })
              //弹窗隐藏
              this.dialogVisible = false;
              //重新调用权限列表
              this.getRoles();
           } else {
              this.$essage({
              type: 'error',
              message: res.errmsg
          })
           }
         })
        
      }
      // this.dialogVisible = false
      // var self = this;
      // setTimeout(function(){
      //   self.dialogVisible = false
      //   location.reload()
      // },3000)
    },
    // reference: src/view/layout/components/Sidebar/SidebarItem.vue
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden)

      // When there is only one child route, the child route is displayed by default
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
        return onlyOneChild
      }

      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return onlyOneChild
      }

      return false
    }
  }
}
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
