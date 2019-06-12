var hbs_sections=require('express-handlebars-sections');

module.exports = {
    ifeq: function(a, b, options){
      if (a === b) {
        return options.fn(this);
        }
      return options.inverse(this);
    },
    section: hbs_sections()
  }