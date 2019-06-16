var mysql=require('mysql');

var createConnection=()=>{
    return mysql.createConnection({
        host:'localhost',
        port:'3306',
        user:'root',
        password:'',
        database:'baodientu'
    });
}


module.exports={
    load:sql=>{
        return new Promise((resolve, reject)=>{
            var connection=createConnection();
            connection.connect();
            connection.query(sql,(error,resutls,fields)=>{
                if(error) 
                    reject(error);
                else{
                    resolve(resutls);
                }
                connection.end();
            });
        });
    },
    loadbaiviet: sql=>{
        return new Promise((resolve, reject)=>{
            var connection=createConnection();
            connection.connect();
            connection.query(sql,(error,resutls,fields)=>{
                if(error) 
                    reject(error);
                else{
                    resolve(resutls);
                }
                connection.end();
            });
        });
    }, 
    add:(tableName, entity)=>{
        return new Promise((resolve, reject)=>{
            var sql=`insert into ${tableName} set ?`;
            var connection=createConnection();
            connection.connect();
            connection.query(sql, entity,(error,value)=>{
                if(error) 
                    reject(error);
                else{
                    resolve(value.insertId);
                }
                connection.end();
            });
        });
    },

    update:(tableName,idFields, entity)=>{
        return new Promise((resolve, reject)=>{
            var sql=`update ${tableName} set ? where ${idFields}=?`;
            var id=entity[idFields];
            delete entity[idFields];
            var connection=createConnection();
            connection.connect();
            connection.query(sql, [entity,id],(error,value)=>{
                if(error) 
                    reject(error);
                else{
                    resolve(value.changedRows);
                }
                connection.end();
            });
        });
    },

    delete:(tableName,idFields, id)=>{
        return new Promise((resolve, reject)=>{
            var sql=`delete from ${tableName} where ${idFields}=?`;
            var connection=createConnection();
            connection.connect();
            connection.query(sql, id,(error,value)=>{
                if(error) 
                    reject(error);
                else{
                    resolve(value.affectedRows);
                }
                connection.end();
            });
        });
    }
};
