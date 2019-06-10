var chuyenmucModel=require('../models/chuyenmuc.model');
module.exports=(req,res,next)=>{
    chuyenmucModel.allChuyenMucCap2().then(rows=>{
        res.locals.lcchuyenmuc2s=rows;
        next();
    })  
}