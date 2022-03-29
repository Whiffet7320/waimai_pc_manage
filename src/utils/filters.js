export default (Vue)=>{
    Vue.filter("formatDate", (time, format = 'YYYY-MM-DD HH:mm:ss') => {
        if(!time) return
        const date = new Date(time * 1000) // 如果时间戳为10位不需要 * 1000
        const year = date.getFullYear()
        const month = ("0" + (date.getMonth() + 1)).slice(-2)
        const sDate = ("0" + date.getDate()).slice(-2)
        const hour = ("0" + date.getHours()).slice(-2)
        const minute = ("0" + date.getMinutes()).slice(-2)
        const second = ("0" + date.getSeconds()).slice(-2)

        const weeks = ['周日','周一','周二','周三', '周四', '周五', '周六']
        if (format === 'YYYY-MM-DD') return `${year}/${month}/${sDate}`
        else if (format === 'HH:mm') return `${hour}:${minute}`
        else if (format === 'week') return weeks[date.getDay()]
        return `${year}-${month}-${sDate}  ${hour}:${minute}:${second}`
    })
}
