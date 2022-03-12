// 导入文件
const fs = require('fs')
const path = require('path')
const jsonwebtoken = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const goodsModel = require('../model/goods')
// 读取secret
const salt = fs.readFileSync(path.join(__dirname, '../../.env'), 'utf-8')

module.exports = {
    // 处理注册逻辑的函数
    getList: (req, res) => {
        // 查询数据并响应
    }
}