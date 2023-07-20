const express = require("express");
const app=express()
const mongoose = require("mongoose");
const port=5000;
const {MONGOURL}=require('./key')

const path = require('path')

mongoose.connect(MONGOURL)

mongoose.connection.on('connected',()=>{
    console.log("connection to mongo")
})
mongoose.connection.on('error',(err)=>{
    console.log("connection to mongo",err)
})

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(express.static(path.resolve(__dirname, './client/build')));

app.get('/',(req,res)=>{
        res.send("hello world!");
        console.log("home")
    })

app.listen(port,()=>{
    console.log("server is running")
})
// 

// const customMiddleware=(req,res,next)=>{
//     console.log("middleware working")
//     next()
// }
// // app.use(customMiddleware)
// app.get('/',customMiddleware,(req,res)=>{
//     res.send("hello world!");
//     console.log("home")
// })
// app.get('/about',(req,res)=>{
//     res.send("about page")
//     console.log("about")
// })