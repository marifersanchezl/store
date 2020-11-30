const { render } = require('ejs');
const express = require('express');
const router = express.Router();

products = [
  {
    name: "Gusanitos Enchilados",
    desc: "gusanos",
    prices: [
      {
        size: "Pouch 250g",
        price: "$50"
      },
      {
        size: "Pouch 450g",
        price: "$80"
      },
      {
        size: "Jar 240g",
        price: "$60"
      },
      {
        size: "Jar 460g",
        price: "$100"
      }
    ],
    imgHome: "gusanos.jpg",
    img: "gusanosTop.jpg"
  },
  {
    name: "Panditas Enchilados",
    desc: "panditas",
    prices: [
      {
        size: "Pouch 250g",
        price: "$50"
      },
      {
        size: "Pouch 450g",
        price: "$80"
      },
      {
        size: "Jar 240g",
        price: "$60"
      },
      {
        size: "Jar 460g",
        price: "$100"
      }
    ],
    imgHome: "Panditas-ANIMATION.gif",
    img: "Panditas.jpg"
  },
  {
    name: "Aros de Manzana Enchilados",
    desc: "manzana",
    prices: [
      {
        size: "Pouch 250g",
        price: "$50"
      },
      {
        size: "Pouch 450g",
        price: "$80"
      },
      {
        size: "Jar 240g",
        price: "$60"
      },
      {
        size: "Jar 460g",
        price: "$100"
      }
    ],
    imgHome: "arosM-ANIMATION.gif",
    img: "arosM.jpg"
  },
  {
    name: "Aros de Durazno Enchilados",
    desc: "durazno",
    prices: [
      {
        size: "Pouch 250g",
        price: "$50"
      },
      {
        size: "Pouch 450g",
        price: "$80"
      },
      {
        size: "Jar 240g",
        price: "$60"
      },
      {
        size: "Jar 460g",
        price: "$100"
      }
    ],
    imgHome: "arosD-ANIMATION.gif",
    img: "arosD.jpg"
  },
  {
    name: "Mix de Gomitas Enchiladas",
    desc: "gomitas",
    prices: [
      {
        size: "Pouch 250g",
        price: "$50"
      },
      {
        size: "Pouch 450g",
        price: "$80"
      },
      {
        size: "Jar 240g",
        price: "$60"
      },
      {
        size: "Jar 460g",
        price: "$100"
      }
    ],
    imgHome: "IMG_3686-ANIMATION.gif",
    img: "IMG_3686-ANIMATION.gif",
  },
  {
    name: "Arandanos Enchilados",
    desc: "arandanos",
    prices: [
      {
        size: "Pouch 250g",
        price: "$70"
      },
      {
        size: "Pouch 450g",
        price: "$100"
      },
      {
        size: "Jar 240g",
        price: "$80"
      },
      {
        size: "Jar 460g",
        price: "$120"
      }
    ],
    imgHome: "Arandanos.jpg",
    img: "Arandanos.jpg"
  },
  {
    name: "Cookie Bites",
    desc: "cookies",
    prices: [
      {
        size: "Pouch chico",
        price: "$80"
      },
      {
        size: "Pouch grande",
        price: "$150"
      },
      {
        size: "Jar chico",
        price: "$60"
      },
      {
        size: "Jar grande",
        price: "$100"
      }
    ],
    imgHome: "cookies-ANIMATION.gif",
    img: "cookies.jpg"
  },
  {
    name: "Brownies",
    desc: "brownies",
    prices: [
      {
        size: "Pouch chico",
        price: "$80"
      },
      {
        size: "Pouch grande",
        price: "$150"
      },
      {
        size: "Jar grande",
        price: "$100"
      }
    ],
    imgHome: "brownie.jpg",
    img: "brownie.jpg"
  },
  {
    name: "Nuez garapiñada",
    desc: "nuez",
    prices: [
      {
        size: "Pouch chico",
        price: "$80"
      },
      {
        size: "Pouch grande",
        price: "$150"
      },
      {
        size: "Jar chico",
        price: "$90"
      },
      {
        size: "Jar grande",
        price: "$120"
      }
    ],
    imgHome: "nuez.jpg",
    img: "nuez.jpg"
  },
];

router.get("/", function(req, res) {
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

router.get("/productsAll", function(req, res) {
  res.render('productsAll', {products});
});

router.get("/checkout", function(req, res) {
  res.render('checkout');
});

router.get("/thankyou", function(req, res) {
  res.render('thankyou');
});

module.exports = router;
