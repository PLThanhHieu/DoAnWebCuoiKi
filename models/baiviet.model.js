var db=require('../utils/db');

module.exports={
    loadfulltxt:txt=>{
        return db.load(`SELECT * FROM baiviet WHERE MATCH (TieuDe,NoiDungBaiViet,TomTat) AGAINST ('${txt}' IN NATURAL LANGUAGE MODE)`);
    },
    load5bailienquan:idchuyenmuc=>{
        return db.load(`SELECT * FROM baiviet WHERE IdChuyenMucCap1 = ${idchuyenmuc} ORDER BY NgayDang DESC LIMIT 5 OFFSET 0`)
    },
    loadbaivietnoibat:()=>{
        return db.load('SELECT * FROM baiviet WHERE TrangThai="Xuất bản" ORDER BY LuotXem DESC LIMIT 3 OFFSET 0');
    },
    loadbaivietPremium:()=>{
        return db.load('SELECT * FROM baiviet WHERE TrangThai="Xuất bản" AND LoaiBaiViet="Premium"');
    },

    load10bainoibat:()=>{
        return db.load('SELECT * FROM baiviet WHERE TrangThai="Xuất bản" ORDER BY LuotXem DESC LIMIT 10 OFFSET 0');
    },
    load10baivietmoinhat:()=>{
        return db.load('SELECT * FROM baiviet WHERE TrangThai="Xuất bản" ORDER BY NgayDang DESC LIMIT 10 OFFSET 0')
    },
    loadbaivietByIDWriter:IdNguoiDung=>{
        return db.loadbaiviet(`select *from baiviet where IdNguoiDung = ${IdNguoiDung}`);
    },
    loadAllbaiviet:()=>{
        return db.loadbaiviet('select *from baiviet');
    },
    PageAllbaiviet:(limit, offset)=>{
        return db.loadbaiviet(`select *from baiviet where TrangThai='Xuất bản' limit ${limit} offset ${offset}`);
    },
    CountAllbaiviet:()=>{
        return db.loadbaiviet('select count(*) as total from baiviet where TrangThai="Xuất bản"  ');
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
        return db.load(`select * from baiviet where TrangThai='Xuất bản' and IdChuyenMucCap1 =${id} limit ${limit} offset ${offset} `);
    },
    countbaiviettheochuyenmuc:id=>{
        return db.load(`select count(*) as total from baiviet where TrangThai='Xuất bản' and IdChuyenMucCap1 =${id}`);
    },
    single:id=>{
        return db.load(`select * from baiviet where IdBaiViet =${id}`);
    },
    updateBaiViet:entity=>{
        return db.update('baiviet','IdBaiViet', entity);
    },
    deleteBaiViet:id=>{
        return db.delete('baiviet','IdBaiViet', id);
    },

    loadbaivietByIDEditor:IdChuyenMuc=>{
        return db.loadbaiviet(`SELECT * from baiviet b LEFT JOIN chuyenmuccap1 c1 on b.IdChuyenMucCap1=c1.IdChuyenMucCap1 LEFT JOIN chuyenmuccap2 c2 on c1.IdChuyenMucCap2=c2.IdChuyenMucCap2 where c2.IdChuyenMucCap2= ${IdChuyenMuc}`);
    },

};