require('./app');

const Product = require('./models/product');

products = [
  {
    name: "Gusanitos Enchilados",
    imgHome: "gusanos.jpg",
    img: "gusanosTop.jpg",
    prices: [
      {
        size: "Pouch 250g",
        price: 50
      },
      {
        size: "Pouch 450g",
        price: 80
      },
      {
        size: "Jar 240g",
        price: 60
      },
      {
        size: "Jar 460g",
        price: 100
      }
    ]
  },
  {
    name: "Panditas Enchilados",
    imgHome: "Panditas-ANIMATION.gif",
    img: "Panditas.jpg",
    prices: [
      {
        size: "Pouch 250g",
        price: 50
      },
      {
        size: "Pouch 450g",
        price: 80
      },
      {
        size: "Jar 240g",
        price: 60
      },
      {
        size: "Jar 460g",
        price: 100
      }
    ]
  },
  {
    name: "Aros de Manzana Enchilados",
    imgHome: "arosM-ANIMATION.gif",
    img: "arosM.jpg",
    prices: [
      {
        size: "Pouch 250g",
        price: 50
      },
      {
        size: "Pouch 450g",
        price: 80
      },
      {
        size: "Jar 240g",
        price: 60
      },
      {
        size: "Jar 460g",
        price: 100
      }
    ]
  },
  {
    name: "Aros de Durazno Enchilados",
    imgHome: "arosD-ANIMATION.gif",
    img: "arosD.jpg",
    prices: [
      {
        size: "Pouch 250g",
        price: 50
      },
      {
        size: "Pouch 450g",
        price: 80
      },
      {
        size: "Jar 240g",
        price: 60
      },
      {
        size: "Jar 460g",
        price: 100
      }
    ]
  },
  {
    name: "Mix de Gomitas Enchiladas",
    imgHome: "IMG_3686-ANIMATION.gif",
    img: "IMG_3686-ANIMATION.gif",
    prices: [
      {
        size: "Pouch 250g",
        price: 50
      },
      {
        size: "Pouch 450g",
        price: 80
      },
      {
        size: "Jar 240g",
        price: 60
      },
      {
        size: "Jar 460g",
        price: 100
      }
    ]
  },
  {
    name: "Arandanos Enchilados",
    imgHome: "Arandanos.jpg",
    img: "Arandanos.jpg",
    prices: [
      {
        size: "Pouch 250g",
        price: 70
      },
      {
        size: "Pouch 450g",
        price: 100
      },
      {
        size: "Jar 240g",
        price: 80
      },
      {
        size: "Jar 460g",
        price: 120
      }
    ]
  },
  {
    name: "Cookie Bites",
    imgHome: "cookies-ANIMATION.gif",
    img: "cookies.jpg",
    prices: [
      {
        size: "Pouch chico",
        price: 80
      },
      {
        size: "Pouch grande",
        price: 150
      },
      {
        size: "Jar chico",
        price: 60
      },
      {
        size: "Jar grande",
        price: 100
      }
    ]
  },
  {
    name: "Brownies",
    imgHome: "brownie.jpg",
    img: "brownie.jpg",
    prices: [
      {
        size: "Pouch chico",
        price: 80
      },
      {
        size: "Pouch grande",
        price: 150
      },
      {
        size: "Jar grande",
        price: 100
      }
    ]
  },
  {
    name: "Nuez garapiñada",
    imgHome: "nuez.jpg",
    img: "nuez.jpg",
    prices: [
      {
        size: "Pouch chico",
        price: 80
      },
      {
        size: "Pouch grande",
        price: 150
      },
      {
        size: "Jar chico",
        price: 90
      },
      {
        size: "Jar grande",
        price: 120
      }
    ]
  }
];

Product.create(products)
  .then(db => console.log('Saved initial products in DB'))
  .catch(err => console.log(err));
