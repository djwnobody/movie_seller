const {EOL} = require('os')
const moment = require('moment')
const path = require('path')
const fs = require('fs')
module.exports = {
    writeLog: (req, res, next) => {
        // 定义好要写的内容
        // 时间
        let time = moment().format("YYYY-MM-DD HH:mm:ss") + ' '
        // ip
        let ip = req.ip + ' '
        // 请求方式
        let method = req.method + ' '
        // 请求路径
        let url = req.url + ' 状态：ok' + EOL
        // 组合内容
        let content = time + ip + method + url
        // 追加到一个文件中
        let uri = path.join(__dirname, '../logs/shop.log')
        // console.log(uri);
        fs.appendFileSync(uri, content, 'utf-8')
        next()
    }
}