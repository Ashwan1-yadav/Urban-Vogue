const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model");

router.get("/", (req, res) => {
  res.render("index");
  
});

router.post("/users/register", async (req, res) => {
  try {
    let { email, username, password } = req.body;
    let user = await userModel.create({
        email,
        username,
        password,
    });
       res.send(user);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
