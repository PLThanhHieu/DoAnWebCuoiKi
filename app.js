var express= require('express');
var exphbs= require('express-handlebars');
var morgan=require('morgan');



var app=express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());

var baivietModel=require('./models/baiviet.model');
app.engine('hbs',exphbs({
     defaultLayout: 'main.hbs',
     layoutsDir: 'views/_layouts',
     helpers: require('./helpers')
}));
app.set('view engine','hbs');

app.use(require('./middlewares/chuyenmuccap2'));
app.use(require('./middlewares/chuyenmuccap1'));


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

app.get('/chitiet/:id',(req,res)=>{
    var id=req.params.id;
    if(isNaN(id))
    {
        res.render('chitiet',{
            error: true,  
        });
    }
    baivietModel.chitietbaiviet(id).then(rows=>{
            if(rows.length>0){
                //console.log(res.locals.chuyenmuc);
                //console.log(res.locals.lcchuyenmuc1s);

                res.render('chitiet',{
                    error: false,
                    baiviet: rows[0],
                });
            }
            else{
                res.render('chitiet',{
                    error: true,
                     
                });
            }
        }
    ).catch(err=>{
        console.log(err);
    }); 
})
app.use('/chuyenmuc', require('./routes/baiviettheochuyenmuc.route'));
app.use('/Admin/chuyenmuc', require('./routes/Admin/chuyenmuc.route'));
app.use('/Account', require('./routes/account.route'));
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