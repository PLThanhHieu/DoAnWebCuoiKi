var express=require('express');
var router=express.Router();
var chuyenmucModel=require('../../models/chuyenmuc.model');
var auth= require('../../middlewares/auth');
router.get('/',auth,(req,res,next)=>{
    var p= chuyenmucModel.allChuyenMucCap2();
    p.then(rows=>{
            res.render('Admin/vwchuyenmuc/index',{
                chuyenmucbaiviet: rows
            });
        }
    ).catch(next); 
})

router.get('/add',auth,(req,res,next)=>{
    res.render('Admin/vwchuyenmuc/add');
})

router.post('/add',(req,res)=>{
    
    chuyenmucModel.addChuyenmuc(req.body)
        .then(id=>{
            console.log(id)
            res.render('Admin/vwchuyenmuc');
        })
        .catch(err=>{
            console.log(err);
        })  
    
})

router.get('/edit/:id',auth,(req,res)=>{
    var id=req.params.id;
    if(isNaN(id))
    {
        res.render('Admin/vwchuyenmuc/edit',{
            error: true,  
        });
    }
    chuyenmucModel.single(id).then(rows=>{
            if(rows.length>0){
                res.render('Admin/vwchuyenmuc/edit',{
                    error: false,
                    chuyenmuc: rows[0]  
                });
            }
            else{
                res.render('Admin/vwchuyenmuc/edit',{
                    error: true,
                     
                });
            }
        }
    ).catch(err=>{
        console.log(err);
    }); 
})

router.post('/update',auth,(req,res,next)=>{
    
    chuyenmucModel.updateChuyenmuc(req.body)
        .then(n=>{
            console.log(n)
            res.redirect('/Admin/chuyenmuc');
        })
        .catch(next)  
})

router.post('/delete',(req,res)=>{
    
    chuyenmucModel.deleteChuyenmuc(req.body.IdChuyenMucCap2)
        .then(n=>{
            console.log(n)
            res.redirect('/Admin/chuyenmuc');
        })
        .catch(next)  
})

module.exports=router;
