<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 头部搜索 -->
      <el-row :gutter="24">
        <div class="input-flex">
          <div class="left">订单号：</div>
          <el-input
            v-model="listQuery.id"
            placeholder="请输入订单号"
            style="width: 200px"
            class="filter-item"
          />
        </div>
        <el-col :span="8"></el-col>
      </el-row>
      <el-row :gutter="24">
        <div class="input-flex">
          <div class="left">评价人：</div>
          <el-input
            v-model="listQuery.nickname"
            placeholder="请输入评价人"
            style="width: 200px"
            class="filter-item"
          />
        </div>
      </el-row>
      <el-row :gutter="24">
        <div class="input-flex">
          <div class="left">星级：</div>
          <div
            class="starbox"
            v-for="(item, index) in starList"
            :key="index"
            @click="starchange(item)"
          >
            <img src="../../assets/image/star.png" v-if="!item.value" alt="" />
            <img src="../../assets/image/star1.png" v-else alt="" />
            <span>{{ item.name }}</span>
          </div>
        </div>
      </el-row>

      <el-row :gutter="24">
        <el-button
          v-waves
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
        >
          查询
        </el-button>
      </el-row>
    </div>
    <div v-if="list.length != 0">
      <div class="list" v-for="(item, index) in list" :key="index">
        <div class="head">
          <div><span>订单号：</span>{{ item.id }}</div>
          <div><span>评论人：</span>{{ item.nickname }}</div>
          <div style="display: flex; align-items: center">
            <span>评分：</span>
            <img
              class="starimg"
              v-for="itemc in Number(item.riderstar)"
              :key="itemc"
              src="../../assets/image/star1.png"
              alt=""
            />
            {{ item.riderstar }}.0
          </div>
          <div>
            <span>评论时间：</span>{{ item.createtime | formatConversion }}
          </div>
        </div>
        <div class="content">
          <span>评论内容：{{ item.ridertext }}</span>
          <el-image
            class="pingjiaimg"
            v-for="itemc in item.riderimg"
            :key="itemc"
            :src="itemc"
            :preview-src-list="item.riderimg"
          >
          </el-image>
        </div>
      </div>
    </div>
    <div style="width:100%;text-align:center;height:100px;line-height:100px;" v-else>
      暂无数据
    </div>

    <!-- 分页 -->
    <pagination
      :total="listQuery.total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
export { default } from "./pingjiaListJs.js";
</script>
<style lang="scss" scoped>
.starimg {
  width: 20px;
  margin-right: 5px;
}
.pingjiaimg {
  display: block;
  width: 150px;
  height: 150px;
  margin: 10px 10px 0 0;
}
.starbox {
  display: flex;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
  img {
    width: 20px;
    margin-right: 5px;
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
.list {
  border: 1px solid #f5f5f5;
  width: 100%;
  .head {
    display: flex;
    align-items: center;
    padding: 15px 0 15px 50px;
    background: #eef1f6;
    div {
      flex: 1;
      span {
        color: #333;
        font-weight: bold;
        font-size: 16px;
      }
    }
  }
  .content {
    padding: 15px 50px;
    span {
      color: #333;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>
