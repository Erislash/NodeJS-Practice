require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
const { Sequelize } = require('sequelize');

const path = require('path');
const authRoutes = require(path.join(__dirname, 'routes', 'authRoutes.js'));

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// view engine
app.set('view engine', 'ejs');

// database connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: 'localhost',
  dialect: 'mariadb'
});


sequelize.authenticate()
.then(res => {
  console.log('Connection has been established successfully.');
  app.listen(PORT, () => {
    console.log('Server running on port ' + PORT + '...');
  });
})
.catch(error => {
  console.error('Unable to connect to the database:', error);
});




// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);
