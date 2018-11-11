const express = require('express')
const path = require('path')
const app = express()
const session = require('express-session')

// 集成中间件

// 配置 express-session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))

// 配置 body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 配置art-template
app.engine('html', require('express-art-template'));

// 公开静态资源
 app.use(express.static(path.join(__dirname,'statics')))

// 权限控制
// 不论发送什么请求,全部拦截下来,对请求进行分类
app.all('*',(req,res,next)=>{
    // 如果一级路径是 accout 表示是登陆注册的请求 pass进入处理
    // 如果不是,就判断session中有没有保存该用户名  即是否已登陆
    if(req.url.includes('accout')){
        next()
    }else{
        if(req.session.admin){
            next()
        }else{
            res.send('<script>alert("用户还未登录,请登录");window.location.href="/accout/login"</script>')
            
        }
    }
})


 // 导入登录用户信息路由容器
 const accoutRouter = require(path.join(__dirname,'routers/accoutRouter.js'))
 // 导入学生信息路由容器
 const studentmanageRouter = require(path.join(__dirname,'routers/studentmanageRouter.js'))

//挂载路由容器 /accout 一级请求路径
app.use('/accout',accoutRouter)
// 挂载学生信息路由容器
app.use('/studentmanage',studentmanageRouter)

// 绑定端口号,开启服务
app.listen(8090,'127.0.0.1',err=>{
     if(err){
         console.log(err)
         return
     }
     console.log('start ok!');
 })