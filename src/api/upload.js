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

