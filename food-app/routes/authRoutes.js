const express = require('express');
const { registerController } = require('../controllers/authController');
const { loginController } = require('../controllers/authController');
 

const router = express.Router();

// REGISTER ROUTE || POST
router.post('/register', registerController); 

//Login || POST
router.post('/login', loginController );

module.exports = router; 
