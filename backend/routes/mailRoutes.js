const express = require('express');
const api = express.Router();
const emailController = require('../controllers/mailController');

api.post('/sendEmail', emailController.sendEmail);

module.exports = api;
