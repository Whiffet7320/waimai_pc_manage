import Pagination from "@/components/Pagination";
import { getpingjia } from "@/api/order";
import waves from "@/directive/waves"; // waves directive

export default {
    name: "Userlist",
    directives: { waves },
    components: { Pagination },
    data() {
        return {
            // 筛选条件
            listQuery: {
                page: 1,
                limit: 10,
                total: 0,
                starnum: "0",
                id: "",
                nickname: "",
            },
            starList: [
                {
                    "id": 1,
                    "name": "1星",
                    "value": false,
                },
                {
                    "id": 2,
                    "name": "2星",
                    "value": false,
                },
                {
                    "id": 3,
                    "name": "3星",
                    "value": false,
                },
                {
                    "id": 4,
                    "name": "4星",
                    "value": false,
                },
                {
                    "id": 5,
                    "name": "5星",
                    "value": false,
                },
            ],
            list: [],
        };
    },
    created() {
        this.resetpage();
    },
    methods: {
        resetpage() {
            this.listQuery.page = 1;
            this.getList();
        },
        getList() {
            getpingjia(this.listQuery).then((res) => {
                if (res.errcode == 0) {
                    this.list = res.data.list;
                    this.listQuery.total = res.data.count;
                    this.listLoading = false;
                } else {
                    this.$message({
                        message: res.errmsg,
                        type: "error",
                    });
                }
            });
        },
        starchange(item) {
            item.value = !item.value;
        },
        handleFilter() {
            var str = "";
            for (var i = 0; i < this.starList.length; i++) {
                if (this.starList[i].value) {
                    str += this.starList[i].id
                }
            }
            this.listQuery['starnum'] = str;
            console.log(this.listQuery);
            this.resetpage();
        }
    },
};