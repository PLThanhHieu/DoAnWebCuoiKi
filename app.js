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
    var p=baivietModel.loadAllbaiviet();
    p.then(rows=>{
        //console.log(rows);
        res.render('home',{
            baiviets: rows
        });
    }).catch(err=>{
            console.log(err);
        }
    );
    
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



app.listen(3000,()=>{
    console.log('Web Server is running at http://localhost:3000');
})