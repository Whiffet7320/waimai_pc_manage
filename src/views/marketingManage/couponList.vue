<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 头部搜索 -->
      <el-row :gutter="24">
        <el-col :span="8"
          ><div class="input-flex">
            <div class="left">优惠券ID：</div>
            <el-input
              v-model="listQuery.id"
              placeholder="请输入优惠券ID"
              style="width: 200px"
              class="filter-item"
            /></div
        ></el-col>
        <el-col :span="8">
          <div class="input-flex">
            状态：
            <el-select
              v-model="listQuery.starttype"
              style="width: 150px"
              class="filter-item"
            >
              <el-option
                v-for="item in starttypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="input-flex">
            券类型：
            <el-select
              v-model="listQuery.type"
              style="width: 150px"
              class="filter-item"
            >
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-button
          v-waves
          class="filter-item"
          type="primary"
          @click="addCoupon"
          style="margin-right: 20px"
        >
          + 添加优惠券
        </el-button>
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

    <el-table
      :data="list"
      style="width: 100%"
      stripe
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
    >
      <el-table-column prop="id" label="优惠券ID" align="center">
      </el-table-column>
      <el-table-column prop="name" label="优惠券名称" align="center">
      </el-table-column>
      <el-table-column prop="type" label="优惠券类型" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 1">打{{ scope.row.num }}折</span>
          <span v-else>抵{{ scope.row.num }}元</span>
        </template>
      </el-table-column>
      <el-table-column label="使用门槛" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.menkan == 0">无门槛</span>
          <span v-else>满{{ scope.row.menkan }}元可用</span>
        </template>
      </el-table-column>
      <el-table-column label="有效时间" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.timetype == 1">
            <div>{{ scope.row.createtime | formatConversion }}</div>
            至
            <div>{{ scope.row.daytimesamp | formatConversion }}</div>
          </span>
          <span v-else-if="scope.row.timetype == 2"
            >{{ scope.row.day }}天后失效</span
          >
          <span v-else>永久有效</span>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createtime | formatConversion }}
        </template>
      </el-table-column>

      <el-table-column label="是否停用" align="center">
        <template slot-scope="scope">
          {{ scope.row.isstop | filterSimpleStatus}}
        </template>
      </el-table-column>

      <el-table-column label="是否参与抽奖" align="center">
        <template slot-scope="scope">
          {{ scope.row.is_choujiang | filterSimpleStatus }}
        </template>
      </el-table-column>

      <el-table-column label="中奖权重" align="center">
        <template slot-scope="scope">
          {{ scope.row.choujiang_weight  }}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <span
            @click="handleSend(scope.row)"
            style="color: #027aff; cursor: pointer"
            >发放</span
          >
          <span
            @click="handleStop(scope.row, 0)"
            v-if="scope.row.isstop == 1"
            style="color: #999; cursor: pointer"
            >启用</span
          >
          <span
            @click="handleStop(scope.row, 1)"
            v-else
            style="color: #999; cursor: pointer"
            >停用</span
          >
          <span
            @click="handleDel(scope.row)"
            style="color: red; cursor: pointer"
            >删除</span
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagination
      :total="listQuery.total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <!-- 添加 -->
    <el-dialog title="添加优惠券" :visible.sync="addcoupondialog" width="50%">
      <el-form ref="dataForm" :model="addQuery">
        <el-row :gutter="24">
          <el-col :span="12">
            <div class="input-flex">
              <div class="left">优惠券名称：</div>
              <el-input
                class="input"
                v-model="addQuery.name"
                placeholder="请输入优惠券名称"
              ></el-input>
            </div>
          </el-col>
          <el-col :span="12"> </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <div class="input-flex">
              <div class="left">优惠券类型：</div>
              <el-select
                v-model="addQuery.type"
                style="width: 150px"
                class="filter-item"
              >
                <el-option
                  v-for="item in addTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="input-flex" v-if="addQuery.type == 1">
              <div class="left" style="width: 70px">折扣数：</div>
              <el-input
                class="input"
                v-model="addQuery.num"
                type="number"
                placeholder="请输入折扣数"
              ></el-input
              ><span style="margin-left: 10px">折</span>
            </div>
            <div class="input-flex" v-else>
              <div class="left" style="width: 70px">折扣金额：</div>
              <el-input
                class="input"
                v-model="addQuery.num"
                type="number"
                placeholder="请输入折扣金额"
              ></el-input
              ><span style="margin-left: 10px">元</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <div class="input-flex">
              <div class="left">使用门槛：满</div>

              <el-input
                class="input"
                type="number"
                v-model="addQuery.menkan"
                placeholder="请输入使用门槛"
              ></el-input>
              <span style="margin-left: 10px">元</span>
            </div>
          </el-col>
          <el-col :span="12"> </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <div class="input-flex">
              <div class="left">使用时间：</div>
              <el-select
                v-model="addQuery.timetype"
                style="width: 150px"
                class="filter-item"
              >
                <el-option
                  v-for="item in addTimeTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="input-flex" v-if="addQuery.timetype == 1">
              <div class="left" style="width: 70px">选择时间：</div>
              <span style="margin-right: 10px"></span>

              <el-date-picker
                style="width: 250px"
                v-model="timevalue"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="timestamp"
              >
              </el-date-picker>
            </div>
            <div class="input-flex" v-if="addQuery.timetype == 2">
              <div class="left" style="width: 70px">有效天数：</div>
              <el-input
                class="input"
                v-model="addQuery.day"
                type="number"
                placeholder="请输入有效天数"
              ></el-input
              ><span style="margin-left: 10px">天</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <div class="input-flex">
              <div class="left">是否参与抽奖：</div>
              <el-select
                v-model="addQuery.is_choujiang"
                style="width: 150px"
                class="filter-item"
              >
                <el-option
                  v-for="item in isChoujiang"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </el-col>
          <el-col :span="12">
              <div class="input-flex">
                <div class="left" style="width: 80px;">中奖权重：</div>
                <el-input
                  class="input"
                  type="number"
                  v-model="addQuery.choujiang_wight"
                  placeholder="0不会中奖,值越大越容易中奖"
                ></el-input>
              </div>
          </el-col>
        </el-row>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addcoupondialog = false"> 取消 </el-button>
        <el-button @click="addtap" type="primary">确定</el-button>
      </div>
    </el-dialog>

    <!-- 发放优惠券 -->
    <el-dialog title="发放优惠券" :visible.sync="sendcoupondialog" width="50%">
      <el-form ref="dataForm" :model="sendQuery">
        <el-row :gutter="24">
          <el-col :span="24">
            <div class="input-flex">
              <div class="left">发放类型：</div>
              <el-select
                v-model="sendQuery.type"
                style="width: 150px"
                class="filter-item"
              >
                <el-option
                  v-for="item in sendTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24" v-if="sendQuery.type == 1">
          <el-col :span="24">
            <div class="input-flex">
              <div class="left">用户ID：</div>
              <el-input
                class="input"
                v-model="sendQuery.userlist"
                placeholder="多个ID用英文逗号隔开"
              ></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <div class="input-flex">
              <div class="left">下单次数：</div>
              <el-input
                class="input"
                type="number"
                v-model="sendQuery.xiadannum"
                placeholder="请输入下单次数"
              ></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <div class="input-flex">
              <div class="left">用户等级：</div>
              <el-input
                class="input"
                type="number"
                v-model="sendQuery.level"
                placeholder="请输入用户等级"
              ></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <div class="input-flex">
              <div class="left">最小余额：</div>
              <el-input
                class="input"
                type="number"
                v-model="sendQuery.mincoin"
                placeholder="请输入最小余额"
              ></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <div class="input-flex">
              <div class="left">最大余额：</div>
              <el-input
                class="input"
                type="number"
                v-model="sendQuery.maxcoin"
                placeholder="请输入最大余额"
              ></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <div class="input-flex">
              <div class="left">发放数量：</div>
              <el-input
                class="input"
                type="number"
                v-model="sendQuery.num"
                placeholder="请输入发放数量"
              ></el-input>
            </div>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="sendcoupondialog = false"> 取消 </el-button>
        <el-button @click="sendtap" type="primary">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export { default } from "./couponListJs.js";
