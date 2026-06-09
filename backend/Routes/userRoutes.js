const express = require('express')
const Verifitoken = require('../middleware/auth.middleware')

const router = express.Router();

router.get('/user',Verifitoken,(req,res)=>{
    res.status(200).json({message:'user login  successfully', success:true})
})
router.get('/admin',Verifitoken,(req,res)=>{
    res.status(200).json({message:'admin login  successfully', success:true})
})
router.get('/manager',Verifitoken,(req,res)=>{
    res.status(200).json({message:'manager login  successfully', success:true})
})
router.get('/admin',(req,res)=>{
    
})

module.exports= router;