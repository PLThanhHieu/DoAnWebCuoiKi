var db=require('../utils/db');

module.exports={
    loadbaivietByIDWriter:IdNguoiDung=>{
        return db.loadbaiviet(`select *from baiviet where IdNguoiDung = ${IdNguoiDung}`);
    },
    loadAllbaiviet:()=>{
        return db.loadbaiviet('select *from baiviet');
    },
    PageAllbaiviet:(limit, offset)=>{
        return db.loadbaiviet(`select *from baiviet limit ${limit} offset ${offset}`);
    },
    CountAllbaiviet:()=>{
        return db.loadbaiviet('select count(*) as total from baiviet');
    },
    // chitietbaiviet: IdChuyenMucCap1=>{
    //     return db.load(`select * from baiviet where IdChuyenMucCap1 =${IdChuyenMucCap1}`);
    // },
    addBaiViet:entity=>{
        return db.add('baiviet', entity);
    },

    allbaiviettheochuyenmuc:id=>{
        return db.load(`select * from baiviet where IdChuyenMucCap1 =${id}`);
    },
    pagebaiviettheochuyenmuc:(id, limit, offset)=>{
        return db.load(`select * from baiviet where IdChuyenMucCap1 =${id} limit ${limit} offset ${offset} `);
    },
    countbaiviettheochuyenmuc:id=>{
        return db.load(`select count(*) as total from baiviet where IdChuyenMucCap1 =${id}`);
    },
    single:id=>{
        return db.load(`select * from baiviet where IdBaiViet =${id}`);
    },
    updateBaiViet:entity=>{
        return db.update('baiviet','IdBaiViet', entity);
    },
    deleteBaiViet:id=>{
        return db.delete('baiviet','IdBaiViet', id);
    }

};