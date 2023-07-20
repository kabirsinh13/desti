const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const User=mongoose.model('User')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../key')
const RequireLogin=require('../middleware/requireLogin')
// router.get('/protected',RequireLogin,(req,res)=>{
//     res.send("hello")
// })



router.post('/signup',(req,res)=>{
    const {name,email,password,pic}=req.body
    // console.log(req.body.name)
    

    if(!email || !name|| !password){
        return res.status(400).json({error:"Please add all the field"})
    }
    User.findOne({email:email}).then((savedUser)=>{
    if(savedUser){
        return res.status(422).json({error:"User already have account"})
    }
    bcrypt.hash(password,12)
    .then(hashedPassword=>{
        const user=new User({
            email,
            name,
            password:hashedPassword,
            pic
        })
        user.save().then(user=>{
            res.json({message:"saved successfuly"})
        }).catch(err=>{
            console.log(err)
        })
    })
    
   })
   .catch(err=>{
    console.log(err)
   })
})

router.post('/login',(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.status(422).json({error:"please add all field"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(404).json({error:"please check your email address"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"sign in successfuly"})
                const token=jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,name,email,pic}=savedUser
                return res.json({token,user:{_id,name,email,pic}})
            }
            else{
                 return res.status(422).json({message:"check your password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})
module.exports=router