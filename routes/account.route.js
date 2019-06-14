var express=require('express');
var router=express.Router();
var bcrypt=require('bcrypt');
var moment=require('moment');
var passport = require('passport');
var userModel=require('../models/user.model');
var auth=require('../middlewares/auth');

router.get('/register',(req,res,next)=>{
    res.render('vwAccount/register');
})

router.get('/is-available',(req,res,next)=>{
    var user=req.query.username;
    userModel.singleByUserName(user).then(rows=>{
        if(rows.length>0){
            return res.json(false); 
        }
        return res.json(true);
    })
})

router.get('/is-available-email',(req,res,next)=>{
    var user=req.query.email;
    userModel.singleByEmail(user).then(rows=>{
        if(rows.length>0){
            return res.json(false); 
        }
        return res.json(true);
    })
})

router.post('/register',(req,res,next)=>{
    //res.render('bwAccount/register');
    var saltRounds=10;
    var hash=bcrypt.hashSync(req.body.password, saltRounds);
    var dob=moment(req.body.dob,'DD/MM/YYYY').format('YYYY/MM/DD');
    var today=new Date();
    today.setDate(today.getDate()+7);
    var entity={
        HoTen: req.body.name,
        NgaySinh: dob,
        Email: req.body.email,
        TaiKhoan: req.body.username,
        MatKhau: hash,
        PhanLoaiNguoiDung: 'Subscriber',
        NgayHetHanTaiKhoan: today,
        HanSuDung: 'Còn hạng dùng',
    }

    userModel.add(entity).then(id=>{
        res.redirect('/Account/login');
    })
})
router.get('/login',(req,res,next)=>{
    res.render('vwAccount/login',{layout: false});
})

router.post('/login',(req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(err)  return next(err);
        if(!user){
            return res.render('vwAccount/login',{
                layout: false,
                err_message: info.message
            })
        }
        req.logIn(user, err=>{
            if(err) return next(err);
            return res.redirect('/');
        });
    })(req,res,next);
})

router.get('/profile',auth,(req,res,next)=>{
     res.end('............');
})


router.post('/logout',auth,(req,res,next)=>{
    req.logOut();
    res.redirect('/Account/login');
})

module.exports=router;
