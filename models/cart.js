const { Schema, model } = require("mongoose");

const ProductSchema = Schema( {
    userId: String,
    products: [{
        name: String,
        size: String,
        price: Number,
        quantity: Number
    }]
});

module.exports = model('carts', ProductSchema);