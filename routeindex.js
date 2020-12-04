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

  var user = await User.findOne({ email: currentUserEmail });
  var cart = await Cart.findOne({ userId: currentUserEmail });
  console.log("Cart for " + currentUserEmail);
  console.log(cart);

  if (cart == null) {
    res.render('checkout', { products: [], user: user, total: 0 });
  }
  else {
    var totalSum = 0;
    for (var i = 0; i < cart.products.length; i++) {
      totalSum += cart.products[i].price * cart.products[i].quantity;
    }

    res.render('checkout', { products: cart.products, user: user, total: totalSum });
  }
});

router.get("/thankyou", verify, function (req, res) {
  res.render('thankyou');
});

router.get("/profile", verify, async function (req, res) {
  var decodedToken = jwt.decode(req.cookies.token);
  currentUserEmail = decodedToken.id;

  var user = await User.findOne({ email: currentUserEmail });

  res.render('profile', { user: user });
});

router.get("/aboutus", verify, function (req, res) {
  res.render('aboutus');
});

router.post('/register', async (req, res) => {
  var { email, password } = req.body;
  console.log("register req.body:");
  console.log(req.body);

  // 1. Buscar si el usuario existe
  var user = await User.findOne({ email: email });

  if (user) {
    return res.status(202).send("Este correo ya está asociado a una cuenta.");
  } else {
    user = new User(req.body);
    user.password = await user.encryptPassword(user.password);
    await user.save();

    res.redirect('/');
  }
});

router.post('/login', async (req, res) => {
  var { email, password } = req.body;
  console.log("login req.body:");
  console.log(req.body);

  // 1. Buscar si el usuario existe
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).send("El usuario no existe");
  }
  else {
    const valid = await user.validatePassword(password);

    if (valid) {
      console.log("Contraseña válida");

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
      console.log("Contraseña inválida");
      res.json('invalid');
    }
  }
});

router.post('/updateProfile', async (req, res) => {
  var decodedToken = jwt.decode(req.cookies.token);
  currentUserEmail = decodedToken.id;

  var data = req.body;
  console.log('data recibida');
  console.log(data);

  var user = await User.findOne({ email: currentUserEmail });
  console.log("user de db");
  console.log(user);

  await User.updateOne({ email: currentUserEmail }, {
    firstName: data.firstName,
    lastName: data.lastName,
    address: data.address,
    address2: data.address2,
    state: data.state,
    city: data.city,
    zip: data.zip
  });

  res.redirect('/profile');
});

router.post('/addToCart', async (req, res) => {
  var decodedToken = jwt.decode(req.cookies.token);
  currentUserEmail = decodedToken.id;

  var data = req.body;
  data.price = Number(data.price);
  data.quantity = Number(data.quantity);
  console.log(data);

  if (data.quantity <= 0) {
    res.redirect(`/productsAll#${data.name}`);
    return;
  }

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

router.post('/deleteFromCart', async (req, res) => {
  data = req.body;
  console.log("Item to be deleted from cart:");
  console.log(data);

  var cart = await Cart.findOne({ userId: currentUserEmail });

  var newProducts = cart.products.filter(element => element.name != data.name || element.size != data.size);
  console.log(newProducts);

  await Cart.updateOne({ userId: currentUserEmail }, {
    products: newProducts
  });

  res.redirect('checkout');
});

router.post('/checkout', async (req, res) => {
  var decodedToken = jwt.decode(req.cookies.token);
  currentUserEmail = decodedToken.id;
  console.log(currentUserEmail);

  var data = req.body;
  console.log(data);

  var cart = await Cart.findOne({ userId: currentUserEmail });
  var total = 0;
  var products = "";
  for (var i = 0; i < cart.products.length; i++) {
    total += cart.products[i].price * cart.products[i].quantity;
    products += `Producto: ${cart.products[i].name} - ${cart.products[i].size}, Precio: $${cart.products[i].price} MXN, Cantidad: ${cart.products[i].quantity}<br>`;
  }
  console.log(total);

  var addressInfo = `<b>Enviar a:</b><br>${data.firstName} ${data.lastName}<br>`;
  addressInfo += `${data.address}${data.address2 != "" ? ", " + data.address2 : ""}<br>`;
  addressInfo += `${data.city}, ${data.state} ${data.zip}`;

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
    to: data.email,
    subject: 'Tu orden en Dosabores',
    text: `Resumen de tu orden:\n${products} \n Total: $${total} MXN\n\n${addressInfo}`,
    html: `<b>Resumen de tu orden:</b><br>${products} <br> Total: $${total} MXN<br><br>${addressInfo}`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  await Cart.deleteOne({ userId: currentUserEmail });
  res.redirect("/thankyou");
});

module.exports = router;
