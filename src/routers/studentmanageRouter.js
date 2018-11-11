const express = require('express')
const path = require('path')
const studentmanageRouter = express.Router()
// 导入学生信息控制器
const studentCtr = require(path.join(__dirname,'../controllers/studentmanageController'))
// 挂载路由
// 接收 列表页面的请求
studentmanageRouter.get('/list',(req,res)=>{
    studentCtr.getListPage(req,res)
})

// 接收 新增页面的请求
studentmanageRouter.get('/add',(req,res)=>{
    studentCtr.getAddPage(req,res)
})

// 接收 新增功能的请求
studentmanageRouter.post('/add',(req,res)=>{
    studentCtr.addStudent(req,res)
})

// 接收 编辑页面的请求
studentmanageRouter.get('/edit/:studentid',(req,res)=>{
    studentCtr.getEditPage(req,res)
})


// 接收 编辑页面保存的请求
studentmanageRouter.post('/edit/:studentid',(req,res)=>{
    studentCtr.editSave(req,res)
})

// 接收 删除数据的请求
 studentmanageRouter.get('/delete/:studentid',(req,res)=>{
     studentCtr.deleteStudent(req,res)
 })

 // 退出学生管理系统
 studentmanageRouter.get('/logout',(req,res)=>{
     studentCtr.logout(req,res)
 })
// 导出
module.exports = studentmanageRouter