var db=require('../utils/db');

module.exports={
    allTag:()=>{
        return db.load('select * from nhantag');
    },
    allTagandBaiViet:()=>{
        return db.load('SELECT n.IdTag, n.TenTag, b.IdBaiViet, b.TieuDe from nhantag n LEFT JOIN tagcuabaiviet tb on n.IdTag=tb.IdTag LEFT JOIN baiviet b on tb.IdBaiViet=b.IdBaiViet');
    },
 
    addTag:entity=>{
        return db.add('nhantag', entity);
    }, 
    single:id=>{
        return db.load(`SELECT n.IdTag, n.TenTag, b.IdBaiViet, b.TieuDe from nhantag n LEFT JOIN tagcuabaiviet tb on n.IdTag=tb.IdTag LEFT JOIN baiviet b on tb.IdBaiViet=b.IdBaiViet where n.IdTag =${id}`);
    },
    updateTag:entity=>{
        return db.update('nhantag','IdTag', entity);
    },
    deleteTag:id=>{
        return db.delete('nhantag','IdTag', id);
    },
    addTagCuabaiViet: entity=>{
        return db.add('tagcuabaiviet', entity);
    }
};