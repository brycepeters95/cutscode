const mongoose = require('mongoose');

//array of anything would be like type:[string]
const AppointmentsSchema = new mongoose.Schema({
  barbersemail: {
   type:String
  },
  date: {
    type: Date,
    default: Date.now,
  },
  requesteduser:{
   type:Object
  },
  time:{
    type:String
  },
  amount:{
    type:String
  }

});

module.exports = Appointments = mongoose.model('appointments', AppointmentsSchema);