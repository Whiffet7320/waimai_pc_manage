import { html2Text } from "@/utils";
import AMapLoader from "@amap/amap-jsapi-loader";
import { getOrderQishou } from "@/api/order";

export default {
    components: {},
    data() {
        return {
            query: {},
            amap: {},
            mapObj: {},
            node: null,
            actindex: - 1,
            tabPosition: "0",
            tabtype: "2",
            list: [{
                "id": "752997",
                "phone": "1",
                "ridername": "李刚兼",
                "iszhuanzhi": "0",
                "lon": "116.407394",
                "lat": "39.904211",
                "juli": "1000",
                "dangqiandan": "3",
            }, {
                "id": "752997",
                "phone": "1",
                "ridername": "李刚兼",
                "iszhuanzhi": "0",
                "lon": "121.518515",
                "lat": "38.861208",
                "juli": "2000",
                "dangqiandan": "1",
            }, {
                "id": "752997",
                "phone": "1",
                "ridername": "李刚专",
                "iszhuanzhi": "1",
                "lon": "106.551643",
                "lat": "29.562849",
                "juli": "3000",
                "dangqiandan": "0",
            }, {
                "id": "752997",
                "phone": "1",
                "ridername": "李刚兼",
                "iszhuanzhi": "0",
                "lon": "113.543028",
                "lat": "22.186835",
                "juli": "5000",
                "dangqiandan": "0",
            }, {
                "id": "752997",
                "phone": "1",
                "ridername": "李刚专",
                "iszhuanzhi": "1",
                "lon": "113.26641",
                "lat": "23.132324",
                "juli": "7000",
                "dangqiandan": "0",
            }],
            list0km: [],
            list1km: [],
            list2km: [],
            list3km: [],
            list5km: [],
            list7km: [],
            listjiankm: [],
            listzhuankm: [],
            markets0km: [],
            markets1km: [],
            markets2km: [],
            markets3km: [],
            markets5km: [],
            markets7km: [],
            marketsjiankm: [],
            marketszhuankm: [],
        };
    },
    created() {
        this.query = this.$route.query;
    },
    mounted() {
        this.getLst();
    },
    methods: {
        fiterClass(index, item) {
            if (this.$isEmpty(item.data.dangqiandan)) {
                if (item.data.iszhuanzhi == '1') {
                    if (index == this.actindex) {
                        return 'blue blueact';
                    } else {
                        return 'blue';
                    }
                } else {
                    if (index == this.actindex) {
                        return 'green greenact';
                    } else {
                        return 'green';
                    }
                }
            } else if (Number(item.data.dangqiandan) < 3 && Number(item.data.dangqiandan) > 0) {
                if (index == this.actindex) {
                    return 'yellow yellowact';
                } else {
                    return 'yellow';
                }
            } else {
                if (index == this.actindex) {
                    return 'red redact';
                } else {
                    return 'red';
                }
            }


        },
        refresh() { // 刷新
            this.$router.go(0);
        },
        handleClick(tab) {
            console.log(tab);
            var arr = ["0", "1", "2", "3", "5", "7"];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] != tab) {
                    var key = 'markets' + arr[i] + 'km';
                    var marketlist = this[key];
                    for (var j = 0; j < marketlist.length; j++) {
                        marketlist[j]['market'].hide();
                    }
                }
            }
            var marketlist = this['markets' + tab + 'km'];
            for (var i = 0; i < marketlist.length; i++) {
                marketlist[i]['market'].show();
            }
        },
        typeClick(tab) {
            console.log('tab--->>', tab);
            if (tab != "2") {
                var marketlist = this['markets' + this.tabPosition + 'km'];
                for (var i = 0; i < marketlist.length; i++) {
                    marketlist[i]['market'].show();
                    if (marketlist[i]['key'] != tab) {
                        marketlist[i]['market'].hide();
                    }
                }
            } else {
                var marketlist = this['markets' + this.tabPosition + 'km'];
                for (var i = 0; i < marketlist.length; i++) {
                    marketlist[i]['market'].show();
                }
            }
        },
        addMarkets() {
            // 隐藏其余
            var arr = ["0", "1", "2", "3", "5", "7"];

            for (var i = 0; i < arr.length; i++) {
                var list = this['list' + arr[i] + 'km'];
                var marketlist = this['markets' + arr[i] + 'km'];
                var marketclass = 'markets' + arr[i] + 'km';
                console.log('list--->>', list);
                for (var j = 0; j < list.length; j++) {
                    console.log('list[j]--->>', list[j]);
                    var market = new AMap.Marker({
                        position: [list[j]['data']['lon'], list[j]['data']['lat']],
                        offset: new AMap.Pixel(-10, -10),
                        content: document.getElementsByClassName(marketclass)[j],
                        topWhenClick: true, // 鼠标点击时marker是否置顶
                    });
                    this.mapObj.add(market);
                    var json = {
                        'key': list[j]['key'],
                        'market': market,
                    };
                    marketlist.push(json);
                }
                if (i > 0) {
                    for (var k = 0; k < marketlist.length; k++) {
                        marketlist[k]['market'].hide();
                    }
                }
            }

        },
        getLst() {
            getOrderQishou(this.query).then((res) => {
                console.log(res);
                this.list = res.data.list;
                for (var i = 0; i < this.list.length; i++) {
                    if (Number(this.list[i]['juli']) <= 1000) {
                        var json = {
                            'key': this.list[i]['iszhuanzhi'],
                            'data': this.list[i]
                        }
                        this.list1km.push(json);
                        this.list0km.push(json);
                    }
                    if (Number(this.list[i]['juli']) > 1000 && Number(this.list[i]['juli']) <= 2000) {
                        var json = {
                            'key': this.list[i]['iszhuanzhi'],
                            'data': this.list[i]
                        }
                        this.list2km.push(json);
                        this.list0km.push(json);
                    }
                    if (Number(this.list[i]['juli']) > 2000 && Number(this.list[i]['juli']) <= 3000) {
                        var json = {
                            'key': this.list[i]['iszhuanzhi'],
                            'data': this.list[i]
                        }
                        this.list3km.push(json);
                        this.list0km.push(json);
                    }
                    if (Number(this.list[i]['juli']) > 3000 && Number(this.list[i]['juli']) <= 5000) {
                        var json = {
                            'key': this.list[i]['iszhuanzhi'],
                            'data': this.list[i]
                        }
                        this.list5km.push(json);
                        this.list0km.push(json);
                    }
                    if (Number(this.list[i]['juli']) > 5000 && Number(this.list[i]['juli']) <= 7000) {
                        var json = {
                            'key': this.list[i]['iszhuanzhi'],
                            'data': this.list[i]
                        }
                        this.list7km.push(json);
                        this.list0km.push(json);
                    }
                    if (Number(this.list[i]['juli']) > 7000) {
                        var json = {
                            'key': this.list[i]['iszhuanzhi'],
                            'data': this.list[i]
                        }
                        this.list0km.push(json);
                    }
                }
                this.getGis();
            });
        },
        mouseOver(index) {
            this.actindex = index;
        },
        mouseLeave() {
            this.actindex = -1;
        },
        goDetails(item) {
            console.log(this.query.orderid);
            console.log(item);
            this.$router.push({
                path: '/orderManage/mapDetails',
                query: {
                    id: this.query.orderid,
                    uid: item.id
                }
            });
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
                showMarker: true, //是否显示定位点
                // markerOptions: {
                // 	//自定义定位点样式，同Marker的Options
                // 	offset: new AMap.Pixel(-18, -36),
                // 	content: '<img src="../../static/logo.png" style="width:36px;height:36px"/>',
                // },
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
                center: [this.query.lon, this.query.lat],
            });
            // 添加商家位置
            var shopMarker = new AMap.Marker({
                position: [this.query.lon, this.query.lat],
                offset: new AMap.Pixel(-10, -10),
                topWhenClick: true, // 鼠标点击时marker是否置顶
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

            this.addMarkets();

            // for (var i = 0; i < this.list.length; i++) {
            //     // 添加标记
            //     var marker = new AMap.Marker({
            //         position: [this.list[i].lon, this.list[i].lat],
            //         offset: new AMap.Pixel(-10, -10),
            //         content: document.getElementsByClassName('markets')[0],
            //         topWhenClick: true, // 鼠标点击时marker是否置顶
            //     });
            //     that.mapObj.add(marker);
            // }


        },
    },
};