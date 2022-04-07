const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Appointments = require('../../models/Appointments');
const Barber = require('../../models/Barber');
const Request = require('../../models/Request');



router.post('/accept',async (req,res) =>{
  // check time and date of other appointments before accepting
    const {rq} = req.body
   
    console.log(rq,'ll')
 
    
    try{
       appointment = new Appointments({
        barbersemail:rq.barber,
        date:rq.date,
        time:rq.time,
        amount:rq.amount,
        requesteduser:rq.requesteduser
      })
      await appointment.save();
      const deleteRequest = await Request.deleteOne({_id : rq._id})
      console.log(deleteRequest)
      res.send(appointment)
    }catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

})


router.post('/cancelrequest', (req,res) =>{
    const {rq} = req.body
  console.log(rq)
    try{

    }catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

})



router.get('/appointments',auth, async(req,res) =>{
    try{
      const theBarber = await Barber.findById(req.user.id);
      const theBarberAppointments = await Appointments.find({barber:theBarber.email})
res.send(theBarberAppointments)
    }catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

})

router.get('/request',auth,async (req,res) =>{
  console.log('hit')
    try{
      const theBarber = await Barber.findById(req.user.id).select();
      const theBarberRequest = await Request.find({barber: theBarber.email})
      res.send(theBarberRequest)
    }catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

})

router.post('/onmyway', auth,async(req,res)=>{
  try{
    console.log('onmyway')
res.sendStatus(200)
  }catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})
router.post('/cancelappointment', (req,res) =>{
  const {ap} = req.body
console.log(ap)
  try{
res.sendStatus(200)
  }catch (err) {
  console.error(err.message);
  res.status(500).send('Server Error');
}

})


module.exports = router;