const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");
const filterRoutes = require("./filterRoutes");

router.use(authRoutes);
router.use(userRoutes);
router.use(productRoutes);
router.use(filterRoutes);

module.exports = router;
