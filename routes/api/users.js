const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const User = require('../../models/User');
const Barber = require('../../models/Barber')


router.post(
    '/',
    [
      check('type', 'Please select a type')
        .not()
        .isEmpty(),
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check(
        'password',
        'Please enter a password with 6 or more characters'
      ).isLength({
        min: 6,
      }),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }
      //DESTRUCT from req.body frontend entered

      const { type, name, email, password, latitude, longitude, userAddress} = req.body;

console.log(name,type,email,password)
      //see if user exist by checking user email
      //if it does send error user already exist
      try {
        if (type === 'user'){
          
        let sameUser = await User.findOne({
          email
        });
        if (sameUser) {
          return res.status(400).json({
            errors: [
              {
                msg: 'email already exists',
              },
            ],
          });
        }
    
      

        //setting up avatar for user, s- size, r- rating, d- default img
        const avatar = gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm',
        });
  
        //create new instance of user, pass in object with fields we want
        user = new User({
          name,
          email,
          avatar,
          password,
          latitude,
          longitude,
          userAddress
        });
  
        //encrpyt password using bcrypt, (10)=rounds
        const salt = await bcrypt.genSalt(10);
  
        user.password = await bcrypt.hash(password, salt);
        //save user to db
     
        await user.save();
      }
        if(type === 'barber'){

          let sameBarber = await Barber.findOne({
            email
          });
          if (sameBarber) {
            return res.status(400).json({
              errors: [
                {
                  msg: 'email already exists',
                },
              ],
            });
          }
          const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm',
          });

          barber = new Barber({
            name,
            email,
            avatar,
            password,
            latitude,
            longitude,
            userAddress
          });

            //encrpyt password using bcrypt, (10)=rounds
        const salt = await bcrypt.genSalt(10);
  
        barber.password = await bcrypt.hash(password, salt);
        //save user to db
    
        await barber.save();


        //   const profile = new Profile({
        //  barber: barber.id,
        // });
        // await profile.save();
    }
    let payload;
    if(type === 'user'){
     payload = {
      user: {
        id: user.id,
      },
    };
  }
  if(type === 'barber'){
    payload = {
      user: {
        id: barber.id,
      },
    };
  }
        //take in (payload, jwtsecret), options to expire 1hr
        //!!!change to 3600 before deploying, return json token to client or err(3600= 1hr)
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          {
            expiresIn: 3600,
          },
  
          (err, token) => {
            console.log(token,'tokennnnnnnnnn')
            if (err) throw err;
   
            res.json({
              token,type
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