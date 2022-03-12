// 导入所有模块
const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const {writeLog} = require('./middleware/index')
// 导入路由文件
const userRouter = require('./router/user.js')
const cookieParser = require('cookie-parser')
// 创建服务器
const app = express()

// 使用中间件
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
// 使用全局中间件
app.use(writeLog)

// app.use可以过滤请求路径
// /api/v1/users/register   --  app.use('/api', 路由变量处理)
// 路由变量中，去匹配请求路径的时候  ---- router.post('/v1/users/register')
app.use('/api/v1/users', userRouter)

// 处理根请求
// app.get('/', (req, res) => {
//     throw new Error('处理错误')
//     res.send('首页')
// })

// 404中间件
app.use((req, res, next) => {
    let log = fs.readFileSync(path.join(__dirname, './logs/shop.log'), 'utf-8')
    // 截取后面部分
    let suffix = log.slice(log.length-4, log.length-2)
    if(suffix === 'ok'){
        // 截取
        log = log.slice(0, log.length-4) // 换行在服务器中表现为两个字符： \r\n
        // 后面拼接错误信息
        log += err + '\r\n'
    }else{
        // 后面拼接错误信息
        log += err + '\r\n'
    }
    // 将新的log写入文件中
    fs.writeFileSync(path.join(__dirname, './logs/shop.log'), log)
    res.status(404).json({
        code: 0,
        msg: '请求错误'
    })
})

// 异常处理中间件
app.use((err, req, res, next) => {
    let log = fs.readFileSync(path.join(__dirname, './logs/shop.log'), 'utf-8')
    // 截取后面部分
    let suffix = log.slice(log.length-4, log.length-2)
    if(suffix === 'ok'){
        // 截取
        log = log.slice(0, log.length-4) // 换行在服务器中表现为两个字符： \r\n
        // 后面拼接错误信息
        log += err + '\r\n'
    }else{
        // 后面拼接错误信息
        log += err + '\r\n'
    }
    // 将新的log写入文件中
    fs.writeFileSync(path.join(__dirname, './logs/shop.log'), log)
    res.status(404).json({
        code: 0,
        msg: '请求错误'
    })
})

// 监听端口
app.listen(12345, () => {
    console.log('server is running at http://localhost:12345');
})