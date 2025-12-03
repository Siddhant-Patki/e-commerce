const express = require("express");
const router = express.Router();
const Product = require("../schemas/productSchema");

// filters
router.get("/api/products/category/:category", async (req, res) => {
  let { category } = req.params;

  try {
    category = category.toLowerCase();

    let products;
    if (category === "all") {
      products = await Product.find({}).exec();
    } else {
      products = await Product.find({
        category: { $regex: new RegExp(category, "i") },
      }).exec();
    }

    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
