const jwt = require('jsonwebtoken');
const config = require('config');
//next is callback we have to run to go to next piece of middle ware
module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({
      msg: 'No token, authorization denied'
    });
  }

  // Verify token by decoding token(verify)
  //if token is valid decoded it 
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    //set req.user to that decode token, now can use req.user in any protected routes
    req.user = decoded.user;
    next();
    //if there is token but not valid
  } catch (err) {
    res.status(401).json({
      msg: 'Token is not valid'
    });
  }
};