</script>
<style lang="scss" scoped>
.searchqishou {
  // padding: 15px;
  display: flex;
  align-items: center;
  .inputwidth {
    width: 250px;
    margin-right: 10px;
  }
}
.qishouname {
  display: flex;
  flex-wrap: wrap;
  max-width: 360px;
  margin-top: 20px;
  .qishou {
    width: 80px;
    height: 30px;
    background: #ececec;
    color: #000000;
    line-height: 30px;
    text-align: center;
    border-radius: 5px;
    margin-bottom: 10px;
    margin-right: 5px;
    cursor: pointer;
  }
  .act {
    background: #0ccca7;
  }
}

.input-flex {
  display: flex;
  align-items: center;
  height: 50px;
  line-height: 50px;
  .left {
    width: 100px;
    text-align: left;
  }
  .input {
    width: 200px;
  }
}
.detailsbox {
  display: flex;
  align-items: center;
  height: 40px;
  .leftitlte {
    font-weight: bold;
    font-size: 14px;
    width: 70px;
    text-align: right;
  }
}

.addrdeta {
  border: 1px solid #01cc00;
  padding: 3px 5px;
  border-radius: 5px;
  color: #01cc00;
  font-size: 12px;
  margin-left: 20px;
  cursor: pointer;
}
</style>
