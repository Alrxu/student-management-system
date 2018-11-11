const path = require('path')
// 导入数据库操作模块
const databaseTool = require(path.join(__dirname, '../tools/databaseTool.js'))
// 列表页面的处理
exports.getListPage = (req, res) => {
    // 连接数据库,查询列表数据
    // 实现查询, 跟查询全部数据一样,只是多了个关键字
    // 设置关键字兼容,如果输入了关键字,就按照关键字进行模糊搜索,否则关键字为空字符串,即搜索全部数据
    const keywords = req.query.keywords || ''
    // 调用数据库操作模块中的查询方法
    databaseTool.findList('studentInfo', {name: {$regex: keywords}}, (err, docs) => {
        res.render(path.join(__dirname, '../statics/views/list.html'), {
            students: docs,
            keywords,
            admin: req.session.admin
        })
    })
}

// 新增页面的处理
exports.getAddPage = (req, res) => {
    // 同样是模板渲染
    console.log(req.session.admin);
    
    res.render(path.join(__dirname, '../statics/views/add.html'), {
        admin: req.session.admin
    })
}

// 新增功能处理
exports.addStudent = (req, res) => {
    databaseTool.insert('studentInfo',req.body,(err,result)=>{
         // 如果插入失败,返回一段代码提示
         if (result == null) {
            res.send("<script>alert('插入数据失败!!')</script>")
            return
        }
        // 否则跳转会列表页面
        res.send("<script>window.location='/studentmanage/list'</script>")
    })
}

// 编辑页面处理
exports.getEditPage = (req,res)=>{
    const studentid = databaseTool.objectId(req.params.studentid)
    // _id在数据库查询时要进行处理
    // const studentid = 
    //查询数据库,使用模板引擎渲染页面
    databaseTool.findOne('studentInfo',{_id: studentid},(err,docs)=>{
        // 渲染
        res.render(path.join(__dirname,'../statics/views/edit.html'),{
            studentInfo: docs,
            admin: req.session.admin
        })
    })
}

// 编辑功能保存处理
exports.editSave = (req,res)=>{
    const studentid = databaseTool.objectId(req.params.studentid)
    // 连接数据库,修改数据操作
    databaseTool.updata('studentInfo',{_id:studentid},req.body,(err,result)=>{
        // 如果修改成功,返回学生列表页面重新渲染页面
        // 否则返回一段脚本代码提示修改失败
        if(result == null){
            res.send('<script>alert("修改失败!")</script>')
        }else{
            res.send('<script>window.location.href="/studentmanage/list"</script>')
        }
    })
}

// 删除功能处理
exports.deleteStudent = (req,res)=>{
    const studentId = databaseTool.objectId(req.params.studentid)
    
    // 连接数据库进行删除操作
    databaseTool.deletes('studentInfo',{_id:studentId},(err,result)=>{
        // 如果删除成功,重新请求list页面重新渲染
        if(result==null){
            res.send('<script>alert("删除失败!")</script>')
        }else{
            res.send('<script>window.location.href="/studentmanage/list"</script>')
        }
    })
}

// 退出学生管理系统
exports.logout = (req,res)=>{
    // 退出,清空session中保存的用户名
    req.session.admin = null
    res.send("<script>window.location.href= '/accout/login'</script>")
}