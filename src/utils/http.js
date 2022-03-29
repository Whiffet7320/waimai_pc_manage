import store from '@/store'
import request from '@/utils/request'

function beforeRequest(url){
  return request({
    url: url,
    method: 'options',
  })
}

export function getRequest(params){
  return new Promise((resolve, reject) => {
    beforeRequest(params.url).then(optionsRes => {
      if(optionsRes === 'SUCCESS'){
        resolve(optionsRes);
      }else{
        reject('options fail....');
      }
    })
  }).then(optionsRes => {
    if(optionsRes == 'SUCCESS'){
      return request(params);
    }
  }).catch(error => {
      reject(error)
  })
}

export function getRequestUrl(route, params) {
    var url = route;
    if (store.getters.jwt && store.getters.jwt !== "undefined"){
      var urlParams = {
        jwt: store.getters.jwt,
      };
    }else{
      var urlParams = {}
    }
    if (typeof params == 'object') {
      for (var i in params) {
        urlParams[i] = params[i];
      }
    }
    if (Object.keys(urlParams).length == 0) {
      return url;
    }
    var wp = url.search(/\?/i);
    if (wp == -1) {
      return url + '?' + parseParams(urlParams);
    } else {
      if ((wp + 1) == url.length) {
        return url + parseParams(urlParams);
      } else {
        return url + ((url.search(/&/i) + 1) == url.length ? '' : '&') + parseParams(urlParams);
      }
    }
}

function parseParams(param, key, encode) {
    if (param == null) return '';
    var paramStr = [];
    var t = typeof (param);
    if (t == 'string' || t == 'number' || t == 'boolean') {
      paramStr.push(key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param));
    } else {
      for (var i in param) {
        var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
        paramStr.push(parseParams(param[i], k, encode));
      }
    }
    return paramStr.join('&');
  }

