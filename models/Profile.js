const mongoose = require('mongoose');

//array of anything would be like type:[string]
const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'barber',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  reviews:{
    type:Number
  },
  about:{
    type:String
  },
  Work:{
    type:String
  }

});

module.exports = Profile = mongoose.model('profile', ProfileSchema);