const { render } = require('ejs');
const express = require('express');
const router = express.Router();

productsHome = [
  {
    name: "Panditas Enchilados",
    desc: "panditas",
    img: "Panditas-ANIMATION.gif"
  },
  {
    name: "Gusanitos Enchilados",
    desc: "gusanos",
    img: "gusanos.jpg"
  },
  {
    name: "Cookie Bites",
    desc: "cookies",
    img: "cookies-ANIMATION.gif"
  },
  {
    name: "Brownies",
    desc: "brownies",
    img: "brownie.jpg"
  },
  {
    name: "Aros de Durazno Enchilados",
    desc: "durazno",
    img: "arosD-ANIMATION.gif"
  },
  {
    name: "Aros de Manzana Enchilados",
    desc: "manzana",
    img: "arosM-ANIMATION.gif"
  },
  {
    name: "Arandanos Enchilados",
    desc: "arandanos",
    img: "Arandanos.jpg"
  },
  {
    name: "Mix de Gomitas Enchiladas",
    desc: "gomitas",
    img: "IMG_3686-ANIMATION.gif"
  },
];

router.get("/", function(req, res) {
  res.render('home', {productsHome});
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
