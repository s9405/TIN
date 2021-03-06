var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const playerRouter = require('./routes/playerRoute');
const playingFieldRouter = require('./routes/playingFieldRoute');
const eventRouter = require('./routes/eventRoute');
const playerApiRouter = require('./routes/api/PlayerApiRoute');
const playingFieldApiRouter = require('./routes/api/PlayingFieldApiRoute');
const eventApiRoute = require('./routes/api/EventApiRoute');
const authUtils = require('./util/authUtils');
const i18n = require('i18n');
i18n.configure({
  locales:['pl', 'en', 'de'],
  directory: path.join(__dirname, './locales'),
  objectNotation: true,
  cookie: 'dosir-lang',
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(i18n.init);
const session = require('express-session');
app.use(session({
  secret: 'my_secret_password',
  resave: false
}));
app.use((req, res, next) => {
    const loggedUser = req.session.loggedUser;
    res.locals.loggedUser = loggedUser;
    if(!res.locals.loginError) {
      res.locals.loginError = undefined;
    }
    next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  if(!res.locals.lang) {
    const currentLang = req.cookies['dosir-lang'];
    res.locals.lang = currentLang;
  }
  next();
});


app.use('/', indexRouter);
app.use('/players', authUtils.permitAuthenticatedUser, playerRouter);
app.use('/playingfields', playingFieldRouter);
app.use('/events', eventRouter);
app.use('/api/players', playerApiRouter);
app.use('/api/playingfields', playingFieldApiRouter);
app.use('/api/events', eventApiRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
