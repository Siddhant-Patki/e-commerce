const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    id: {
      type: Number,
      unique: true, // Ensuring that productId is unique
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(AutoIncrement, { inc_field: "id" });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
