const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
} = require("../controllers/authController");
const isLoggedIn = require("../middlewares/isLoggedIn");
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error });
});

router.get("/shop", isLoggedIn, async (req, res) => {
  let product = await productModel.find();
  let success = req.flash("success");
  res.render("shop", { product, success });
});

router.get("/cart", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({email : req.user.email}).populate("cart")
  let totalprice = (Number(user.cart[0].price)+20)- (Number(user.cart[0].discount))
  console.log(user)
  res.render("cart", {user, totalprice});
});

router.get("/addtocart/:id", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  user.cart.push(req.params.id);
  await user.save();
  req.flash("success", "Added to cart");
  res.redirect("/shop")
});

router.post("/products/create", upload.single("image"), async (req, res) => {
  try {
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
    let product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });
    req.flash("success", "product created successfully");
    res.redirect("/owners/admin");
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);

module.exports = router;
