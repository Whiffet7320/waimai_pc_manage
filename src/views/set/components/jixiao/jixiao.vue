<template>
  <div class="app-container">
    <el-radio-group v-model="jixiaotype" style="margin-bottom: 30px">
      <el-radio-button label="1">分成模版</el-radio-button>
      <el-radio-button label="2">绩效模版</el-radio-button>
    </el-radio-group>

    <div class="filter-container" v-show="jixiaotype == 1">
      <el-table :data="list" style="width: 100%" stripe>
        <el-table-column prop="id" label="序号" align="center">
        </el-table-column>
        <el-table-column
          prop="zhuanzhifencheng"
          label="专职分成(%)"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="jianzhifencheng"
          label="兼职分成(%)"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="zhuanzhibuzhu" label="专职补助" align="center">
        </el-table-column>
        <el-table-column prop="jianzhibuzhu" label="兼职补助" align="center">
        </el-table-column>
        <el-table-column prop="zhuanzhicoin" label="专职抽成金额" align="center">
        </el-table-column>
        <el-table-column prop="jianzhicoin" label="兼职抽成金额" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <span
              @click="fenchengEdit(scope.$index, scope.row)"
              style="color: #027aff; cursor: pointer"
              >修改</span
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

  <!-- 绩效 -->
    <div class="filter-container" v-show="jixiaotype == 2">
      <el-table :data="listjixiao" style="width: 100%" stripe>
        <el-table-column prop="id" label="序号" align="center">
        </el-table-column>
        <el-table-column
          prop="meijigongli"
          label="公里内"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="weijidan"
          label="接单数"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="meichaochu" label="公里外" align="center">
        </el-table-column>
        <el-table-column prop="zengjiadan" label="增加单数" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <span
              @click="jixiaoEdit(scope.$index, scope.row)"
              style="color: #027aff; cursor: pointer"
              >修改</span
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分成编辑 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 450px; margin-left: 50px"
      >
        <el-row class="input-flex">
          <el-col :span="6" style="text-align: right"> 专职分成(%): </el-col>
          <el-col :span="19" :push="1">
            <el-input
              v-model="temp.zhuanzhifencheng"
              placeholder=""
              style="width: 200px"
              class="filter-item"
            />
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="6" style="text-align: right"> 兼职分成(%): </el-col>
          <el-col :span="19" :push="1">
            <el-input
              v-model="temp.jianzhifencheng"
              placeholder=""
              style="width: 200px"
              class="filter-item"
            />
          </el-col>
        </el-row>

        <el-row class="input-flex">
          <el-col :span="6" style="text-align: right"> 专职补助: </el-col>
          <el-col :span="19" :push="1">
            <el-input
              v-model="temp.zhuanzhibuzhu"
              placeholder=""
              style="width: 200px"
              class="filter-item"
            />
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="6" style="text-align: right"> 兼职补助: </el-col>
          <el-col :span="19" :push="1">
            <el-input
              v-model="temp.jianzhibuzhu"
              placeholder=""
              style="width: 200px"
              class="filter-item"
            />
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="6" style="text-align: right"> 专职抽成金额: </el-col>
          <el-col :span="19" :push="1">
            <el-input
              v-model="temp.zhuanzhicoin"
              placeholder=""
              style="width: 200px"
              class="filter-item"
            />
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="6" style="text-align: right"> 兼职抽成金额: </el-col>
          <el-col :span="19" :push="1">
            <el-input
              v-model="temp.jianzhicoin"
              placeholder=""
              style="width: 200px"
              class="filter-item"
            />
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="6" style="text-align: right"> 专职: </el-col>
          <el-col :span="19" :push="1">
            元<el-switch
              v-model="temp.zhuanzhi"
              active-color="#027aff"
              inactive-color="#999"
              style="margin:0 10px"
            >
            </el-switch
            >%（抽成金额按照元或百分比进行抽成）
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="6" style="text-align: right"> 兼职: </el-col>
          <el-col :span="19" :push="1">
            元<el-switch
              v-model="temp.jianzhi"
              active-color="#027aff"
              inactive-color="#999"
              style="margin:0 10px"
            >
            </el-switch
            >%（抽成金额按照元或百分比进行抽成）
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> 取消 </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : fenchengUpdate()"
        >
          确定
        </el-button>
      </div>
    </el-dialog>

    <!-- 绩效编辑 -->
    <el-dialog :title="textMap[jixiaodialogStatus]" :visible.sync="jixiaodialogFormVisible">
      <el-form
        ref="dataForm"
        :model="tempjixiao"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left: 50px"
      >
        <el-row class="input-flex">
          <el-col :span="5" style="text-align: right"> 公里内: </el-col>
          <el-col :span="19" :push="1">
            <el-input
              v-model="tempjixiao.meijigongli"
              placeholder=""
              style="width: 200px"
              class="filter-item"
            />
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="5" style="text-align: right"> 接单数: </el-col>
          <el-col :span="19" :push="1">
            <el-input
              v-model="tempjixiao.weijidan"
              placeholder=""
              style="width: 200px"
              class="filter-item"
            />
          </el-col>
        </el-row>

        <el-row class="input-flex">
          <el-col :span="5" style="text-align: right"> 公里外: </el-col>
          <el-col :span="19" :push="1">
            <el-input
              v-model="tempjixiao.meichaochu"
              placeholder=""
              style="width: 200px"
              class="filter-item"
            />
          </el-col>
        </el-row>
        <el-row class="input-flex">
          <el-col :span="5" style="text-align: right"> 增加单数: </el-col>
          <el-col :span="19" :push="1">
            <el-input
              v-model="tempjixiao.zengjiadan"
              placeholder=""
              style="width: 200px"
              class="filter-item"
            />
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> 取消 </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : jixiaoUpdate()"
        >
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export { default } from "./jixiaoJs.js";
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
</style>
