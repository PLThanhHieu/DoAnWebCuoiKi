var express=require('express');
var router=express.Router();
var baivietModel=require('../models/baiviet.model');
router.get('/:id/baiviets',(req,res)=>{
    var id=req.params.id;
    var p= baivietModel.allbaiviettheochuyenmuc(id);
    p.then(rows=>{
            console.log(rows);
            res.render('vwbaiviet/bychuyenmuc',{
                baiviets: rows
            });
        }
    ).catch(err=>{
        console.log(err);
    }); 
})


router.get('/:id/baiviets/chitiet/:idbaiviet',(req,res)=>{ 
    var idbaiviet=req.params.idbaiviet;
    if(isNaN(idbaiviet))
    {
        res.render('../views/chitiet',{
            error: true,  
        });
    }
    baivietModel.chitietbaiviet(idbaiviet).then(rows=>{
            if(rows.length>0){
                res.render('../views/chitiet',{
                    error: false,
                    baiviet: rows[0],
                });
            }
            else{
                res.render('../views/chitiet',{
                    error: true,
                     
                });
            }
        }
    ).catch(err=>{
        console.log(err);
    }); 
})

module.exports=router;
