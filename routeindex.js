const express = require('express');
const router = express.Router();
const path = require('path');

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "pages/home.html"));
});

router.get("/login", function(req, res) {
  res.sendFile(path.join(__dirname, "pages/signin.html"));
});

router.get("/register", function(req, res) {
  res.sendFile(path.join(__dirname, "pages/register.html"));
});

router.get("/product", function(req, res) {
  res.sendFile(path.join(__dirname, "pages/product.html"));
});

router.get("/productsAll", function(req, res) {
  res.sendFile(path.join(__dirname, "pages/productsAll.html"));
});

router.get("/checkout", function(req, res) {
  res.sendFile(path.join(__dirname, "pages/checkout.html"));
});

router.get("/thankyou", function(req, res) {
  res.sendFile(path.join(__dirname, "pages/thankyou.html"));
});

module.exports = router;
