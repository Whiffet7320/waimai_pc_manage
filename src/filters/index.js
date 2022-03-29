// import parseTime, formatTime and set to filter
export { parseTime, formatTime } from '@/utils'

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function splitStr(str, num) {
  return str.length > num ? Array.from(str).slice(0, num).join('') : str;
}
/**
 * 时间戳转时间
 * @param {*} timestamp
 * @returns
 */

 export function timestampToTime(timestamp, type) {
  var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
  var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
  var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  if (type == 'YMD') {
    return Y + M + D;
  }
  return Y + M + D + h + m + s;
}


export function formatConversion(te) {
  if (te == '') {
    return '';
  } else if ((te + '').length == 10) {
    var time = new Date(te * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var y = time.getFullYear();
    var m = time.getMonth() < 9 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
    var d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
    var h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
    var mm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
    var s = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
    var timedate = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
    return timedate;
  } else {
    var time = new Date(te);
    var y = time.getFullYear();
    var m = time.getMonth() < 9 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
    var d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
    var h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
    var mm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
    var s = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
    var timedate = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
    return timedate;
  }
}

export function orderStatus(status) {
  status = status.toString();
  switch (status) {
    case "0":
      return "待付款";
    case "1":
      return "待接单";
    case "2":
      return "待取货";
    case "3":
      return "配送中";
    case "4":
      return "已完成";
    case "5":
      return "已取消";
    default:
      return "暂无状态";
  }
}

export function filterJuli(nums) {
  nums = Number.parseInt(nums);
  if (nums > 1000) {
    return (nums / 1000).toFixed(1) + 'km';
  } else {
    return nums + 'm';
  }
}

export function filterNull(data) {
  return data == null || data == '' ? 0 : data;
}

export function filterTwoNums(data) {
    data = parseFloat(data);
    return data.toFixed(2);
  }

export function filterSimpleStatus(status) {
    status = status.toString();
    switch (status) {
      case "0":
        return "否";
      case "1":
        return "是";
      default:
        return "否";
    }
  }
