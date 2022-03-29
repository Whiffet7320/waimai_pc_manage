<template>
  <div id="box">
    <div class="header">
      <div class="title">商家位置</div>
      <div class="right">
        <div class="fujin">
          <span>附近骑手</span>
          <el-radio-group v-model="tabPosition" @change="handleClick">
            <el-radio-button label="0">全部</el-radio-button>
            <el-radio-button label="1">1km</el-radio-button>
            <el-radio-button label="2">2km</el-radio-button>
            <el-radio-button label="3">3km</el-radio-button>
            <el-radio-button label="5">5km</el-radio-button>
            <el-radio-button label="7">7km</el-radio-button>
          </el-radio-group>
        </div>

        <div class="fujin">
          <span>骑手类型</span>
          <el-radio-group v-model="tabtype" @change="typeClick">
            <el-radio-button label="2">全部</el-radio-button>
            <el-radio-button label="1">全职</el-radio-button>
            <el-radio-button label="0">兼职</el-radio-button>
          </el-radio-group>
        </div>

        <el-button type="primary" @click="refresh">刷新</el-button>
      </div>
    </div>
    <div id="myMap"></div>

    <!-- 标记点所有 -->
    <div
      v-for="(item, index) in list0km"
      :key="'markets0km-' + index"
      :class="'markets0km ' + fiterClass(index, item)"
      @mouseover="mouseOver(index)"
      @mouseleave="mouseLeave"
    >
      <span>{{ item.data.ridername }}</span>
      <div class="nums">
        {{ $isEmpty(item.data.dangqiandan) ? 0 : item.data.dangqiandan }}
      </div>

      <div class="xiangxi" v-if="actindex == index">
        <div class="name">
          {{ item.data.ridername }}
          <span style="color: red">{{ item.data.dangqiandan }}</span>
        </div>
        <div class="name">{{ item.data.phone }}</div>
        <div class="name" @click="goDetails(item.data)">详情</div>
      </div>
    </div>

    <!-- 标记点1km -->
    <div
      v-for="(item, index) in list1km"
      :key="'markets1km-' + index"
      :class="'markets1km ' + fiterClass(index, item)"
      @mouseover="mouseOver(index)"
      @mouseleave="mouseLeave"
    >
      <span>{{ item.data.ridername }}</span>
      <div class="nums">
        {{ $isEmpty(item.data.dangqiandan) ? 0 : item.data.dangqiandan }}
      </div>

      <div class="xiangxi" v-if="actindex == index">
        <div class="name">
          {{ item.data.ridername }}
          <span style="color: red">{{ item.data.dangqiandan }}</span>
        </div>
        <div class="name">{{ item.data.phone }}</div>
        <div class="name" @click="goDetails(item.data)">详情</div>
      </div>
    </div>

    <!-- 标记点2km -->
    <div
      v-for="(item, index) in list2km"
      :key="'markets2km-' + index"
      :class="'markets2km ' + fiterClass(index, item)"
      @mouseover="mouseOver(index)"
      @mouseleave="mouseLeave"
    >
      <span>{{ item.data.ridername }}</span>
      <div class="nums">
        {{ $isEmpty(item.data.dangqiandan) ? 0 : item.data.dangqiandan }}
      </div>

      <div class="xiangxi" v-if="actindex == index">
        <div class="name">
          {{ item.data.ridername }}
          <span style="color: red">{{ item.data.dangqiandan }}</span>
        </div>
        <div class="name">{{ item.data.phone }}</div>
        <div class="name" @click="goDetails(item.data)">详情</div>
      </div>
    </div>

    <!-- 标记点3km -->
    <div
      v-for="(item, index) in list3km"
      :key="'markets3km-' + index"
      :class="'markets3km ' + fiterClass(index, item)"
      @mouseover="mouseOver(index)"
      @mouseleave="mouseLeave"
    >
      <span>{{ item.data.ridername }}</span>
      <div class="nums">
        {{ $isEmpty(item.data.dangqiandan) ? 0 : item.data.dangqiandan }}
      </div>

      <div class="xiangxi" v-if="actindex == index">
        <div class="name">
          {{ item.data.ridername }}
          <span style="color: red">{{ item.data.dangqiandan }}</span>
        </div>
        <div class="name">{{ item.data.phone }}</div>
        <div class="name" @click="goDetails(item.data)">详情</div>
      </div>
    </div>

    <!-- 标记点5km -->
    <div
      v-for="(item, index) in list5km"
      :key="'markets5km-' + index"
      :class="'markets5km ' + fiterClass(index, item)"
      @mouseover="mouseOver(index)"
      @mouseleave="mouseLeave"
    >
      <span>{{ item.data.ridername }}</span>
      <div class="nums">
        {{ $isEmpty(item.data.dangqiandan) ? 0 : item.data.dangqiandan }}
      </div>

      <div class="xiangxi" v-if="actindex == index">
        <div class="name">
          {{ item.data.ridername }}
          <span style="color: red">{{ item.data.dangqiandan }}</span>
        </div>
        <div class="name">{{ item.data.phone }}</div>
        <div class="name" @click="goDetails(item.data)">详情</div>
      </div>
    </div>

    <!-- 标记点7km -->
    <div
      v-for="(item, index) in list7km"
      :key="'markets7km-' + index"
      :class="'markets7km ' + fiterClass(index, item)"
      @mouseover="mouseOver(index)"
      @mouseleave="mouseLeave"
    >
      <span>{{ item.data.ridername }}</span>
      <div class="nums">
        {{ Number(item.data.dangqiandan) + Number(item.data.yuyuedan) }}
      </div>

      <div class="xiangxi" v-if="actindex == index">
        <div class="name">
          {{ item.data.ridername }}
          <span style="color: red">{{ Number(item.data.dangqiandan) + Number(item.data.yuyuedan) }}</span>
        </div>
        <div class="name">{{ item.data.phone }}</div>
        <div class="name" @click="goDetails(item.data)">详情</div>
      </div>
    </div>
  </div>
