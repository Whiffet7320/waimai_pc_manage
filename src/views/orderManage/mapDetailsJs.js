import { html2Text } from "@/utils";
import AMapLoader from "@amap/amap-jsapi-loader";
import { getMapDetails, dispatchOrder } from "@/api/order";
export default {
    components: {},
    data() {
        return {
            query: {},
            amap: {},
            mapObj: {},
            quhuoicon: require('../../assets/image/q_icon.png'),
            shouhuoicon: require('../../assets/image/s_icon.png'),
            datamap: {
                "orderlon": "121.518515",
                "orderlat": "38.861208",
                "userlon": "121.518515",
                "userlat": "38.861208",
                "qishouname": "李刚剑",
                "dangqiandan": "1",
                "yuyuedan": "1",
                "destinationlist": [
                    {
                        "id": "901",
                        "phone": "13212345678",
                        "lon": "121.556868",
                        "lat": "38.919459",
                        "juli": "9871"
                    }
                ]
            },
        };
    },
    created() {
        console.log(this.$route.query);
        this.query = this.$route.query;
    },
    mounted() {
        this.getLst();
        // this.getGis();
    },
    methods: {
        refresh() { // 刷新
            this.$router.go(0);
        },
        getLst() {
            getMapDetails(this.query).then((res) => {
                this.datamap = res.data;
                this.getGis();
            });
        },
        zhipai() {
            console.log(this.datamap);
            dispatchOrder(this.query).then((res) => {
                this.$message({
                    message: '指派成功',
                    type: "success"
                });
            });
        },
        mouseOver(index) {
            console.log('移入');
            this.actindex = index;
        },
        mouseLeave() {
            console.log('移出');
            this.actindex = -1;
        },
        goDetails(item) {
            console.log('item---->>', item);
        },
        getGis() {
            // console.log(this.orderdata);
            AMapLoader.load({
                //注册开发者/创建应用，选择web端JS API（必须）
                key: '48e97ce3ebd6c788374a5b019c1be6fd', //首次load必填
                version: '1.4.15',
                AMapUI: {
                    version: '1.1',
                    plugins: ['overlay/SimpleMarker']
                },
                Loca: {
                    version: '1.3.2'
                },
                plugins: [
                    "AMap.Driving", // 驾车出行
                    "AMap.Riding", // 骑行出行
                    "AMap.Geolocation", // 定位
                    "AMap.Autocomplete", // 输入提示插件
                    "AMap.PlaceSearch", // POI搜索插件
                    "overlay/SimpleMarker",
                ],
            }).then((AMap) => {
                this.amap = AMap;
                this.initMap();

            }).catch((e) => {
                console.error(e);
            });
        },
        initMap() {
            let that = this;

            let locationIcon = {
                showButton: false, //是否显示定位按钮
                buttonPosition: "RB", //定位按钮的位置
                /* LT LB RT RB */
                buttonOffset: new AMap.Pixel(10, 50), //定位按钮距离对应角落的距离
                showMarker: false, //是否显示定位点
                showCircle: true, //是否显示定位精度圈
                circleOptions: {
                    //定位精度圈的样式
                    strokeColor: "#0093FF",
                    noSelect: true,
                    strokeOpacity: 0.5,
                    strokeWeight: 1,
                    fillColor: "#02B0FF",
                    fillOpacity: 0.25,
                },
            };

            that.mapObj = new this.amap.Map("myMap", {
                // container为容器的id
                resizeEnable: true,
                zoom: 12, //初始化地图层级
                center: [this.datamap.userlon, this.datamap.userlat],
            });

            // 添加骑手位置
            var shopMarker = new AMap.Marker({
                position: [this.datamap.userlon, this.datamap.userlat],
                offset: new AMap.Pixel(-10, -10),
                topWhenClick: true, // 鼠标点击时marker是否置顶
                content: document.getElementsByClassName('markets')[0],
            });
            that.mapObj.add(shopMarker);

            // 添加发货位置
            var shopMarker = new AMap.Marker({
                position: [this.datamap.orderlon, this.datamap.orderlat],
                offset: new AMap.Pixel(-10, -10),
                topWhenClick: true, // 鼠标点击时marker是否置顶
                content: '<img src="' + this.quhuoicon + '" style="width:23px;height:23px;" />',
            });
            that.mapObj.add(shopMarker);

            // 实例化一个定位
            let geolocation = new AMap.Geolocation(locationIcon);
            this.mapObj.addControl(geolocation);
            geolocation.getCurrentPosition();

            // 成功后回调
            AMap.event.addListener(geolocation, "complete", function (data) {
                if (data.info === "SUCCESS") {
                    console.log(data) // 这里是定位成功后的输出数据
                }
            });
            // 失败回调
            AMap.event.addListener(geolocation, "error", function (data) {
                alert("获取当前定位失败");
            });


            // 取送货  地点规划
            let quhuoopsition = new AMap.LngLat(this.datamap.orderlon, this.datamap.orderlat);
            let shlist = this.datamap.destinationlist;
            let songhuoArr = [];
            for (var i = 0; i < shlist.length; i++) {
                let obj = new AMap.LngLat(shlist[i].lon, shlist[i].lat);
                songhuoArr.push(obj);
            }

            // 路线规划
            let drivingOption = {
                map: this.mapObj,
                policy: AMap.DrivingPolicy.LEAST_TIME,
                hideMarkers: true, // 隐藏起始点图标
            };

            this.drivingObj = new AMap.Driving(drivingOption); //构造驾车导航类
            // 途径地点
            let tujing = songhuoArr.slice(0, songhuoArr.length - 1);
            // 。search规划路线（起点，终点），【途径1，途径2，途径3】，回调
            this.drivingObj.search(quhuoopsition, songhuoArr[songhuoArr.length - 1], {
                ...tujing
            },
                function (status, result) {

                    // 添加收货market

                    for (var i = 0; i < shlist.length; i++) {
                        // 添加收货位置
                        var marker = new AMap.Marker({
                            position: [shlist[i].lon, shlist[i].lat],
                            offset: new AMap.Pixel(-10, -10),
                            content: '<img src="' + that.shouhuoicon + '" style="width:23px;height:23px;" />',
                            topWhenClick: true, // 鼠标点击时marker是否置顶
                        });
                        that.mapObj.add(marker);
                    }

                    // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
                    if (status === 'complete') {
                        // log.success('绘制驾车路线完成')
                        console.log('绘制驾车路线完成')
                    } else {
                        console.log('获取驾车数据失败' + result)
                    }

                });
        },
    },
};