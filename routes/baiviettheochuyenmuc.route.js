var express=require('express');
var router=express.Router();
var baivietModel=require('../models/baiviet.model');
router.get('/:id/baiviets',(req,res, next)=>{
    var id=req.params.id;

    var page=req.query.page || 1;
    if(page<1) page=1;
    
    var limit = 6;
    var offset =(page-1)*limit; 
    Promise.all([
       baivietModel.pagebaiviettheochuyenmuc(id,limit,offset),
       baivietModel.countbaiviettheochuyenmuc(id)
    ]).then(([rows, count_rows])=>{ 
        var total =count_rows[0].total;
        var nPage=Math.floor(total/limit);
        if(total%limit>0) nPage++;
        var pages=[];
        for(i=1;i<=nPage;i++)
        {
            var obj={values: i, active: i === +page};
            pages.push(obj);
        }
        res.render('vwbaiviet/bychuyenmuc',{
            baiviets: rows,
            pages
        });
    }).catch(next);
    // var p= baivietModel.allbaiviettheochuyenmuc(id);
    // p.then(rows=>{
    //         console.log(rows);
    //         res.render('vwbaiviet/bychuyenmuc',{
    //             baiviets: rows
    //         });
    //     }
    // ).catch(err=>{
    //     console.log(err);
    // }); 
})


router.get('/:id/baiviets/chitiet/:idbaiviet',(req,res)=>{ 
    var idbaiviet=req.params.idbaiviet;
    if(isNaN(idbaiviet))
    {
        res.render('../views/chitiet',{
            error: true,  
        });
    }
    baivietModel.single(idbaiviet).then(rows=>{
        if(rows.length>0){
            var luotxem=rows[0].LuotXem;
            luotxem=luotxem+1;
            rows[0].LuotXem=luotxem;
            var entity ={
                IdBaiViet: idbaiviet,
                LuotXem: rows[0].LuotXem
            }

            baivietModel.updateBaiViet(entity).then(()=>{
                res.render('../views/chitiet',{
                    error: false,
                    baiviet: rows[0],
                });
            })
            
        }
        else{
            res.render('../views/chitiet',{
                error: true,
                 
            });
        }
    }).catch(err=>{
        console.log(err);
    }); 
})

module.exports=router;
