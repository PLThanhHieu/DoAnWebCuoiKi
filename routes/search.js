var express=require('express');
var router=express.Router();
var baivietModel=require('../models/baiviet.model');


router.post('/',(req,res,next)=>{
    var txt=req.body.search;
    baivietModel.loadfulltxt(txt).then(rows=>{
        res.render('Search',{
            baiviets :rows
        })
    })
    
})


module.exports=router;