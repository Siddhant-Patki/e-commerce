const express = require("express");
const router = express.Router();
const Product = require("../schemas/productSchema");
const multer = require("multer");
const path = require("path");

// storage for images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "..", "client", "public", "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// add product
router.post("/add-product", upload.single("image"), async (req, res) => {
  try {
    const { name, description, rating, price, category } = req.body;
    const image = `/uploads/${req.file.filename}`;

    const newProduct = new Product({
      image,
      name,
      description,
      rating,
      price,
      category,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// products count
router.get("/products/count", async (req, res) => {
  try {
    const count = await Product.countDocuments();
    res.status(200).json({ totalProducts: count });
  } catch (error) {
    console.error("Error fetching product count:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// delete product by auto-increment id
router.delete("/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const productId = parseInt(id);
    const deletedProduct = await Product.findOneAndDelete({ id: productId });

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
