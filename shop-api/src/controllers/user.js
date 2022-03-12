// 导入文件
const fs = require('fs')
const path = require('path')
const jsonwebtoken = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const userModel = require('../model/user')

// 读取secret
const salt = fs.readFileSync(path.join(__dirname, '../../.env'), 'utf-8')

module.exports = {
    // 处理注册逻辑的函数
    register: (req, res) => {
        // 规定用户提交必须携带username和password
        let {username, password} = req.body
        // 判断用户是否传送了数据
        if(!username || !password) {
            res.json({
                code: 2,
                msg: '数据中必须包含username和password'
            })
        }
        // 利用userModel - 验证用户名是否被占用
        userModel
            .findOne({username})
            .then(ret => {
                // 判断ret是否有数据
                // 没有数据，ret是null，有数据的时候，ret是对象
                // console.log(ret);
                if(!ret) {
                    // 给密码加密
                    password = bcryptjs.hashSync(password, 10)
                    // 新增数据
                    userModel
                        .insertMany({username, password})
                        .then(ret => {
                            // 注册成功
                            res.json({
                                code: 1,
                                msg: '注册成功'
                            })
                        }).catch(err => {
                            // 注册失败
                            res.json({
                                code: 3,
                                msg: '注册失败'
                            })
                        })
                }else{
                    // 用户名被占用了
                    res.json({
                        code: 4,
                        msg: '用户名被占用了'
                    })
                }
            }).catch(err => {
                res.json({
                    code: 3,
                    msg: '注册失败'
                })
            })
        // res.send('注册接口')
    },
    // 处理登录的逻辑函数
    login: (req, res) => {
        // 解构用户名和密码
        let {username, password} = req.body
        // 判断是否传递了username和password
        if(!username || !password) {
            res.json({
                code: 2,
                msg: '缺失了username或password的参数'
            })
        }
        // 验证用户名和密码
        // 先验证用户名 - 到数据库中查询用户是否存在
        userModel
            .findOne({username})
            .then(ret => {
                // 查到用户名
                if(ret) {
                    // console.log(ret);
                    // 验证密码
                    let bool = bcryptjs.compareSync(password, ret.password)
                    if(bool) { // 验证通过
                        // 签发令牌 - 响应用户id
                        let token = jsonwebtoken.sign({userId: ret._id, __v: ret.__v, time: +new Date()+3600*1000}, salt)
                        res.json({
                            code: 1,
                            msg: '登录成功',
                            token,
                            userId: ret._id
                        })
                        // res.cookie('username', ret.username, {
                        //     maxAge: 3600*1000
                        // })
                    }else{
                        res.json({
                            code: 3,
                            msg: '用户名或密码错误'
                        })
                    }
                }else{
                    // 没有查到用户名
                    res.json({
                        code: 3,
                        msg: '用户名或密码错误'
                    })
                }
            }).catch(err => {
                res.json({
                    code: 3,
                    msg: '用户名或密码错误'
                })
            })
    
        // res.send('登录接口')
    },
    // 获取用户信息的逻辑的函数
    userinfo: (req, res) => {
        // 先获取请求的地址中的id
        // console.log(req.params);
        // 用？传递的数据，使用req.query接收，用restful风格传递的数据，使用req.params
        // let {id} = req.params // 不是动态传参，不用pramas
        let {id} = req.query // 使用?传参的，使用query接收
        // 判断id是否传递
        if(!id) {
            res.json({
                code: 2,
                msg: '缺失id数据'
            })
        }
        // 需要验证令牌
        let token = req.headers.authorization
        // 判断token是否存在
        if(!token){
            res.json({
                code: 2,
                msg: '缺失令牌'
            })
        }
        // 判断令牌是否有效
        jsonwebtoken.verify(token, salt, (err, decode) => {
            if(err) {
                res.json({
                    code: 3,
                    msg: '令牌无效'
                })
            }
            // console.log(1);
            // 能解开令牌，也要判断令牌是否在有效期内
            if(decode.time >= +new Date()) {
                // console.log(2);
                // 有效
                // 查询数据
                userModel
                    .findOne({_id: id})
                    .then(ret => {
                        // console.log(4);
                        if(ret) {
                            // 获取到数据
                            res.json({
                                code: 1,
                                msg: '用户数据获取成功',
                                data: {
                                    username: ret.username,
                                    userId: ret._id,
                                    nickname: ret.nickname,
                                    age: ret.age,
                                    email: ret.email
                                }
                            })
                        }else{
                            res.json({
                                code: 4,
                                msg: '数据获取失败'
                            }) 
                        }
                    }).catch(err => {
                        // console.log(5);
                        res.json({
                            code: 4,
                            msg: '数据获取失败'
                        })
                    })
    
            }else{
                // console.log(3);
                res.json({
                    code: 3,
                    msg: '令牌无效'
                })
            }
        })
        // 根据id到数据库中查询用户信息
        // res.send('获取用户信息')
    },
    
}