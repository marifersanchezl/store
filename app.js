const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('./initDB');

const app = express();

// connection to db
mongoose.connect('mongodb://localhost/dosabores-store', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('db connected'))
    .catch(err => console.log(err));

// importing routes
const indexRoutes = require('./routeindex');


// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(express.urlencoded({ extended: true }));


// routes
app.use('/', indexRoutes);
app.use(express.static('public'));

// save initial product data to DB if the DB is empty

app.listen(app.get('port'), () => {
  console.log(`App listening on port ${app.get('port')}`);
});
