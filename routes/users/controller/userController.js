const bcrypt = require("bcryptjs");
const User = require("../model/User");
const dbErrorHelper = require("../lib/dbErrorHelper");

async function createUser(req, res) {
   try{
      let createdUser = new User({
         email: req.body.email,
         username: req.body.username,
         password: req.body.password,
      });

      let genSalt = await bcrypt.genSalt(12);
      let hashedPassword = await bcrypt.hash(createdUser.password, genSalt);

      createdUser.password = hashedPassword;
      await createdUser.save();

      res.json({
         message: "user created",
      })

   } catch(e) {
      res.status(500).json({
         message: dbErrorHelper(e),
      })
   }
};

module.exports = {
   createUser,
}