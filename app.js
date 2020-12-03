const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
var initDB = require('./initDB');
// importing routes
const indexRoutes = require('./routeindex');

const app = express();

// connection to db
mongoose.connect('mongodb://localhost/dosabores-store', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(database => {
    console.log('db connected');
    // save initial products collection to DB if the DB is empty
    mongoose.connection.db.listCollections().toArray(function (err, collections) {
      initDB();
    });
  })
  .catch(err => console.log(err));


// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// routes
app.use('/', indexRoutes);
app.use(express.static('public'));

app.listen(app.get('port'), () => {
  console.log(`App listening on port ${app.get('port')}`);
});
