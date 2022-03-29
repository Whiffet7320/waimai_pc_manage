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
            key: "kaiping",
            alldata: {},
            user: {
                iskaiqi: 0,
                imgsrc: '',
            },
            rider: {
                iskaiqi: 0,
                imgsrc: '',
            },
        };
    },
    mounted() {
        this.alldata = this.data;
        this.user = this.dataObj.user;
        this.rider = this.dataObj.rider;
        console.log('list--->>', this.dataObj);
        // this.list = [];
        // for (let key in this.dataObj) {
        //     this.list.push(this.dataObj[key]);
        // }
    },
    methods: {
        // 上传缩略图
        handleImgSuccess(file, type) {
            uploadimgtooss(file).then((res) => {
                console.log(res)
                this[type].imgsrc = res;
            })
        },
        onSubmit() {
            this.alldata[this.key]['user'] = this.user;
            this.alldata[this.key]['rider'] = this.rider;
            var data = {};
            data[this.key] = {};
            data[this.key]['user'] = this.user;
            data[this.key]['rider'] = this.rider;
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