module.exports=(req,res,next)=>{
    if(req.user){
        res.locals.isAuthenticated=true;
        var nguoidung=req.user;
        var n=new Date(nguoidung.NgaySinh);
        nguoidung.NgaySinh=n.toLocaleDateString();
        var kt=false;
        if(req.user.PhanLoaiNguoiDung==='Subscriber')
        {
            var k =new Date(nguoidung.NgayHetHanTaiKhoan);
            nguoidung.NgayHetHanTaiKhoan=k.toLocaleDateString();
            var d1=new Date();
            var d2= new Date(nguoidung.NgayHetHanTaiKhoan);
            var kt1= Date.parse(d1);
            var kt2= Date.parse(d2);
            if(d2>d1)
            {
                kt=true;
            }

        }
        res.locals.authUser=nguoidung;
        res.locals.conhan=kt;
    }
    next();
}