const createError = require('http-errors');
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const womRouter = require('./routes/wom');
const ncovRouter = require('./routes/ncov');
const historicalRouter = require('./routes/historical');
const app = express();
const swaggerJSON = require('./frontend/apidocs/sawgger_v1.json');

// view engine setup
app.set('views', require('path').join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(require('cors')({ allowedHeaders: '*' }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use(express.static(require('path').join(__dirname, 'public')));
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON, {
  explorer: false,
  customSiteTitle: 'NCOVVN API Documention',
  customCssUrl: "/css/apidocs.css",
  customfavIcon: "/img/favicon.png",
}));
app.use('/wom', womRouter);
app.use('/ncov', ncovRouter);
app.use('/historical', historicalRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const ms = require('ms');
const { executeBigScraper, executeSmallScraper } = require('./handlers/instances');

if (process.env.NODE_ENV != 'dev') {
  executeSmallScraper();
  executeBigScraper();
};

setInterval(executeBigScraper, ms('2h'));
setInterval(executeSmallScraper, ms('10m'));

module.exports = app;
