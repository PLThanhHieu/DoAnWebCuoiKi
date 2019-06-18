var express= require('express');

var morgan=require('morgan');
var app=express();
require('./middlewares/view-engine')(app);
require('./middlewares/session')(app);
require('./middlewares/passport')(app);
require('./middlewares/upload')(app);


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

var baivietModel=require('./models/baiviet.model');



app.use(require('./middlewares/chuyenmuccap2'));
app.use(require('./middlewares/chuyenmuccap1'));
app.use(require('./middlewares/auth-locals.mdw'));


app.get('/',(req,res)=>{  
    var page=req.query.page || 1;
    if(page<1) page=1;
    
    var limit = 6;
    var offset =(page-1)*limit; 
    Promise.all([
       baivietModel.PageAllbaiviet(limit,offset),
       baivietModel.CountAllbaiviet()
    ]).then(([rows, count_rows])=>{ 
        var total =count_rows[0].total;
        var nPage=Math.floor(total/limit);
        if(total%limit>0) nPage++;
        var pages=[];
        for(i=1;i<=nPage;i++)
        {
            var obj={values: i, active: i === +page};
            pages.push(obj);
        }
        res.render('home',{
            baiviets: rows,
            pages
        });
    }).catch(err=>{
        console.log(err);
    });

    
})

app.get('/chitiet/:id',(req,res,next)=>{
    var id=req.params.id;
    if(isNaN(id))
    {
        res.render('chitiet',{
            error: true,  
        });
    }
    baivietModel.single(id).then(rows=>{
            if(rows.length>0){
                var luotxem=rows[0].LuotXem;
                luotxem=luotxem+1;
                rows[0].LuotXem=luotxem;
                var entity ={
                    IdBaiViet: id,
                    LuotXem: rows[0].LuotXem
                }

                baivietModel.updateBaiViet(entity).then(()=>{
                    res.render('chitiet',{
                        error: false,
                        baiviet: rows[0],
                    });
                })
                
            }
            else{
                res.render('chitiet',{
                    error: true,
                     
                });
            }
        }
    ).catch(next); 
})
app.use('/chuyenmuc', require('./routes/baiviettheochuyenmuc.route'));
app.use('/Admin/chuyenmuc', require('./routes/Admin/chuyenmuc.route'));
app.use('/Account', require('./routes/account.route'));
app.use('/Writer',require('./routes/Writer/writer.route'));
app.use('/Editor',require('./routes/Editor/editor.router'));
app.use('/Admin/chuyenmucnho',require('./routes/Admin/chuyenmucnho.route'));
app.use('/Admin/nhantag',require('./routes/Admin/nhantag.route'));
app.use('/Admin/duyetbai',require('./routes/Admin/duyetbaiviet.route'));
app.use('/Admin/nguoidung',require('./routes/Admin/nguoidung.route'));
//app.use('/Admin/',require('./routes/Admin/admin.route'));

app.use((req,res,next)=>{
    res.render('404',{layout :false});
})

app.use((error,req,res,next)=>{
    res.render('error',{
        layout: false,
        message: error.message,
        error
    })
})

app.listen(3000,()=>{
    console.log('Web Server is running at http://localhost:3000');
})