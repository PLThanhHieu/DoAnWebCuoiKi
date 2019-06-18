var express=require('express');
var router=express.Router();
var chuyenmucModel=require('../../models/chuyenmuc.model');
var auth= require('../../middlewares/auth');
router.get('/',auth,(req,res,next)=>{
    var p= chuyenmucModel.allChuyenMucCap1Cap2();
    p.then(rows=>{
            console.log(rows);
            res.render('Admin/vwchuyenmucnho/index',{
                chuyenmuccap1: rows
            });
        }
    ).catch(next); 
})

router.get('/add',auth,(req,res)=>{
    res.render('Admin/vwchuyenmucnho/add');
})

router.post('/add',(req,res,next)=>{
    chuyenmucModel.addChuyenmuccap1(req.body)
        .then(id=>{
            console.log(id)
            res.render('Admin/vwchuyenmuc/add');
        })
        .catch(next)  
    
})

router.get('/edit/:id',auth,(req,res,next)=>{
    var id=req.params.id;
    if(isNaN(id))
    {
        res.render('Admin/vwchuyenmucnho/edit',{
            error: true,  
        });
    }
    chuyenmucModel.singlecap1(id).then(rows=>{
            if(rows.length>0){
                res.render('Admin/vwchuyenmucnho/edit',{
                    error: false,
                    chuyenmuccap1: rows[0]  
                });
            }
            else{
                res.render('Admin/vwchuyenmucnho/edit',{
                    error: true,
                     
                });
            }
        }
    ).catch(next); 
})

router.post('/update',(req,res,next)=>{
    
    chuyenmucModel.updateChuyenmuccap1(req.body)
        .then(n=>{
            console.log(n)
            res.redirect('/Admin/chuyenmucnho');
        })
        .catch(next)  
})

router.post('/delete',(req,res,next)=>{
    
    chuyenmucModel.deleteChuyenmuccap1(req.body.IdChuyenMucCap1)
        .then(n=>{
            console.log(n)
            res.redirect('/Admin/chuyenmucnho');
        })
        .catch(next)  
})

module.exports=router;
