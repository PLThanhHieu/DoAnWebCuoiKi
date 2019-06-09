var db=require('../utils/db');

module.exports={
    all:()=>{
        return db.load('select * from chuyenmuccacbaiviet');
    },

    loadAllbaiviet:()=>{
        return db.loadbaiviet('select *from baiviet');
    },
    chitietbaiviet:id=>{
        return db.load(`select * from baiviet where IdBaiViet =${id}`);
    }

};