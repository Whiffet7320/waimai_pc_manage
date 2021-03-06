module.exports = {
    proxy: {
        '/server': {
            target: 'http://127.0.0.1:18888', // 接口域名
            secure: false, // 如果是https接口，需要配置这个参数
            changeOrigin: true, //是否跨域
            pathRewrite: {
                '^/server': '' //需要rewrite的,
            }
        }
    }
}
