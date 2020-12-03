const { render } = require('ejs');
const express = require('express');
const router = express.Router();
const Product = require('./models/product');
const Cart = require('./models/cart');
const User = require('./models/user');
//middleware
const verify = require('./middleware/verifyAccess');
const jwt = require('jsonwebtoken');
const config = require('./config');
const nodemailer = require('nodemailer');
const { getMaxListeners } = require('./models/product');

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

router.get("/productsAll", verify, async function (req, res) {
  var products = await Product.find({}).sort({ _id: 1 });
  res.render('productsAll', { products });
});

router.get("/checkout", verify, async function (req, res) {
  var decodedToken = jwt.decode(req.cookies.token);
  currentUserEmail = decodedToken.id;

  var cart = await Cart.findOne({ userId: currentUserEmail });
  console.log(cart);

  if (cart == null) {
    res.render('checkout', { products: [], userId: currentUserEmail, total: 0 });
  }
  else {
    var totalSum = 0;
    for (var i = 0; i < cart.products.length; i++) {
      totalSum += cart.products[i].price * cart.products[i].quantity;
    }

    res.render('checkout', { products: cart.products, userId: cart.userId, total: totalSum });
  }
});

router.get("/thankyou", verify, function (req, res) {
  res.render('thankyou');
});

router.get("/profile", verify, function (req, res) {
  res.render('profile');
});

router.get("/aboutus", verify, function (req, res) {
  res.render('aboutus');
});

router.post('/register', async (req, res) => {
  console.log("register req.body:");
  console.log(req.body);
  var user = new User(req.body);
  user.password = await user.encryptPassword(user.password);
  await user.save();

  res.redirect('/');
});

router.post('/login', async (req, res) => {
  var { email, password } = req.body;
  console.log("login req.body:");
  console.log(req.body);

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
  var decodedToken = jwt.decode(req.cookies.token);
  currentUserEmail = decodedToken.id;

  var data = req.body;
  data.price = Number(data.price);
  data.quantity = Number(data.quantity);
  console.log(data);

  var cart = await Cart.findOne({ userId: currentUserEmail });

  if (cart == null) {
    // Add new cart with products if user does not have a cart already
    var newCartData = {
      userId: currentUserEmail,
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

router.post('/checkout', async (req, res) => {
  var decodedToken = jwt.decode(req.cookies.token);
  currentUserEmail = decodedToken.id;

  console.log(currentUserEmail);

  var cart = await Cart.findOne({ userId: currentUserEmail });
  var total = 0;
  var products = "";
  for (var i = 0; i < cart.products.length; i++) {
    total += cart.products[i].price * cart.products[i].quantity;
    products += "Producto: " + cart.products[i].name + ", Precio: $" + cart.products[i].price + " MXN, Cantidad: " + cart.products[i].quantity + "\n";
  }
  console.log(total);

  var transporter = nodemailer.createTransport({
    service: 'outlook',
    port: 587,
    auth: {
      user: 'holadosabores@outlook.com',
      pass: 'aranaW3b'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  var mailOptions = {
    from: '"Tienda Dosabores " <holadosabores@outlook.com>',
    to: currentUserEmail,
    subject: 'Tu orden en DosSabores',
    text: `Resumen de tu orden:\n${products} \n Total: $${total} MXN`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.redirect("/thankyou");
});

module.exports = router;
