var express=require('express');
var router=express.Router();
var chuyenmucModel=require('../../models/chuyenmuc.model');
router.get('/',(req,res)=>{
    var p= chuyenmucModel.allChuyenMucCap2();
    p.then(rows=>{
            console.log(rows);
            res.render('Admin/vwchuyenmuc/index',{
                chuyenmucbaiviet: rows
            });
        }
    ).catch(err=>{
        console.log(err);
    }); 
})

router.get('/add',(req,res)=>{
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

router.get('/edit/:id',(req,res)=>{
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

router.post('/update',(req,res)=>{
    
    chuyenmucModel.updateChuyenmuc(req.body)
        .then(n=>{
            console.log(n)
            res.redirect('/Admin/chuyenmuc');
        })
        .catch(err=>{
            console.log(err);
        })  
})

router.post('/delete',(req,res)=>{
    
    chuyenmucModel.deleteChuyenmuc(req.body.IdChuyenMucCap2)
        .then(n=>{
            console.log(n)
            res.redirect('/Admin/chuyenmuc');
        })
        .catch(err=>{
            console.log(err);
        })  
})

module.exports=router;
