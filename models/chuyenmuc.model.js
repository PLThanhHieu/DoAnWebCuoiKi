var db=require('../utils/db');

module.exports={
    allChuyenMucCap2:()=>{
        return db.load('select * from chuyenmuccap2');
    },
    allChuyenMucCap1:()=>{
        return db.load('select * from chuyenmuccap1');
    },

    allChuyenMucCap1Cap2:()=>{
        return db.load('select * from chuyenmuccap1 c1 left join chuyenmuccap2 c2 on c1.IdChuyenMucCap2=c2.IdChuyenMucCap2 ');
    },

    allChuyenMucCap1Ver2:()=>{
        return db.load('SELECT c.IdChuyenMucCap1, c.TenChuyenMucCap1, c.IdChuyenMucCap2 as IdCap2 FROM chuyenmuccap1 c');
    },
    addChuyenmuc:entity=>{
        return db.add('chuyenmuccap2', entity);
    },
    addChuyenmuccap1:entity=>{
        return db.add('chuyenmuccap1', entity);
    },
    single:id=>{
        return db.load(`select * from chuyenmuccap2 where IdChuyenMucCap2 =${id}`);
    },
    singlecap1:id=>{
        return db.load(`select * from chuyenmuccap1 where IdChuyenMucCap1 =${id}`);
    },
    updateChuyenmuc:entity=>{
        return db.update('chuyenmuccap2','IdChuyenMucCap2', entity);
    },
    updateChuyenmuccap1:entity=>{
        return db.update('chuyenmuccap1','IdChuyenMucCap1', entity);
    },
    deleteChuyenmuc:id=>{
        return db.delete('chuyenmuccap2','IdChuyenMucCap2', id);
    },
    deleteChuyenmuccap1:id=>{
        return db.delete('chuyenmuccap1','IdChuyenMucCap1', id);
    }

};