const express = require("express");
const userController = require("../controllers/usersController");
const api = express.Router();

api.post("/sign_up", userController.sign_up);
api.post("/login", userController.login);
api.get("/getUsers", userController.getUsers);
api.get("/getUsersAll", userController.getUsersAll);
api.delete("/deleteUser/:id", userController.deleteUser);
api.get("/getUserByEmail/:email", userController.getUserByEmail);

module.exports = api;