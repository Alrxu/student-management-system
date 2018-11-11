const express = require('express')
const path = require('path')
//创建路由容器
const accoutRouter = express.Router()
// 导入注册控制器
const accoutCtrl = require(path.join(__dirname,'../controllers/accoutController'))
// accoutRouter.get('/register',accoutCtrl.getRegistorPage)
// 是下面的简写形式  accoutCtrl.getRegistorPage就是一个箭头函数

// 注册页面路由
accoutRouter.get('/register',(req,res)=>{
    accoutCtrl.getRegistorPage(req,res)
})
// 注册功能路由
accoutRouter.post('/register',(req,res)=>{
    accoutCtrl.registerPost(req,res)
})

// 登录页面路由
accoutRouter.get('/login',(req,res)=>{
    accoutCtrl.getLoginPage(req,res)
})

// 验证码路由
accoutRouter.get('/vcode',(req,res)=>{
    accoutCtrl.getVode(req,res)
})

// 登录功能路由
accoutRouter.post('/login',(req,res)=>{
    accoutCtrl.login(req,res)
})
//  导出
module.exports = accoutRouter