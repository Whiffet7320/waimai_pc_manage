<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 头部搜索 -->
      <el-tabs v-model="listQuery.status" @tab-click="handleClick">
        <el-tab-pane label="全部" name="3"></el-tab-pane>
        <el-tab-pane label="待审核" name="0"></el-tab-pane>
        <el-tab-pane label="已通过" name="1"></el-tab-pane>
        <el-tab-pane label="已拒绝" name="2"></el-tab-pane>
      </el-tabs>
    </div>

    <el-table :data="list" style="width: 100%" stripe>
      <el-table-column prop="uid" label="店铺ID" align="center">
      </el-table-column>
      <el-table-column prop="shopname" label="商家姓名" align="center">
      </el-table-column>
      <el-table-column prop="shoptitle" label="店铺名称" align="center">
      </el-table-column>
      <el-table-column prop="shopphone" label="联系方式" align="center">
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
      <el-table-column label="营业执照" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.shopyingyezhao"
            :preview-src-list="[scope.row.shopyingyezhao]"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="健康码" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.shopjiankang"
            :preview-src-list="[scope.row.shopjiankang]"
          >
          </el-image>
        </template>
      </el-table-column>

      <el-table-column prop="" label="申请时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createtime | formatConversion }}
        </template>
      </el-table-column>

      <el-table-column prop="remark" label="备注" align="center">
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            style="margin: 0"
            type="primary"
            v-if="scope.row.status == 0"
            >查看</el-button
          >
          <span v-else-if="scope.row.status == 1">已通过</span>
          <span v-else>已拒绝</span>
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
          <el-col :span="5" style="text-align: right"> 商家姓名: </el-col>
          <el-col :span="19" :push="1">
            <el-input
              v-model="temp.shopname"
              style="width: 200px"
              class="filter-item"
              readonly
            />
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="5" style="text-align: right"> 店铺名称: </el-col>
          <el-col :span="19" :push="1">
            <el-input
              v-model="temp.shoptitle"
              style="width: 200px"
              class="filter-item"
              readonly
            />
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="5" style="text-align: right"> 联系电话: </el-col>
          <el-col :span="19" :push="1">
            <el-input
              v-model="temp.shopphone"
              style="width: 200px"
              class="filter-item"
              readonly
            />
          </el-col>
        </el-row>
        <el-row class="input-flex input-img">
          <el-col :span="5" style="text-align: right"> 店铺logo: </el-col>
          <el-col :span="19" :push="1">
            <el-image
              style="width: 100px; height: 100px"
              :src="temp.shoplogo"
              :preview-src-list="[temp.shoplogo]"
            >
            </el-image>
          </el-col>
        </el-row>
        <el-row class="input-flex input-img">
          <el-col :span="5" style="text-align: right"> 身份证照片: </el-col>
          <el-col :span="19" :push="1">
            <el-image
              style="width: 100px; height: 100px"
              :src="temp.shopidcardzheng"
              :preview-src-list="[temp.shopidcardzheng]"
            >
            </el-image>
            <el-image
              style="width: 100px; height: 100px"
              :src="temp.shopidcardfan"
              :preview-src-list="[temp.shopidcardfan]"
            >
            </el-image>
            <el-image
              style="width: 100px; height: 100px"
              :src="temp.shopidcardshouchi"
              :preview-src-list="[temp.shopidcardshouchi]"
            >
            </el-image>
          </el-col>
        </el-row>
        <el-row class="input-flex input-img">
          <el-col :span="5" style="text-align: right"> 营业执照: </el-col>
          <el-col :span="19" :push="1">
            <el-image
              style="width: 100px; height: 100px"
              :src="temp.shopyingyezhao"
              :preview-src-list="[temp.shopyingyezhao]"
            >
            </el-image>
          </el-col>
        </el-row>
        <el-row class="input-flex input-img">
          <el-col :span="5" style="text-align: right"> 健康证: </el-col>
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
          <el-col :span="5" style="text-align: right"> 地址: </el-col>
          <el-col :span="19" :push="1">
            {{ temp.shopaddress }}
          </el-col>
        </el-row>

        <el-row class="input-flex">
          <el-col :span="5" style="text-align: right"> 代理商备注: </el-col>
          <el-col :span="19" :push="1">
             <el-input
             
              type="textarea"
              :rows="2"
              placeholder="输入备注内容"
              v-model="temp.remark"
            >
            </el-input>
          </el-col>
        </el-row>


       <el-row class="input-flex">
          <el-col :span="5" style="text-align: right"> 审核: </el-col>
          <el-col :span="19" :push="1">
            <el-radio v-model="temp.status" label="1">通过</el-radio>
            <el-radio v-model="temp.status" label="2">拒绝</el-radio>
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="5" style="text-align: right"></el-col>
          <el-col :span="19" :push="1">
            <el-input
             
              type="textarea"
              :rows="2"
              placeholder="输入内容"
              v-model="temp.text"
            >
            </el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> 取消 </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export { default } from "./merchantListJs.js";
</script>
<style lang="scss" scoped>
.addcoinbox {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .btn {
    margin-top: 50px;
  }
}
.input-flex {
  display: flex;
  align-items: center;
  height: 50px;
  line-height: 50px;
  .left {
    width: 80px;
  }
}
.input-img {
  height: auto;
  line-height: normal;

  .imgbox {
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    border: 1px solid #f5f5f5;
    border-radius: 10px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .imgPre {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }
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
