var chuyenmucModel=require('../models/chuyenmuc.model');
module.exports=(req,res,next)=>{
    chuyenmucModel.allChuyenMucCap1Ver2().then(rows=>{
        res.locals.lcchuyenmuc1s=rows;
        next();
    })  
}