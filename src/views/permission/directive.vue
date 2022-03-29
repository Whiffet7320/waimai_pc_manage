<template>
<div class="app-container">
    <el-button type="primary" @click="addMenu()">
      添加菜单
    </el-button>
     <div style="margin-top:20px">
       <el-tree
      :data="data"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ data }">
        <span>{{ data.name }}</span>
        <div class="block">
          <el-button
            type="success"             
            size="small"
            @click="() => append(data)">
            添加菜单
          </el-button>
          <el-button
            type="primary"            
            size="small"
            @click="() => edit(data)">
            编辑菜单
          </el-button>
          <el-button
            type="danger" 
            icon="el-icon-delete" 
            size="small"
            @click="() => remove(data)">
          </el-button>
        </div>
      </span>
    </el-tree>
     </div>
    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑菜单':'添加菜单'">
      <el-form :model="menu" ref="menu" label-width="100px" class="demo-ruleForm">
        <el-form-item label="上级菜单" prop="pid">
          <el-select v-model="menu.pid" placeholder="请选择">
            <el-option v-for="item in routes" :label="item.name" :key="item.id" :value="item.id" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="menu.name"></el-input>
        </el-form-item>
        <el-form-item label="路径" prop="path">
          <el-input v-model="menu.path"></el-input>
        </el-form-item>
        <el-form-item label="面包屑设置" prop="redirect">
          <el-input v-model="menu.redirect"></el-input>
        </el-form-item>
        <el-form-item label="组件设置" prop="component">
          <el-input v-model="menu.component"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="name">
          <el-input v-model.number="menu.sort"></el-input>
        </el-form-item>
        <el-form-item label="是否隐藏" prop="hidden">
          <el-switch v-model="menu.hidden"></el-switch>
        </el-form-item>
        <el-form-item label="跟路由显示" prop="alwaysShow">
          <el-switch v-model="menu.alwaysShow"></el-switch>
        </el-form-item>
        <el-form-item label="不缓存" prop="noCache">
          <el-switch v-model="menu.meta.noCache"></el-switch>
        </el-form-item>
        <el-form-item label="菜单标题" prop="meta.title">
          <el-input v-model="menu.meta.title"></el-input>
        </el-form-item>
        <el-form-item label="icon" prop="meta.icon">
          <el-input v-model="menu.meta.icon"></el-input>
        </el-form-item>
        <!-- <el-form-item label="权限分组" prop="roles">
          <el-checkbox-group v-model="menu.meta.roles" >
            <el-checkbox v-for="item in roles" :label="item.roles" :key="item.roles">{{ item.desc }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item> -->

        <el-form-item>
          <el-button type="primary" @click="confirm(menu)">保存</el-button>
          <el-button @click="cancel()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
</div>
    
</template>
 
<script>
import { getAllMenu, addMenu, editMenu, deleteMenu, getRoutes } from '@/api/menu'
import { getRoles } from '@/api/role'
import { Message } from 'element-ui'
import i18n from '@/lang'
  let id = 1000;
  export default {
    data() {
      return {
        data: [],
        routes:[],
        dialogType: 'add',
        menu : {
          id: '',
          name: '',
          pid: '',
          redirect: '',
          component: '',
          hidden: false,
          alwaysShow:false,
          meta: {
            title:'',
            icon:'',
            roles:[],
            noCache:true
          },
        },
        hidden:'',
        alwaysShow:'',
        dialogVisible:false,
        roles:[],
      }
    },
    created() {
     this.getMenu()
     this.getRoutes()
     //this.getRoles()
    },

    methods: {
       //取消
      cancel() {
       this.dialogVisible = false;
      },
      async getMenu() {
        const res = await getAllMenu()
        this.data = (JSON.parse(JSON.stringify(res.menu)))
        
        console.log(this.data,'?!@')
      },
     
    i18n(routes) {
    const app = routes.map(route => {
    if (/^[\u4e00-\u9fa5]+$/.test(route.meta.title)) {
      route.name = route.meta.title
    } else {
      route.name = i18n.t(`route.${route.meta.title}`)
    }
      if (route.children) {
        route.children = this.i18n(route.children)
      }
      return route
    })
    return app
  },

    async getRoles() {
        const res = await getRoles()
        this.roles = JSON.parse(JSON.stringify(res.data))
    
    },

    async getRoutes() {
        const res = await getRoutes()
        this.routes = (JSON.parse(JSON.stringify(res.data)))
        console.log(this.routes,'路由')
    },
    append(data) {
      console.log(data);
      var self = this;
      self.menu = {
        name: '',
        pid: '',
        redirect: '',
        component: '',
        hidden: false,
        alwaysShow:false,
        sort:'',
        meta: {
          title:'',
          icon:'',
          roles:[],
          noCache:true
        },
      }
      this.menu.pid = data.id
      this.dialogType = 'new'
      this.dialogVisible = true
    },

    addMenu(){
      var self = this;
      self.menu = {
        name: '',
        pid: '',
        path: '',
        redirect: '',
        component: '',
        hidden: false,
        alwaysShow:false,
        sort:'',
        meta: {
          title:'',
          icon:'',
          roles:[],
          noCache:true
        },
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },

    edit(data){
      console.log(data,'编辑????');
      this.menu = Object.assign({}, data)
      this.menu.meta.noCache = this.menu.meta.noCache == 'true' ? true : false;
      this.dialogType = 'edit'
      this.dialogVisible = true
    },
    async confirm(e) {
    const isEdit = this.dialogType === 'edit'
    if (isEdit) {
      var res = await editMenu(this.menu)
      console.log(res,'编辑后返回')
      if(res.errcode == 0){
        this.$message({
            type: 'success',
            message: '编辑成功'
        })
        this.dialogVisible = false
        this.getMenu()
        this.getRoutes()
      }else{
        this.$message({
            type: 'error',
            message: '编辑失败'
        })
      }
    } else {
        var res = await addMenu(this.menu)
        console.log(res,'添加菜单返回')
        if(res.errcode == 0){
        this.$message({
            type: 'success',
            message: '添加成功'
        })
        this.dialogVisible = false
        this.getMenu()
        this.getRoutes()
      }else{
        this.$message({
            type: 'error',
            message: '添加失败'
        })
      }
    }
    // var self = this;
    // setTimeout(function(){
    //   self.dialogVisible = false
    //   location.reload()
    // },1000)
  },
  remove(data) {
    var self = this;
    this.$confirm('您确定删除么?', '警告！', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async() => {
        deleteMenu(data.id).then(res => {
        if(res.errcode == 0){
          this.$message({
            type: 'success',
            message: '删除成功'
          })
            this.dialogVisible = false;
          this.getMenu();
        }
      
      })
      }).catch((err) => {
          console.log(err)
      }); 
    },
    }
  };
</script>

<style lang="scss" scoped>

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
/deep/.el-tree-node__content {
  height: 40px!important;
}
</style>