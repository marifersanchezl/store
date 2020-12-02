const { render } = require('ejs');
const express = require('express');
const router = express.Router();
const Product = require('./models/product');
const Cart = require('./models/cart');

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

router.get("/aboutus", function(req, res) {
  res.render('aboutus');
});

router.post('/addToCart', async (req,res) => {
  var data = req.body;
  data.price = Number(data.price);
  data.quantity = Number(data.quantity);
  console.log(data);

  var currentUserId = "dummyId";
  var cart = await Cart.findOne({userId: currentUserId});

  if (cart == null) {
    // Add new cart with products if user does not have a cart already
    var newCartData = {
      userId: currentUserId,
      products: [data]
    }

    var newCart = new Cart(newCartData);
    await newCart.save();
    console.log("Cart for given user not found in db. Created cart for user");
  }
  else {
    // Find product with name-size combination inside products array in cart
    var productInCart = cart.products.find(element => element.name == data.name && element.size == data.size);

    if (productInCart == undefined) {
      // If product name-size combination is not in user's cart, push product to products array in cart
      cart.products.push(data);
      await cart.save();
      console.log("Added new product to existing cart");
    }
    else {
      // If product name-size combination exists in user's cart, update quantity of the given product
      productInCart.quantity += data.quantity;

      // Updating productInCart updates it in cart.products, so we can just save() the cart
      await cart.save();
      console.log("Updated product quantity in cart");
    }
  }

  res.redirect(`/productsAll#${data.name}`);
});

module.exports = router;
