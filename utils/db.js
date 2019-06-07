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
    }
};
