<template>
  <div class="app-container">
    <!-- 头部搜索 -->
    <el-row :gutter="24">
      <el-col :span="8">
        <div class="input-flex">
          <div class="left">商品ID：</div>
          <el-input
            v-model="listQuery.goodsId"
            placeholder="请输入商品ID"
            style="width: 200px"
            class="filter-item"
          />
        </div>
      </el-col>
      <el-col :span="8">
        <div class="input-flex">
          <div class="left">上架时间：</div>
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
          />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      
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
      </el-col>
    </el-row>

    <!-- 商品列表 -->
    <el-table :data="goodsList" style="width: 100%" stripe border>
      <el-table-column prop="id" label="商品ID" align="center" />
      <el-table-column prop="img" label="商品图片" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.img"
            fit="cover"
          />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品名称" align="center" />
      <el-table-column prop="nowprice" label="商品现价" align="center" />
      <el-table-column prop="oldprice" label="商品原价" align="center" />
      <el-table-column prop="canhe" label="餐盒费" align="center" />
      <el-table-column label="商品分类" align="center">
        <template slot-scope="scope">
          <div>{{ getCateName(scope.row.category_id) }}</div>
        </template>
      </el-table-column>

      <el-table-column prop="keywords" label="搜索关键词" align="center" />

      <el-table-column prop="desc" label="描述" align="center" />

      <el-table-column label="详细内容" align="center">
        <template slot-scope="scope">
          <div v-html="scope.row.content">{{ scope.row.content }}</div>
        </template>
      </el-table-column>

      <el-table-column label="规格" align="center">
        <template slot-scope="scope">
          <div
            class="spec-view"
            v-for="(item, index) in scope.row.specs"
            :key="index"
          >
            {{ item.type }}: {{ item.name }}, ￥{{ item.price }}
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.is_up == 1" type="success"> 已上架 </el-tag>
          <el-tag v-if="scope.row.is_up == 0" type="success"> 未上架 </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export { default } from "./schoolgoods.js";
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.input-flex {
  display: flex;
  align-items: center;
  height: 50px;
  line-height: 50px;
  .left {
    width: 100px;
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
.form-item {
  margin-bottom: 20px;
}
.form-title {
  line-height: 36px;
  text-align: right;
}
.inpMar {
  width: 80%;
  margin-bottom: 5px;
}
.newFormatView {
  margin-top: 20px;
  border: 1px solid #eee;
  padding: 10px;
}
.newFormatView .el-form-item {
  margin-top: 10px;
}
.avatar1 {
  display: inline-block;
  width: 33%;
  height: auto;
}
.avatar-uploader-icon1 {
  width: 80px;
  height: 80px;
  line-height: 80px;
}
.btn-box {
  text-align: center;
}
.spec-view {
  padding: 10px;
  border: 1px solid #f3f3f3;
  margin-bottom: 10px;
  .el-input {
    margin-right: 10px;
  }
  .spec-one-view {
    display: flex;
    margin-bottom: 12px;
  }
  .spec-two-view {
    display: flex;
    margin-bottom: 10px;
  }
}
.spec-view {
  border-bottom: 1px solid #f3f3f3;
}
</style>