</template>

<script>
export { default } from "./mapJs.js";
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 80px;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0 15px;
  .title {
    width: 100px;
    font-weight: bold;
  }
  .right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .fujin {
    display: flex;
    align-items: center;
    font-size: 14px;
    span {
      margin-right: 10px;
    }
  }
}
#myMap {
  width: 100%;
  height: 750px;
  text-align: center;
  // position: absolute;
}

.markets0km,
.markets1km,
.markets2km,
.markets3km,
.markets5km,
.markets7km {
  width: 80px;
  padding: 5px;
  font-size: 12px;
  background: #027aff;
  color: #fff;
  border-radius: 30px;
  text-align: center;
  position: relative;
  cursor: pointer;
  span {
    color: #fff;
    font-size: 12px;
  }
  .nums {
    position: absolute;
    right: -10px;
    top: -10px;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background: #027aff;
    color: #fff;
    border-radius: 50%;
    z-index: 10;
  }

  .xiangxi {
    position: absolute;
    left: -10px;
    top: -100px;
    width: 100px;
    height: 100px;
    background: #fff;
    z-index: 9;
    text-align: left;
    box-sizing: border-box;
    padding: 10px;
    div {
      font-size: 14px;
      color: #333;
      height: 30px;
    }
    .name:nth-of-type(2) {
      color: #999;
    }
    .name:last-of-type {
      color: #666;
    }
  }
}

.maract {
  box-shadow: 2px 2px 10px #027aff, -2px -2px 10px #027aff;
}

.blue {
  background: #027aff;
  .nums {
    background: #027aff;
  }
}
.blueact {
  box-shadow: 2px 2px 10px #027aff, -2px -2px 10px #027aff;
}

.yellow {
  background: #f4c304;
  .nums {
    background: #f4c304;
  }
}
.yellowact {
  box-shadow: 2px 2px 10px #f4c304, -2px -2px 10px #f4c304;
}

.green {
  background: #01cc00;
  .nums {
    background: #01cc00;
  }
}
.greenact {
  box-shadow: 2px 2px 10px #01cc00, -2px -2px 10px #01cc00;
}

.red {
  background: #ea5656;
  .nums {
    background: #ea5656;
  }
}
.redact {
  box-shadow: 2px 2px 10px #ea5656, -2px -2px 10px #ea5656;
}
</style>
