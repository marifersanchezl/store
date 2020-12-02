const { render } = require('ejs');
const express = require('express');
const router = express.Router();
const Product = require('./models/product');

router.get("/", async function(req, res) {
  var products = await Product.find({}).sort({_id: 1});
  res.render('home', {products});
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

router.get("/productsAll", async function(req, res) {
  var products = await Product.find({}).sort({_id: 1});
  res.render('productsAll', {products});
});

router.get("/checkout", function(req, res) {
  res.render('checkout');
});

router.get("/thankyou", function(req, res) {
  res.render('thankyou');
});

router.get("/profile", function(req, res) {
  res.render('profile');
});

router.post('/addToCart', async (req,res) => {
  var data = req.body;
  data.price = Number(data.price);
  data.quantity = Number(data.quantity);
  console.log(data);
  
  res.redirect(`/productsAll#${data.name}`);
});

module.exports = router;
