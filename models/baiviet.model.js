var db=require('../utils/db');

module.exports={
 
    loadAllbaiviet:()=>{
        return db.loadbaiviet('select *from baiviet');
    },
    chitietbaiviet: IdChuyenMucCap1=>{
        return db.load(`select * from baiviet where IdChuyenMucCap1 =${IdChuyenMucCap1}`);
    },
    addBaiViet:entity=>{
        return db.addChuyenmuc('baiviet', entity);
    },

    allbaiviettheochuyenmuc:id=>{
        return db.load(`select * from baiviet where IdBaiViet =${id}`);
    },

    single:id=>{
        return db.load(`select * from baiviet where IdBaiViet =${id}`);
    },
    updateBaiViet:entity=>{
        return db.updateChuyenmuc('baiviet','IdBaiViet', entity);
    },
    deleteBaiViet:id=>{
        return db.deleteChuyenmuc('baiviet','IdBaiViet', id);
    }

};