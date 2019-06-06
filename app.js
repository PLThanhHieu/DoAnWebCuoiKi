var express= require('express');
var exphbs= require('express-handlebars');

var app=express();

app.engine('hbs',exphbs({
     defaultLayout: 'main.hbs',
     layoutsDir: 'views/_layouts'
}));
app.set('view engine','hbs');

app.get('/',(req,res)=>{
    
    res.render('home');
})

app.use('/Vanlai/baiviet', require('./routes/Vanlai/baiviet.route'));

app.listen(3000,()=>{
    console.log('Web Server is running at http://localhost:3000');
})