const { render } = require('ejs');
const express = require('express');
const router = express.Router();
const Product = require('./models/product');
const User = require('./models/user');
//middleware
const verify = require('./middleware/verifyAccess');
const jwt = require('jsonwebtoken');
const config = require('./config');

router.get('/logOut', async (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

router.get("/", verify, async function (req, res) {
  var products = await Product.find({}).sort({ _id: 1 });
  res.render('home', { products });
});

router.get("/login", function (req, res) {
  res.render('signin');
});

router.get("/register", function (req, res) {
  res.render('register');
});

router.get("/product", function (req, res) {
  res.render('product');
});

router.get("/productsAll", async function (req, res) {
  var products = await Product.find({}).sort({ _id: 1 });
  res.render('productsAll', { products });
});

router.get("/checkout", function (req, res) {
  res.render('checkout');
});

router.get("/thankyou", function (req, res) {
  res.render('thankyou');
});

router.get("/profile", function (req, res) {
  res.render('profile');
});

router.get("/aboutus", function (req, res) {
  res.render('aboutus');
});

router.post('/register', async (req, res) => {
  console.log(req.body);
  var user = new User(req.body);
  user.password = await user.encryptPassword(user.password);
  await user.save();

  res.redirect('/');
});

router.post('/login', async (req, res) => {
  var { email, password } = req.body;

  // 1. Buscar si el usuario existe
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).send("The user does not exist");
  }
  else {
    const valid = await user.validatePassword(password);

    if (valid) {
      console.log("Password is valid");

      // CREAR EL TOKEN

      // se puede agregar lo que ocupemos al obj del token
      // ej: isAdmin:true
      const token = jwt.sign({ id: user.email }, config.secret, { expiresIn: "1h" });

      // el token es base64 se puede descifrar y ver sus datos en https://jwt.io
      console.log(token);

      // al cookie tambien se puede settear maxAge o expires, etc
      // httpOnly es mas seguro, no se pueden acceder solo con codigo
      res.cookie("token", token, { httpOnly: true });

      res.redirect("/");
    }
    else {
      console.log("Password is invalid");
      res.json('invalid');
    }
  }
});

router.post('/addToCart', async (req, res) => {
  var data = req.body;
  data.price = Number(data.price);
  data.quantity = Number(data.quantity);
  console.log(data);

  res.redirect(`/productsAll#${data.name}`);
});

module.exports = router;
