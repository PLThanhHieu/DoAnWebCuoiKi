var express=require('express');
var router=express.Router();
var nhantagModel=require('../../models/nhantag.model');

router.get('/',(req,res,next)=>{
    nhantagModel.allTagandBaiViet().then(rows=>{
        res.render('Admin/vwnhantag/index',{
            nhantags: rows
        })
    }).catch(next);
})

router.get('/edit/:id',(req,res)=>{
    var id=req.params.id;
    if(isNaN(id))
    {
        res.render('Admin/vwnhantag/edit',{
            error: true,  
        });
    }
    nhantagModel.single(id).then(rows=>{
            if(rows.length>0){
                res.render('Admin/vwnhantag/edit',{
                    error: false,
                    nhantag: rows[0]  
                });
            }
            else{
                res.render('Admin/vwnhantag/edit',{
                    error: true,
                     
                });
            }
        }
    ).catch(err=>{
        console.log(err);
    }); 
})

router.get('chitiet/:idbaiviet',(req,res)=>{ 
    var idbaiviet=req.params.idbaiviet;
    if(isNaN(idbaiviet))
    {
        res.render('../views/chitiet',{
            error: true,  
        });
    }
    baivietModel.single(idbaiviet).then(rows=>{
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

router.post('/update',(req,res,next)=>{
    nhantagModel.updateTag(req.body)
        .then(n=>{
            console.log(n)
            res.redirect('/Admin/nhantag');
        })
        .catch(next)  
})
module.exports=router;