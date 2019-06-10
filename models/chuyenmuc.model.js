var db=require('../utils/db');

module.exports={
    all:()=>{
        return db.load('select * from chuyenmuccap2');
    }, 
    addChuyenmuc:entity=>{
        return db.addChuyenmuc('chuyenmuccap2', entity);
    },
    single:id=>{
        return db.load(`select * from chuyenmuccap2 where IdChuyenMucCap2 =${id}`);
    },
    updateChuyenmuc:entity=>{
        return db.updateChuyenmuc('chuyenmuccap2','IdChuyenMucCap2', entity);
    },
    deleteChuyenmuc:id=>{
        return db.deleteChuyenmuc('chuyenmuccap2','IdChuyenMucCap2', id);
    }

};