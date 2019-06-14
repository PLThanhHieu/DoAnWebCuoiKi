var exphbs= require('express-handlebars'); 


module.exports=function (app) {
    app.engine('hbs',exphbs({
        defaultLayout: 'main.hbs',
        layoutsDir: 'views/_layouts',
        helpers: require('../helpers')
    }));
    app.set('view engine','hbs');
}
