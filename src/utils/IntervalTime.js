export function intervaltime(endTime) {

    let startTime = new Date().getTime()

    let date = startTime - endTime

    let timestamp = new Date(date); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = timestamp.getFullYear() ;
    let M = (timestamp.getMonth()  ) ;
    let D = (timestamp.getDate() ) ;
    let h = (timestamp.getHours() ) ;
    let m = (timestamp.getMinutes() ) ;
    let s = timestamp.getSeconds();

    // console.log(Y,M,D,h,m)
    if(M > 0 && D > 0) {
        return M + '个月' + D + '天前'
    }
    if (D > 0 && h == 0) {
        return D + '天前'
    }
    if (D > 0 && h > 0) {
        return D + '天' + h + "小时前"
    }
    if (D == 0 && h == 0 && m > 0) {
        return m + '分钟前'
    }
    if (D < 0 && h > 0 && m > 0) {
        return h + "小时" + m + '分钟前'
    }


    // return D + '天' + h + "小时" + m + '分钟'
}