const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const flash = require("connect-flash")
const jwt = require("jsonwebtoken");
const {generateToken} = require("../utils/generateToken")
const cookieparser = require("cookie-parser");


module.exports.registerUser = async (req, res) => {
  try {
    let { email, username, password } = req.body;
    let user = await userModel.findOne({email : email})
    if(user) return res.send("You already have an account please login")
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return res.send(err.message);
        else {
          let user = await userModel.create({
            email,
            username,
            password: hash,
          });
          let token = generateToken(user);
          res.cookie("user cookie", token);
          res.send("user created successfully");
        }
      });
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.loginUser = async (req,res) =>  {
  let {email, password} = req.body
  let user = await userModel.findOne({email : email})
  if(!user) return res.send("Invalid email or password")
  let isMatch = await bcrypt.compare(password, user.password, function(err, result) {
    if(result) {
      let token = generateToken(user);
      res.cookie("token", token);
      res.redirect("shop")
    } else {
      req.flash("error","Invalid email or password")
    }

  })

}

module.exports.logout = async (req,res) => {
   res.cookie("token", "")
   res.redirect("/")
}