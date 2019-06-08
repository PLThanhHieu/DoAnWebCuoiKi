var db=require('../utils/db');

module.exports={
    all:()=>{
        return db.load('select * from chuyenmuccacbaiviet');
    }, 
    addChuyenmuc:entity=>{
        return db.addChuyenmuc('chuyenmuccacbaiviet', entity);
    },
    single:id=>{
        return db.load(`select * from chuyenmuccacbaiviet where IdChuyenMuc =${id}`);
    },
    updateChuyenmuc:entity=>{
        return db.updateChuyenmuc('chuyenmuccacbaiviet','IdChuyenMuc', entity);
    },
    deleteChuyenmuc:id=>{
        return db.deleteChuyenmuc('chuyenmuccacbaiviet','IdChuyenMuc', id);
    }

};