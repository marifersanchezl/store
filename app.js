const express = require('express');
const path = require('path');

const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(express.urlencoded({ extended: true }));

// importing routes
const indexRoutes = require('./routeindex');

// routes
app.use('/', indexRoutes);
app.use(express.static('public'));

app.listen(app.get('port'), () => {
  console.log(`App listening on port ${app.get('port')}`);
});
