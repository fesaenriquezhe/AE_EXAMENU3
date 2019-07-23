const mongoose = require('mongoose');

let productSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String
  },
  description: {
    type: String,
    required:true
  },
  keywords: [String],
  comments: [String],
  calif:[Number]
});

const productModel = mongoose.model('Producto', productSchema, 'productos');

module.exports = productModel;