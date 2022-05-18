import { timestampToTime } from '@/filters/index'
const OSS = require('ali-oss')
const stream = require('stream')
export function uploadimgtooss(file) {
    return new Promise(async (resolve, reject) => {
        const contentType = file['name'].split(".")[1];
        var bucket = 'bjxinzeyuan'
        var region = 'oss-cn-zhangjiakou'
        const client = new OSS({
            bucket: bucket,
            region: region,
            accessKeyId: 'LTAI5t85vubNJ4CYkDEtngcy',
            accessKeySecret: 'xbZacVl2m3uR5SFTQNtGRfFalo7wz2',
        });
        var timestamp = Date.parse(new Date())
        timestamp = Math.floor(timestamp / 1000)
        var chars = 'abcdefghijklmnopqrstuvwxyz12345678'
        var name = ""
        for (var i = 0; i <= 20; i++) {
            name += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        var fildername = timestampToTime(timestamp, 'YMD')
        console.log('fildername=====',fildername)
        fildername = fildername.replace(/(^\s*)|(\s*$)/g, "");
        console.log('fildername--------------',fildername)
        let result = await client.multipartUpload(fildername + '/' + timestamp + name + '.' + contentType, file.raw);
        var url = 'http://' + bucket + '.' + region + '.aliyuncs.com/' + result.name
        resolve(url);
    })
}


export function getBase64(file) {
    return new Promise(async (resolve, reject) => {
        let reader = new FileReader();
        let base64 = "";
        reader.readAsDataURL(file.raw);
        reader.onload = () => {
            base64 = reader.result;
        };
        reader.onerror = err => {
            reject(err);
        };
        reader.onloadend = () => {
            resolve(base64);
        };
    })
}
