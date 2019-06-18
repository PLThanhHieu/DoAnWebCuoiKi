var express=require('express');
var baivietModel=require('../../models/baiviet.model');
var auth=require('../../middlewares/auth');
var CMC1=require('../../models/chuyenmuc.model');
var router=express.Router();
 

router.get('/',auth,(req,res,next)=>{
    //var chuyenmucduocphancong = req.user.ChuyenMucDuocPhanCong;
    baivietModel.loadAllbaiviet().then(rows=>{
        var choduyet= new Array();
        for(i=0;i<rows.length;i++)
        {
            if(rows[i].TrangThai==='Chờ duyệt'){
                choduyet.push(rows[i]);
            }
        }
        res.render('Admin/vwduyetbaiviet/admin-duyetbai-home',{
            choduyet
        })
    }).catch(next)
    
})

router.get('/chitiet/:idbaiviet',(req,res)=>{ 
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

router.get('/duyetbai/:id',(req,res)=>{
    var id=req.params.id;
    if(isNaN(id))
    {
        res.render('Admin/vwduyetbaiviet/admin-duyetbai',{
            error: true,  
        });
    }
    baivietModel.single(id).then(rows=>{
            if(rows.length>0){
                res.render('Admin/vwduyetbaiviet/admin-duyetbai',{
                    error: false,
                    baiviet: rows[0]  
                });
            }
            else{
                res.render('Admin/vwduyetbaiviet/admin-duyetbai',{
                    error: true,
                });
            }
        }
    ).catch(err=>{
        console.log(err);
    }); 
})

router.post('/duyetbai',(req,res,next)=>{
    var baiviet=req.body;
    baiviet.TrangThai='Xuất bản';
    if(baiviet.ChuThich==='')
    {
        delete baiviet.ChuThich;
    }
    if(baiviet.Ngaydang==='__/__/____')
    {
        delete baiviet.NgayDang;
    }
    baivietModel.updateBaiViet(baiviet)
        .then(n=>{
            console.log(baiviet)
            res.redirect('/Admin/duyetbai');
        })
        .catch(next) ;
})

router.post('/tuchoi',(req,res,next)=>{
    var baiviet=req.body;
    baiviet.TrangThai='Từ chối';
    if(baiviet.ChuThich==='')
    {
        delete baiviet.ChuThich;
    }
    if(baiviet.Ngaydang==='__/__/____')
    {
        delete baiviet.NgayDang;
    }
    baivietModel.updateBaiViet(baiviet)
        .then(n=>{
            res.redirect('/Admin/duyetbai');
        })
        .catch(next) ;
})
module.exports=router;