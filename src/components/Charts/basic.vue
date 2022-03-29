<template>
       <div id="myChart" :style="{width: '100%', height: '400px'}"></div>
</template>
<script>
import echarts from 'echarts'
export default {
    props:{
        chartData1:{
            type:Array,
            require:true
        }
    },
        data() {
            return {

            }
        },
        mounted(){
            console.log(this.chartData1,'0000000')
            this.draw();
        },
        methods: {
            draw(){
                let  myChart = echarts.init(document.getElementById("myChart"))
                var option = {
                    title: {
                        text: '近七周内用户注册情况图'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data: [ '用户注册量']
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        left: '5%',
                        right: '0%',
                        bottom: '3%',
                        containLabel: true,
                        width:'80%',
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: [ '前六周', '前五周','前四周', '前三周', '前两周', '前一周', '当前周']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [

                        {
                            name: '用户注册量',
                            type: 'line',
                            stack: '总量',
                            color: '#6fbae1',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            areaStyle: {},
                            data: this.chartData1
                        }
                    ]
                };
                window.onresize = myChart.resize;
                myChart.setOption(option);
            }
        }
    }
</script>
