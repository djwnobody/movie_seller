// 需要定义路由模块处理
const express = require('express')
// 导入处理函数模块
const {register, login, userinfo} = require('../controllers/user')
const router = express.Router()
// 使用路由模块处理请求
// 这三个处理函数封装到一个模块中 - controllers
router.post('/register', register)
router.post('/login', login)
// router.get('/userinfo/:id', userinfo)
// 为了能让代理传送数据过来 - 修改
router.get('/userinfo', userinfo)

// 导出路由变量
module.exports = router
