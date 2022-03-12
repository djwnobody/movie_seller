// 导入mongoose
const mongoose = require('./db')
// 创建user表的schema
const userSchema = new mongoose.Schema({
    // 规定user表中的数据和类型
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    nickname: String,
    age: Number,
    email: String
})
// 创建model
const userModel = mongoose.model('user', userSchema)
module.exports = userModel