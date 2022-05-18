<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 头部搜索 -->
      <el-row :gutter="24">
        <el-col :span="8"
          ><div class="input-flex">
            <div class="left">店铺ID：</div>
            <el-input
              v-model="listQuery.id"
              placeholder="请输入店铺ID"
              style="width: 200px"
              class="filter-item"
            /></div
        ></el-col>
        <el-col :span="8">
          <div class="input-flex">
            商家姓名：
            <el-input
              v-model="listQuery.shopname"
              placeholder="请输入电话"
              style="width: 200px"
              class="filter-item"
            />
          </div>
        </el-col>
        <el-col :span="8">
          <div class="input-flex">
            联系电话：
            <el-input
              v-model="listQuery.phone"
              placeholder="请输入电话"
              style="width: 200px"
              class="filter-item"
            />
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="8">
          <div class="input-flex">
            店铺名称：
            <el-input
              v-model="listQuery.shoptitle"
              placeholder="请输入店铺名称"
              style="width: 200px"
              class="filter-item"
            />
          </div>
        </el-col>
        <el-col :span="8">
          <div class="input-flex">
            注册时间：
            <el-date-picker
              v-model="listQuery.timefilter"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              style="width: 250px"
              value-format="timestamp"
            >
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="8">
          <el-button
            v-waves
            class="filter-item"
            type="primary"
            icon="el-icon-search"
            @click="handleFilter"
          >
            查询
          </el-button>
          <el-button
            v-waves
            :loading="downloadLoading"
            class="filter-item"
            type="primary"
            icon="el-icon-download"
            @click="handleDownload"
          >
            导出
          </el-button>
        </el-col>
      </el-row>
    </div>

    <el-table :data="list" style="width: 100%" stripe>
      <el-table-column prop="id" label="店铺ID" align="center">
      </el-table-column>
      <el-table-column prop="shopname" label="商家姓名" align="center">
      </el-table-column>
      <el-table-column prop="shoptitle" label="店铺名称" align="center">
      </el-table-column>
      <el-table-column prop="shopphone" label="联系电话" align="center">
      </el-table-column>
      <el-table-column label="店铺logo" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.shoplogo"
            :preview-src-list="[scope.row.shoplogo]"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="上级ID" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.shangji == 0">无上级</span>
          <span v-else>{{ scope.row.shangji }}</span>
        </template>
      </el-table-column>
      <el-table-column label="店铺状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.accountstatus == 1">封号</span>
          <span v-else>正常</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="注册时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createtime | formatConversion }}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
           <el-button @click="handleEdit(scope.$index, scope.row)" type="primary">查看详情</el-button>
           <el-button @click="godetails(scope.row)" type="success">查看商品</el-button>
           <el-button @click="fenghao(scope.$index, scope.row)" v-if="scope.row.accountstatus == 0" type="info">封号</el-button>
           <el-button @click="fenghao(scope.$index, scope.row)" v-else type="danger">解封</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagination
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <!-- 编辑 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left: 50px"
      >
        <el-row class="input-flex">
          <el-col :span="4" style="text-align: right"> 店铺ID: </el-col>
          <el-col :span="19" :push="1">
            {{ temp.id }}
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="4" style="text-align: right"> 商家姓名: </el-col>
          <el-col :span="19" :push="1">
            {{ temp.shopname }}
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="4" style="text-align: right"> 店铺名称: </el-col>
          <el-col :span="19" :push="1">
            {{ temp.shoptitle }}
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="4" style="text-align: right"> 联系电话: </el-col>
          <el-col :span="19" :push="1">
            {{ temp.shopphone }}
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="4" style="text-align: right"> 注册时间: </el-col>
          <el-col :span="19" :push="1">
            {{ temp.createtime | formatConversion }}
          </el-col>
        </el-row>
        <el-row class="input-flex" style="height:auto;">
          <el-col :span="4" style="text-align: right"> 店铺logo: </el-col>
          <el-col :span="19" :push="1">
            <el-image
              style="width: 100px; height: 100px"
              :src="temp.shoplogo"
              :preview-src-list="[temp.shoplogo]"
            >
            </el-image>
          </el-col>
        </el-row>
        <el-row class="input-flex" style="height:auto;">
          <el-col :span="4" style="text-align: right"> 营业执照: </el-col>
          <el-col :span="19" :push="1">
            <el-image
              style="width: 100px; height: 100px"
              :src="temp.shopyingyezhao"
              :preview-src-list="[temp.shopyingyezhao]"
            >
            </el-image>
          </el-col>
        </el-row>
        <el-row class="input-flex" style="height:auto;">
          <el-col :span="4" style="text-align: right"> 健康码: </el-col>
          <el-col :span="19" :push="1">
            <el-image
              style="width: 100px; height: 100px"
              :src="temp.shopjiankang"
              :preview-src-list="[temp.shopjiankang]"
            >
            </el-image>
          </el-col>
        </el-row>

         <el-row class="input-flex">
          <el-col :span="5" style="text-align: right"> 配送费: </el-col>
          <el-col :span="19" :push="1">
            <el-input
              v-model="temp.peisongfei"
              style="width: 200px"
              class="filter-item"
            />
          </el-col>
        </el-row>

        <el-row class="input-flex">
          <el-col :span="5" style="text-align: right"> 起送价: </el-col>
          <el-col :span="19" :push="1">
             <el-input
              v-model="temp.qisongjia"
              style="width: 200px"
              class="filter-item"
            />
          </el-col>
        </el-row>

        <el-row class="input-flex">
          <el-col :span="5" style="text-align: right"> 配送范围: </el-col>
          <el-col :span="19" :push="1">
            <el-input
              v-model="temp.peisongfanwei"
              style="width: 200px"
              class="filter-item"
            />
          </el-col>
        </el-row>

        <!-- <el-row class="input-flex">
          <el-col :span="4" style="text-align: right"> 封号: </el-col>
          <el-col :span="19" :push="1">
            <el-select v-model="temp.accountstatus" class="filter-item">
              <el-option
                v-for="item in accountstatusOptions"
                :key="item.label"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
          </el-col>
        </el-row> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> 取消 </el-button>
        <el-button
          type="primary"
          @click="updateData()"
        >
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export { default } from "./storeListJs.js";
</script>
<style lang="scss" scoped>
.input-flex {
  display: flex;
  align-items: center;
  height: 50px;
  line-height: 50px;
  .left {
    width: 80px;
  }
}
.filter-container .timeBox {
  display: flex;
  padding-bottom: 20px;
  justify-content: space-between;
}

.demonstration {
  font-size: 15px;
  color: #606266;
  margin-top: 5px;
}
.cell {
  .el-button {
    // width: 40%;
    margin-bottom: 10px;
  }
}
</style>
