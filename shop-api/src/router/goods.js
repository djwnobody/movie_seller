// 需要定义路由模块处理
const express = require('express')
// 导入处理函数模块
const {getList} = require('../controllers/goods')
const router = express.Router()
// 使用路由模块处理请求
// 这三个处理函数封装到一个模块中 - controllers
router.get('/getlist', getList)

// 导出路由变量
module.exports = router
