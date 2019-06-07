var express=require('express');
var router=express.Router();
var baivietModel=require('../../models/baiviet.model');
router.get('/',(req,res)=>{
    var p= baivietModel.all();
    p.then(rows=>{
            console.log(rows);
            res.render('Vanlai/vwbaiviet/index',{
                chuyenmucbaiviet: rows
            });
        }
    ).catch(err=>{
        console.log(err);
    }); 
})

module.exports=router;
