var db=require('../utils/db');

module.exports={
    allChuyenMucCap2:()=>{
        return db.load('select * from chuyenmuccap2');
    },
    allChuyenMucCap1:()=>{
        return db.load('select * from chuyenmuccap1');
    },
    
    allChuyenMucCap1Ver2:()=>{
        return db.load('SELECT c.IdChuyenMucCap1, c.TenChuyenMucCap1, c.IdChuyenMucCap2 as IdCap2 FROM chuyenmuccap1 c');
    },
    addChuyenmuc:entity=>{
        return db.add('chuyenmuccap2', entity);
    },
    single:id=>{
        return db.load(`select * from chuyenmuccap2 where IdChuyenMucCap2 =${id}`);
    },
    updateChuyenmuc:entity=>{
        return db.update('chuyenmuccap2','IdChuyenMucCap2', entity);
    },
    deleteChuyenmuc:id=>{
        return db.delete('chuyenmuccap2','IdChuyenMucCap2', id);
    }

};