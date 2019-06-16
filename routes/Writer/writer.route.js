var express=require('express');
var router=express.Router();
 
router.get('/post',(req,res,next)=>{
    res.render('vwWriter/writer-post');
})

router.get('/upload',(req,res,next)=>{
    res.render('vwWriter/writer-upload');
})

router.get('/',(req,res,next)=>{
    
})

module.exports=router;