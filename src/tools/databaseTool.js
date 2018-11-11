// 连接数据库 插入数据
const MongoClient = require('mongodb').MongoClient

// mangodb中有个方法 objectId  再把这个暴露出去
exports.objectId = require('mongodb').ObjectId
// Connection URL
const url = 'mongodb://localhost:27017'
// Database Name
const dbName = 'szhmqd23'

/*
 * 1、把数据库操作放在这个里面
 * 2、暴露一些方法（增、删、改、查）给控制器去使用
 * 3、这个databasetool.js 操作完数据库之后，要通过调用回调函数的形式，把结果
 * 返回给控制器
 */


 /*
   把数据库连接操作抽取出来,把collection对象作为参数传递给调用者
*/

const getCollection = (collectionName,callback)=>{
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
        const db = client.db(dbName);
        const collection = db.collection(collectionName)
        callback(collection,client)
    });
}

// 查询多条操作
exports.findList = (collectionName, params, callback) => {
        getCollection(collectionName,(collection,client)=>{
            collection.find(params).toArray((err, docs) => {
                client.close()
                callback(err, docs)
            })
        })
}

// 新增操作
exports.insert = (collectionName,params,callback)=>{
    getCollection(collectionName,(collection,client)=>{
        collection.insertOne(params, (err, result) => {
            client.close()
            callback(err,result)
        })
    })
}

// 查询一条数据操作
exports.findOne = (collectionName,params,callback)=>{
    getCollection(collectionName,(collection,client)=>{
        collection.findOne(params, (err, docs) => {
            client.close()
            callback(err,docs)
        })
    })
    
}


// 修改数据操作
exports.updata = (collectionName,condition,params,callback)=>{
    getCollection(collectionName,(collection,client)=>{
        collection.updateOne(condition, { $set: params }, function(err, result) {
            client.close()
           callback(err,result)
          }) 
    })
}

// 删除数据操作
exports.deletes = (collectionName,params,callback)=>{
    getCollection(collectionName,(collection,client)=>{
        collection.deleteOne(params, function(err, result) {
             client.close()
             callback(err,result)
        })
    })
}