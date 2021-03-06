const express = require("express");

const router = express.Router();
const userController = require("../controllers/products");
const isAuth = require("../middleware/is-auth");
const allprods = require("../middleware/all-prods");

router.get("/products", isAuth, userController.getMyProduct);

router.get("/all-products", allprods, userController.getAllProduct);

router.get("/get-cart", isAuth, userController.getCart);

router.post("/post-product", isAuth, userController.postProduct);

router.post("/delete-cart/:prodId", isAuth, userController.deleteCartProduct);

router.post("/add-cart/:prodId", isAuth, userController.AddToCart);

router.get("/productDetail/:productId", userController.productDetail);

router.get("/products/:productId", userController.productPrep);

router.put("/products/edit/:prodId?", isAuth, userController.postEditProduct);

router.delete("/delete-product/:prodId", isAuth, userController.deleteProduct);

router.get("/search", userController.searchProduct);

module.exports = router;
