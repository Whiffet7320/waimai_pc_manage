import request from '@/utils/request'
import { getRequestUrl, getRequest } from '@/utils/http'

export function getBase64(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        let imageUrl = "";
        reader.readAsDataURL(file);
        reader.onload = () => {
            imageUrl = reader.result;
        };
        reader.onerror = err => {
            reject(err);
        };
        reader.onloadend = () => {
            resolve(imageUrl);
        };
    });
}

export function upload(data) {
  return getRequest({
    url: getRequestUrl('/server/img/upload'),
    method: 'post',
    data
  })
}

export function getmap(){
    return getRequest({
        url: getRequestUrl('https://restapi.amap.com/v3/staticmap?markers=-1,https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png,0:120.635399,27.966388&key=db02839d3d4b5cd28ca4f5d631d303db'),
        method: 'get',
      })
}
