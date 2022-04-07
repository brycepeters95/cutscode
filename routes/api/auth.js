const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');



const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User');
const Barber = require('../../models/Barber');

// const { request } = require('https');
// @route    GET api/auth
// @desc     get user by token
// @access   Private

//whenever we want to use middleware(auth) add it as second parm to make route protected
//since we used token which has id we can access anywhere in protected route(req.user.id)
router.get('/', auth, async (req, res) => {
  try {
    const theUser = await User.findById(req.user.id).select('-password');
  

    const user = {theUser}
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/barber', auth, async (req, res) => {
  try {
    console.log('get')
    const theUser = await Barber.findById(req.user.id).select('-password');
   

    const user = {theUser}
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/auth
// @desc     Authenticate user & get token & login user
// @access   Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    //might change email to username
    const { email, password} = req.body;
  
  
    
    try {
    
      let user = await User.findOne({
        email,
      });
 console.log(user,'f')
      //check to see if their is not a user
      if (!user) {
     
        return res.status(400).json({
          errors: [
            {
              msg: 'Invalid Credentials',
            },
          ],
        });
      }
      console.log('2')
      //bcrypt has method to compare plain text password and encrpyt password
      const isMatch = await bcrypt.compare(password, user.password);
      //if password do not match
      if (!isMatch) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Invalid Credentials',
            },
          ],
        });
      }
console.log('3')

      const payload = {
        user: {
          id: user.id,
        },
      };
      console.log(payload, 'userloggedin')
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          
          res.json({
            token,
            user
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
router.post(
  '/barber',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    //might change email to username
    const { email, password,} = req.body;

  
    
    try {
    
      let barber = await Barber.findOne({
        email,
      });
      console.log(barber)
      //check to see if their is not a user
      if (!barber) {
  
        return res.status(400).json({
          errors: [
            {
              msg: 'Invalid Credentials',
            },
          ],
        });
      }
      //bcrypt has method to compare plain text password and encrpyt password
      const isMatch = await bcrypt.compare(password, barber.password);
      //if password do not match
      if (!isMatch) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Invalid Credentials',
            },
          ],
        });
      }


      const payload = {
      user: {
          id: barber.id,
        },
      };

      console.log(payload, 'userloggedin')
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            barber
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);


module.exports = router;