const mongoose = require('mongoose');

//array of anything would be like type:[string]
const RequestSchema = new mongoose.Schema({
  barber:{
    type:String
    
  },
  date: {
    type: Date,
    default: Date.now,
  },
  requesteduser:{
      name:{

      },
      location:{

      }
  },
  time:{
    type:Number
  },
  amount:{
    type:Number
  }

});

module.exports = Request = mongoose.model('request', RequestSchema);