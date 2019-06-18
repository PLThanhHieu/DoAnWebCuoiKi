var express=require('express');
var router=express.Router();
var userModel=require('../../models/user.model');
router.get('/',(req,res,next)=>{
    userModel.all().then(rows=>{
        var edit=new Array();
        var writer= new Array();
        var sub= new Array();
        for(i=0;i<rows.length;i++)
        {
            if(rows[i].NgayHetHanTaiKhoan!=0)
            {
                var n=new Date(rows[i].NgayHetHanTaiKhoan);      
                rows[i].NgayHetHanTaiKhoan=n.toLocaleDateString();
            }
            if(rows[i].PhanLoaiNguoiDung==='Editor')
            {
                edit.push(rows[i]);
            }
            if(rows[i].PhanLoaiNguoiDung==='Writer')
            {
                writer.push(rows[i]);
            }
            if(rows[i].PhanLoaiNguoiDung==='Subscriber')
            {
                sub.push(rows[i]);
            }
        }
        res.render('Admin/vwnguoidung/index',{
            edit,
            writer,
            sub
        })
    })
})

router.get('/edit/:id',(req,res)=>{
    var id=req.params.id;
    if(isNaN(id))
    {
        res.render('Admin/vwnguoidung/editnguoidung',{
            error: true,  
        });
    }
    userModel.single(id).then(rows=>{
            if(rows.length>0){
                var n=new Date(rows[0].NgayHetHanTaiKhoan);
                rows[0].NgayHetHanTaiKhoan=n.toLocaleDateString();
                res.render('Admin/vwnguoidung/editnguoidung',{
                    error: false,
                    nguoidung: rows[0]  
                });
            }
            else{
                res.render('Admin/vwnguoidung/editnguoidung',{
                    error: true,
                     
                });
            }
        }
    ).catch(err=>{
        console.log(err);
    }); 
})

router.post('/update',(req,res,next)=>{
    var user=req.body;
    userModel.updateUser(user)
        .then(n=>{
            res.redirect('/Admin/nguoidung');
        })
        .catch(next)  
})

router.post('/giahan',(req,res,next)=>{
    var user=req.body;
    var today= new Date();
    today.setDate(today.getDate()+7);
    var entity={
        IdNguoiDung:req.body.IdNguoiDung,
        HoTen: req.body.HoTen,
        NgayHetHanTaiKhoan: today
    }
    userModel.updateUser(entity)
        .then(n=>{
            res.redirect('/Admin/nguoidung');
        })
        .catch(next)  
})

router.post('/delete',(req,res, next)=>{
    
    userModel.deleteUser(req.body.IdNguoiDung)
        .then(n=>{
            res.redirect('/Admin/nguoidung');
        })
        .catch(next)  
})



module.exports=router;