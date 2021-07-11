const express = require('express');
const app = express();
const path = require('path');
const authRoutes = require(path.join(__dirname, 'controllers', 'authController.js'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(authRoutes);

module.exports = app;