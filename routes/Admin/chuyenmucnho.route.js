var express=require('express');
var router=express.Router();
var chuyenmucModel=require('../../models/chuyenmuc.model');
router.get('/',(req,res)=>{
    var p= chuyenmucModel.allChuyenMucCap1Cap2();
    p.then(rows=>{
            console.log(rows);
            res.render('Admin/vwchuyenmucnho/index',{
                chuyenmuccap1: rows
            });
        }
    ).catch(err=>{
        console.log(err);
    }); 
})

router.get('/add',(req,res)=>{
    res.render('Admin/vwchuyenmucnho/add');
})

router.post('/add',(req,res)=>{
    chuyenmucModel.addChuyenmuccap1(req.body)
        .then(id=>{
            console.log(id)
            res.render('Admin/vwchuyenmuc/add');
        })
        .catch(err=>{
            console.log(err);
        })  
    
})

router.get('/edit/:id',(req,res)=>{
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
    ).catch(err=>{
        console.log(err);
    }); 
})

router.post('/update',(req,res)=>{
    
    chuyenmucModel.updateChuyenmuccap1(req.body)
        .then(n=>{
            console.log(n)
            res.redirect('/Admin/chuyenmucnho');
        })
        .catch(err=>{
            console.log(err);
        })  
})

router.post('/delete',(req,res)=>{
    
    chuyenmucModel.deleteChuyenmuccap1(req.body.IdChuyenMucCap1)
        .then(n=>{
            console.log(n)
            res.redirect('/Admin/chuyenmucnho');
        })
        .catch(err=>{
            console.log(err);
        })  
})

module.exports=router;
