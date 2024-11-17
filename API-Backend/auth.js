const jwt = require('jsonwebtoken');


const SECRET_KEY = 'oh_lord_my_lord';


const generateToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); 
};

module.exports = { generateToken, SECRET_KEY };
