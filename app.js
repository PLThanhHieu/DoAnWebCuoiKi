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
     layoutsDir: 'views/_layouts'
}));
app.set('view engine','hbs');

app.get('/',(req,res)=>{
    var p=baivietModel.loadAllbaiviet();
    p.then(rows=>{
        console.log(rows);
        res.render('home',{
            baiviets: rows
        });
    }).catch(err=>{
            console.log(err);
        }
    );
    
})

app.use('/Admin/chuyenmuc', require('./routes/Admin/chuyenmuc.route'));
//app.use(require('./middlewares/locals.mdw'));


app.listen(3000,()=>{
    console.log('Web Server is running at http://localhost:3000');
})