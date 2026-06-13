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
router.get('/claims-officer',Verifitoken,(req,res)=>{
    res.status(200).json({message:'claims officer login  successfully', success:true})
})
router.get('/support-executive',Verifitoken,(req,res)=>{
    res.status(200).json({message:'support executive login  successfully', success:true})
})

module.exports= router;