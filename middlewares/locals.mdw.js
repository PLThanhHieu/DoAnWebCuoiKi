var chuyenmucModel=require('../models/chuyenmuc.model');
module.exports=(req,res,next)=>{
    chuyenmucModel.all().then(rows=>{
        res.locals.lcchuyenmucs=rows;
        next();
    })
}