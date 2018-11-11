// 注册控制器
const path = require('path')
// 导入captchapng
const captchapng = require('captchapng')
// 导入数据库操作模块
const databasetool = require(path.join(__dirname,'../tools/databaseTool.js'))

exports.getRegistorPage = (req, res) => {
    // res.sendFile() 原封不动的读取文件
    res.sendFile(path.join(__dirname, '../statics/views/register.html'))
}

exports.registerPost = (req, res) => {
    // 准备提示信息
    const result = {
        status: 0,
        message: "注册成功!"
    }
    // 获取到post请求参数
    const params = req.body
    databasetool.findOne('accoutInfo',{username: params.username},(err,docs)=>{
        if (docs != null) {
            // 表示用户名存在
            result.status = 1
            result.message = "用户名已存在!"
            // 将result转为字符串格式返回
            res.json(result)
        } else {
            databasetool.insert('accoutInfo',params,(err,result1)=>{
                // 如果插入数据失败,修改提示信息关闭数据库并返回数据
                if (err) {
                    result.status = 2
                    result.message = "注册失败!"
                    res.json(result)
                }
                res.json(result)
            })
        }
    })
}

exports.getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../statics/views/login.html'))
}

exports.getVode = (req, res) => {
    // 把验证码的随机数存起来
    const vcode = parseInt(Math.random() * 9000 + 1000)
    req.session.vcode = vcode
    var p = new captchapng(80, 30, vcode); // width,height,numeric captcha
    p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}

exports.login = (req, res) => {
    // 准备提示信息
    const result = {
        status: 0,
        message: "登录成功!"
    }
    // 登录,获取到post请求体参数 username password vcode
    const params = req.body
    // 判断输入的验证码和session保存的验证码是否一致 ,如果不正确修改提示信息,返回提示信息
    // 查询

    if (params.vcode != req.session.vcode) {
        // 不存在
        result.status = 1
        result.message = "验证码错误!"
        res.json(result)
        return
    }
    // 连接数据库 查询账号密码是否正确,如果不正确,修改提示信息,关闭数据库连接并返回提示信息
    databasetool.findOne('accoutInfo',{username: params.username,password: params.password},(err,docs)=>{
        if (docs == null) {
            //不存在
            result.status = 2
            result.message = "用户名或密码错误!"
            res.json(result)
           
        }else{
            req.session.admin = params.username
            res.json(result)
        }
       
    })
}