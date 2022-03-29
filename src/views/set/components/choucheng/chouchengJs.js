import Pagination from "@/components/Pagination";
import { editMoban } from "@/api/set";
import { uploadimgtooss } from "@/utils/uploadoss.js"
import waves from "@/directive/waves"; // waves directive

export default {
    directives: { waves },
    components: { Pagination },
    props: {
        data: {
            type: Object, // 属性类型
            default: {} // 默认值
        },
        dataObj: {
            type: Object, // 属性类型
            default: {} // 默认值
        },
    },
    data() {
        return {
            key: "choucheng",
            alldata: {},
            city: {
                iskaiqi: 0,
                bili: 10,
                peisong: 1,
            },
            school: {
                iskaiqi: 0,
                bili: 10,
                peisong: 1,
            }
        };
    },
    mounted() {
        this.alldata = this.data;
        this.city = this.dataObj.city;
        this.school = this.dataObj.school;
        console.log('list--->>', this.dataObj);
        // this.list = [];
        // for (let key in this.dataObj) {
        //     this.list.push(this.dataObj[key]);
        // }
    },
    methods: {
        onSubmit() {
            this.city['bili'] = parseInt(this.city['bili']);
            this.city['iskaiqi'] = parseInt(this.city['iskaiqi']);
            this.city['peisong'] = parseInt(this.city['peisong']);
            this.school['bili'] = parseInt(this.school['bili']);
            this.school['iskaiqi'] = parseInt(this.school['iskaiqi']);
            this.school['peisong'] = parseInt(this.school['peisong']);
            var data = {};
            data[this.key] = {};
            data[this.key]['city'] = this.city;
            data[this.key]['school'] = this.school;
            editMoban(JSON.stringify(data)).then((res) => {
                if (res.errcode == 0) {
                    this.$message.success('保存成功');
                } else {
                    this.$message({
                        message: res.errmsg,
                        type: "error",
                    });
                }
            })
        }
    },
};