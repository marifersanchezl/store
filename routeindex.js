const { render } = require('ejs');
const express = require('express');
const router = express.Router();

router.get("/", function(req, res) {
  res.render('home');
});

router.get("/login", function(req, res) {
  res.render('signin');
});

router.get("/register", function(req, res) {
  res.render('register');
});

router.get("/product", function(req, res) {
  res.render('product');
});

router.get("/productsAll", function(req, res) {
  res.render('productsAll');
});

router.get("/checkout", function(req, res) {
  res.render('checkout');
});

router.get("/thankyou", function(req, res) {
  res.render('thankyou');
});

module.exports = router;
