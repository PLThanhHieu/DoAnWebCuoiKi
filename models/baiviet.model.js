var db=require('../utils/db');

module.exports={
    all:()=>{
        return db.load('select * from chuyenmuccacbaiviet');
    },

    loadAllbaiviet:()=>{
        return db.loadbaiviet('select *from baiviet');
    }
};