<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  name: "PieChart",
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    types: {
      type: Array,
      default: {}
    }
  },
  data() {
    return {
      chart: null,
    }
  },

  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    
    initChart(types) {
      var data = [];
      for(var i = 0; i < types.length; i++){
          if(types[i]._id == 1){
              data.push({value:types[i].value, name:'100以下'})
          }else if(types[i]._id == 2){
              data.push({value:types[i].value, name:'100-200'})
          }else if(types[i]._id == 3){
              data.push({value:types[i].value, name:'200-300'})
          }else if(types[i]._id == 4){
              data.push({value:types[i].value, name:'300-500'})
          }else if(types[i]._id == 5){
              data.push({value:types[i].value, name:'500-1000'})
          }else if(types[i]._id == 6){
              data.push({value:types[i].value, name:'1000-2000'})
          }else if(types[i]._id == 7){
              data.push({value:types[i].value, name:'2000-5000'})
          }else if(types[i]._id == 8){
              data.push({value:types[i].value, name:'5000-1万'})
          }else if(types[i]._id == 8){
              data.push({value:types[i].value, name:'1万-2万'})
          }else if(types[i]._id == 10){
              data.push({value:types[i].value, name:'2万-3万'})
          }else if(types[i]._id == 11){
              data.push({value:types[i].value, name:'3万-5万'})
          }else if(types[i]._id == 12){
              data.push({value:types[i].value, name:'5万以上'})
          }
          
      }
       console.log(1231231);
      console.log(data);
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['100以下', '100-200', '200-300', '300-500', '500-1000', '1000-2000', '2000-5000', '5000-1万', '1万-2万', '2万-3万', '3万-5万', '5万以上']
        },
        series: [
          {
            name: '手机号数量比例',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: data,
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
