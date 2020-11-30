const { Schema, model } = require("mongoose");

const ProductSchema = Schema( {
    name: String,
    imgHome: String,
    img: String,
    prices: [{
        size: String,
        price: Number
    }]
});

module.exports = model('products', ProductSchema);