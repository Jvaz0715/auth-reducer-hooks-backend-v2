var express = require('express');
var router = express.Router();

const {
  createUser,
  login,
  getAllUsers,
  deleteUserById
} = require("./controller/userController")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// to track users created, create getAllUsers GET
router.get("/get-all-users", getAllUsers);
router.delete("/delete-user-by-id/:id", deleteUserById);

router.post("/create-user", createUser);

router.post("/login", login);

module.exports = router;
