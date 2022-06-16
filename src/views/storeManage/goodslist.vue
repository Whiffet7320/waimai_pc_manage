<template>
  <div class="app-container">
    <!-- 头部搜索 -->
    <el-row :gutter="20">
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
    </el-row>

    <el-row :gutter="20">
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
      <el-col :span="8">
        <el-radio-group v-model="listQuery.tabDay" class="input-flex">
          <el-radio-button label="1"> 今日 </el-radio-button>
          <el-radio-button label="2"> 本周 </el-radio-button>
          <el-radio-button label="3"> 本月 </el-radio-button>
        </el-radio-group>
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
        <el-button
          v-waves
          class="filter-item"
          type="primary"
          icon="el-icon-plus"
          @click="handleAdd"
        >
          添加商品
        </el-button>
      </el-col>
    </el-row>
    <!-- 商品列表 -->
    <el-table :data="goodsList" style="width: 100%" stripe border>
      <el-table-column prop="id" label="商品ID" align="center" />
      <el-table-column prop="img" label="商品图片" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 80px; height: 80px"
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
            {{ item.type }}:

            <div v-for="(cItem, cIndex) in item.role" :key="cIndex">
              {{ cItem.name }}--¥{{ cItem.price }}
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.is_up == 1" type="success"> 已上架 </el-tag>
          <el-tag v-if="scope.row.is_up == 0" type="success"> 未上架 </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row)"> 修改 </el-button>
          <el-button
            type="primary"
            @click="optShelf(scope.row, 0)"
            v-if="scope.row.is_up == 1"
          >
            下架
          </el-button>
          <el-button
            type="primary"
            @click="optShelf(scope.row, 1)"
            v-if="scope.row.is_up == 0"
          >
            上架
          </el-button>
          <el-button type="danger" @click="delect(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加商品弹窗 -->
    <el-dialog
      :title="dialogTitle == 1 ? '添加商品' : '修改商品'"
      :visible.sync="showAddGoods"
    >
      <el-form ref="dataForm" label-position="left" label-width="120px">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="goodsItem.name" placeholder="请输入商品名称" />
        </el-form-item>

        <el-form-item label="商品排序" prop="sort">
          <el-input v-model="goodsItem.sort" placeholder="请输入商品排序" />
        </el-form-item>

        <el-form-item label="缩略图" prop="goodsName">
          <el-upload
            ref="avatar-uploader"
            class="avatar-uploader"
            action
            :show-file-list="false"
            :auto-upload="false"
            :on-change="(file) => handleImgSuccess(file)"
          >
            <img v-if="goodsItem.img" :src="goodsItem.img" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="商品现价" prop="nowprice">
          <el-input v-model="goodsItem.nowprice" placeholder="请输入商品现价" />
        </el-form-item>

        <el-form-item label="商品原价" prop="oldprice">
          <el-input v-model="goodsItem.oldprice" placeholder="请输入商品原价" />
        </el-form-item>

        <el-form-item label="商品类型" prop="cateList">
          <el-select
            v-model="goodsItem.category_id"
            placeholder="请选择商品类型"
          >
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="搜索关键词" prop="keywords">
          <el-input
            v-model="keywords"
            placeholder="请输入搜索关键词(以逗号分隔)"
          />
        </el-form-item>

        <el-form-item label="商品描述" prop="desc">
          <el-input v-model="goodsItem.desc" placeholder="请输入商品描述" />
        </el-form-item>

        <el-form-item label="多规格" prop="isAttr">
          <el-switch v-model="isAttr" />
        </el-form-item>

        <el-form-item v-if="isAttr" label="规格添加" prop="spec">
          <el-button type="primary" @click="addSpecName">
            添加分类名称
          </el-button>
          <div style="height: 10px"></div>
          <div v-for="(item, index) in attrList" :key="index" class="spec-view">
            <div class="spec-one-view">
              <el-input v-model="item.type" placeholder="请输入名称"></el-input>
              <el-button
                circle
                type="primary"
                icon="el-icon-plus"
                @click="addOne(index)"
              ></el-button>
              <el-button
                circle
                type="primary"
                plain
                icon="el-icon-minus"
                @click="popOne(index)"
              ></el-button>
            </div>
            <div
              v-for="(citem, cindex) in item.role"
              :key="cindex"
              class="spec-two-view"
            >
              <el-input
                v-model="citem.name"
                placeholder="请输入名称"
              ></el-input>
              <el-input
                v-model="citem.price"
                placeholder="请输入价格"
                type="number"
              ></el-input>
              <el-button
                circle
                type="primary"
                plain
                icon="el-icon-minus"
                @click="popTwo(index, cindex)"
              ></el-button>
            </div>
          </div>

          <el-button type="primary" @click="createSpec"> 生成规格 </el-button>
        </el-form-item>

        <el-form-item label="轮播图" prop="banner_img">
          <el-row
            type="flex"
            justify="start"
            style="width: 100%; flex-wrap: wrap"
          >
            <div
              class="imgCarousel"
              v-for="(item, index) in bannerList"
              :key="index"
            >
              <div>
                <i
                  class="el-icon-delete"
                  style="color: white; font-size: 20px"
                  @click="onDelect(index)"
                />
              </div>
              <img :src="item" class="avatar1" />
            </div>

            <el-upload
              ref="banner_imgs"
              class="avatar-uploader imgCarousel-uploader"
              action=""
              :show-file-list="false"
              :auto-upload="false"
              :on-change="(file) => handleBannerSuccess(file, 'banner_img')"
            >
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-row>
        </el-form-item>

        <el-form-item label="餐盒费" prop="canhe">
          <el-input
            v-model="goodsItem.canhe"
            placeholder="请输入餐盒费"
            type="number"
          />
        </el-form-item>

        <el-form-item label="单点是否配送" prop="dandianpeisong">
          <el-switch v-model="dandianpeisong" />
        </el-form-item>

        <el-form-item label="商品详情" prop="content">
          <FuncFormsEdit
            :contents="goodsItem.content"
            @change="textChange($event)"
          />
        </el-form-item>
      </el-form>
      <div class="btn-box">
        <el-button style="margin-top: 20px" type="primary" @click="onConfirm">
          确认添加
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import FuncFormsEdit from "@/components/FuncFormsEdit/FuncFormsEdit"

export { default } from "./goods.js";
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
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  border-radius: 5px;
  border: 1px dashed #8c939d;
}
.avatar {
  width: 80px;
  height: 80px;
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
  width: 80px;
  height: 80px;
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
.imgCarousel-uploader,
.imgCarousel {
  width: 80px;
  height: 80px;
  position: relative;
  margin: 5px;
}

.imgCarousel-uploader .el-upload {
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
}

.imgCarousel:hover > div {
  display: flex;
}

.imgCarousel > img {
  width: 100%;
  height: 100%;
}

.imgCarousel > div {
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>

