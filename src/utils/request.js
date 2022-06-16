import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getCookieJwt } from '@/utils/auth'
import qs from 'qs'
import DonMessage from '@/utils/message'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE, // url = base url + request url  process.env.VUE_APP_API_BASE
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 * 3 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // if (store.getters.jwt && store.getters.jwt !== "undefined"){
    //   // config.params.jwt = store.getters.jwt
    //   console.log(config,store.getters.jwt)
    // }
    config.method === 'post' ? config.data = qs.stringify(config.data) : config.params
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    console.log(res,'res')
    // if the custom code is not 20000, it is judged as an error.
    if(response.status === 200 && response.config.method === 'options'){
      return 'SUCCESS';
    }else{
      if (res.errcode !== 0) {
        // DonMessage.error(res.errmsg || '请求失败)
        // Message({
        //   message: res.errmsg || '请求失败',
        //   type: 'error',
        //   duration: 3 * 1000
        // })

        return res
        // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
        // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        //   // to re-login
        //   MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        //     confirmButtonText: 'Re-Login',
        //     cancelButtonText: 'Cancel',
        //     type: 'warning'
        //   }).then(() => {
        //     store.dispatch('user/resetToken').then(() => {
        //       location.reload()
        //     })
        //   })
        // }
        // return Promise.reject(new Error(res.errmsg || '请求失败'))
      } else {
        return res
      }
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
