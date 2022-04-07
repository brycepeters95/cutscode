const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Appointments = require('../../models/Appointments');
const Barber = require('../../models/Barber');
const Request = require('../../models/Request');
const User = require('../../models/User');

//find all barbers
router.get('/', auth, async(req,res)=>{
    try{
        const barbers = await Barber.find();
        res.json(barbers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
})

//find by closet
router.get('/findbycloset', auth, async(req,res)=>{
    try{
        const barbers = await User.find({type: barber});
        res.json(barbers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
})



//find by best reviews

router.get('/findbybestreviews', auth, async(req,res)=>{
    try{
        const barbers = await User.find({type: barber});
        res.json(barbers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
})



//find by most reviews

router.get('/findbymostreviewsm', auth, async(req,res)=>{
    try{
        const barbers = await User.find({type: barber});
        res.json(barbers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
})

//req.barber check his appointment and hr seperated, make new barber request
router.post('/bookbarber', auth, async(req,res)=>{
    //  const {tempdata} = req.body
    try{
console.log(req.body)
const barberemail = req.body[2]
console.log(barberemail)
// console.log(theApptDetails,'f')
// console.log(theApptDetails.values)
        const user = await User.findOne({_id: req.user.id}, 'name userAddress');
        const name = user.name
        const location = user.userAddress
        console.log(user)
        const barbersappointment = await Appointments.find({barberemail: barberemail});
        //if time conflict decline booking if not create new request
        let request = new Request ({
            barber:barberemail,
            requesteduser: {name,location},
            time: 10,
            amount:20
        })
        console.log(request)
            await request.save();

          

    //    })
        res.send('request sent');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
})


module.exports = router;