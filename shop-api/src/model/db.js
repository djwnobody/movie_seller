const mongoose = require('mongoose')
// 连接数据库 - 定义schema和model
mongoose.connect("mongodb://localhost:27017/taobao")
module.exports = mongoose