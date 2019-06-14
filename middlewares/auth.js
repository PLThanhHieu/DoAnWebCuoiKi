module.exports=(req,res,next)=>{
    if(!req.user){
        res.redirect('/Account/login');
    }
    else next();
}