const mongoose = require('mongoose');

const BarberSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },
  city:{
    type: String,

  },
  state:{
    type: String,
  

  },
  latitude :  {
     type: String 
    },
  longitude : {
    type: String
  },
  userAddress: {
    type: String,
    required: true
  }


});

module.exports = Barber = mongoose.model('barber', BarberSchema);