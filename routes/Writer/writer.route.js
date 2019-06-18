var express=require('express');
var baivietModel=require('../../models/baiviet.model');
var auth=require('../../middlewares/auth');
var CMC1=require('../../models/chuyenmuc.model');
var nhantagModel=require('../../models/nhantag.model');
var router=express.Router();
 
router.get('/post',auth,(req,res,next)=>{
    res.render('vwWriter/writer-post');
})

router.post('/post',auth,(req,res,next)=>{
    var today=new Date();
    var entity={
        TieuDe: req.body.TieuDe,
        AnhDaiDien: req.body.AnhDaiDien,
        TomTat: req.body.TomTat,
        NoiDungBaiViet:req.body.NoiDungBaiViet,
        TrangThai: 'Chờ duyệt',
        ChuThich: 'Không chú thích',
        NgayDang: today,
        IdChuyenMucCap1: req.body.IdChuyenMucCap1,
        LuotXem: 1,
        IdNguoiDung: req.user.IdNguoiDung,
        LoaiBaiViet:req.body.LoaiBaiViet
    }
    // nhantagModel.addTag(req.body.TenTag).then(()=>{
    //     res.end('....');
    // })
    baivietModel.addBaiViet(entity).then(idbaiviet=>{
        var tag={
            TenTag: req.body.TenTag
        }
        nhantagModel.addTag(tag).then(idtag=>{
            var tagbaiviet={
                IdBaiViet: idbaiviet,
                IdTag: idtag
            }
            nhantagModel.addTagCuabaiViet(tagbaiviet).then(()=>{
                res.redirect('/Writer');
            })
        })
    }).catch(next);
      //res.render('/vwWriter/writer-home');
    
})

router.get('/upload',(req,res,next)=>{
    res.render('vwWriter/writer-upload');
})

router.get('/',auth,(req,res,next)=>{
    var IdNguoiDung = req.user.IdNguoiDung;
    baivietModel.loadbaivietByIDWriter(IdNguoiDung).then(rows=>{
        var xuatban = new Array();
        var tuchoi= new Array();
        var choduyet= new Array();
        for(i=0;i<rows.length;i++)
        {
            if(rows[i].TrangThai==='Xuất bản'){
                xuatban.push(rows[i]);
            }
            if(rows[i].TrangThai==='Từ chối'){
                tuchoi.push(rows[i]);
            }
            if(rows[i].TrangThai==='Chờ duyệt'){
                choduyet.push(rows[i]);
            }
        }
        res.render('vwWriter/writer-home',{
            tuchoi,
            choduyet,
            xuatban
        })
    }).catch(next)
    
})

router.get('/chitiet/:idbaiviet',auth,(req,res,next)=>{ 
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
    ).catch(next); 
})


router.get('/update/:id',auth,(req,res,next)=>{
    var id=req.params.id;
    if(isNaN(id))
    {
        res.render('vwWriter/update',{
            error: true,  
        });
    }
    baivietModel.single(id).then(rows=>{
            if(rows.length>0){
                res.render('vwWriter/update',{
                    error: false,
                    baiviet: rows[0]  
                });
            }
            else{
                res.render('vwWriter/update',{
                    error: true,
                });
            }
        }
    ).catch(next); 
})

router.post('/update',(req,res,next)=>{
    var today=new Date();
    var baiviet={
        IdBaiViet: req.body.IdBaiViet,
        TieuDe: req.body.TieuDe,
        AnhDaiDien: req.body.AnhDaiDien,
        TomTat: req.body.TomTat,
        NoiDungBaiViet: req.body.NoiDungBaiViet,
        TrangThai: 'Chờ duyệt',
        NgayDang: today,
        IdChuyenMucCap1: req.body.IdChuyenMucCap1,
        LoaiBaiViet: req.body.LoaiBaiViet,
    }
    baivietModel.updateBaiViet(baiviet)
        .then(n=>{
            res.redirect('/Writer');
        })
        .catch(next)  
})
module.exports=router;