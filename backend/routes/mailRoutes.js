const express = require('express');
const api = express.Router();
const emailController = require('../controllers/mailController');

api.post('/sendEmail', emailController.sendEmail);
api.post('/sendEmailSingUp', emailController.sendEmailSingUp);
module.exports = api;
