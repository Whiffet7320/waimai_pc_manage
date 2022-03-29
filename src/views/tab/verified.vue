<template>
  <div style="padding: 30px">
    <el-table v-loading="tableLoading" :data="tableList" border fit highlight-current-row style="width: 100%;">
      <el-table-column label="ID" align="center" width="50">
        <template slot-scope="{row}">{{ row.id }}</template>
      </el-table-column>
      <el-table-column label="用户ID" align="center" width="100">
        <template slot-scope="{row}">{{ row.uid }}</template>
      </el-table-column>
      <el-table-column label="真实姓名" align="center">
        <template slot-scope="{row}">{{ row.real_name }}</template>
      </el-table-column>
      <el-table-column label="手机号" align="center">
        <template slot-scope="{row}">{{ row.phone }}</template>
      </el-table-column>
      <el-table-column label="email" align="center">
        <template slot-scope="{row}">{{ row.email }}</template>
      </el-table-column>
      <el-table-column label="地址" align="center">
        <template slot-scope="{row}">{{ row.address }}</template>
      </el-table-column>
      <el-table-column label="身份证号" align="center">
        <template slot-scope="{row}">{{ row.id_card }}</template>
      </el-table-column>
      <el-table-column label="身份证(正)" align="center" width="230">
        <template slot-scope="{row}">
          <el-image style="width: 200px; height: 100px" :src="row.img1"
                    :preview-src-list="[row.img1,row.img2]"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="身份证(反)" align="center" width="230">
        <template slot-scope="{row}">
          <el-image style="width: 200px; height: 100px" :src="row.img2"
                    :preview-src-list="[row.img1,row.img2]"></el-image>
        </template>
      </el-table-column>
      <!-- <el-table-column label="身份证(手持)" align="center" width="230">
        <template slot-scope="{row}">
          <el-image style="width: 200px; height: 100px" :src="row.img3"
                    :preview-src-list="[row.img1,row.img2,row.img3]"></el-image>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="修改时间" align="center">
        <template slot-scope="{row}">{{ row.update_at}}</template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="{row}">{{ row.create_at}}</template>
      </el-table-column> -->
      <el-table-column label="审核状态" align="center">
        <template slot-scope="{row}">
          <span v-if="row.is_check != '0'">{{statusArr[row.is_check - 0]}}</span>
          <el-dropdown @command="handleCommand" v-else>
            <el-button type="primary">
              <span>{{statusArr[row.is_check - 0]}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{id: row.id, status: 1}">通过</el-dropdown-item>
              <el-dropdown-item :command="{id: row.id, status: 2}">拒绝</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="tableQuery.page" :limit.sync="tableQuery.limit" @pagination="requestTable"/>
  </div>
</template>

<script>
  import { getealName, getealNameStatus } from '@/api/gdzs.js'

  export default {
    components: {
      Pagination: () => import('@/components/Pagination')
    },
    name: 'verified',
    data() {
      return {
        statusArr: ['待审核', '审核通过', '审核已拒绝'],
        tableLoading: false,
        tableList: [],
        tableQuery: {
          page: 1,
          limit: 10
        },
        total:0
      }
    },
    methods: {
      handleCommand (e) {
        getealNameStatus(e).then(res => res.errcode === 0 ? (this.$message.success('操作成功'),this.requestInfo()) : this.$message.error(res.errmsg))
      },
      requestInfo() {
        this.tableQuery = {
          page: 1,
          limit: 10
        }
        this.requestTable()
      },
      requestTable() {
        this.tableLoading = true
        getealName(this.tableQuery).then(res => {
          if(res.errcode === 0){
            this.tableList = res.list
            this.total = parseInt(res.count)
          }else{
            // this.$message.error(res.errmsg)
          }
          this.tableLoading = false
        })
      }
    },
    beforeMount() {
      this.requestInfo()
    }
  }
</script>

<style scoped>

</style>
