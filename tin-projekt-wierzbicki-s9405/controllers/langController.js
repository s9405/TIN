const i18n = require('i18n');

exports.changeLang = (req, res, next) =>{
    const newLang = req.params.lang;
    if(['pl', 'en', 'de'].includes(newLang)) {
        res.cookie('dosir-lang', newLang);
    };
    res.redirect('/');
}