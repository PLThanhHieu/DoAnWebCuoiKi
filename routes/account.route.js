var express=require('express');
var router=express.Router();

router.get('/register',(req,res,next)=>{
    res.render('vwAccount/register');
})

router.post('/register',(req,res,next)=>{
    //res.render('bwAccount/register');
})


module.exports=router;
