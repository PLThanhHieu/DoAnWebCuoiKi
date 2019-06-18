var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from nguoidung');
  },

  single: id => {
    return db.load(`select * from nguoidung where IdNguoiDung = ${id}`);
  },

  singleByUserName: userName => {
    return db.load(`select * from nguoidung where TaiKhoan = '${userName}'`);
  },
  singleByEmail: email => {
    return db.load(`select * from nguoidung where Email = '${email}'`);
  },
  add: entity => {
    return db.add('nguoidung', entity);
  },

  updateUser: entity => {
    return db.update('nguoidung', 'IdNguoiDung', entity);
  },

  deleteUser: id => {
    return db.delete('nguoidung', 'IdNguoiDung', id);
  },

  

};