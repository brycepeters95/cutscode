import React, { Fragment, useEffect, useState } from 'react';
// import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import axios from 'axios';
// import {Button, Row, Col, Form} from 'react-bootstrap';
//use state like classes form data is the object(state)
//and setformdata is this.setstate passing in the new properties


const Register = ({setAlert,register,auth: {isAuthenticated,typeofuser} }) => {
  const [formData, setFormData] = useState({
    type:'',
    name: '',
    email: '',
    password: '',
    password2: '',
  });

    const [location,setLocation]= useState()
    const [latitude,setLatitude] = useState('')
    const [longitude,setLongitude] = useState('')

    const[userAddress, setUserAddress]=useState()

    useEffect(()=>{
      reverseGeoCode()
    },[longitude,latitude])
  

  const { type, name, email, password, password2 } = formData;


  const onChangeForm = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // const onChangeDropDown = e =>
    // setFormData({ ...formData, [e.target.name]: e.target.value });

   const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getCoordinates, handleLocationError);
      } else {
        alert("Geolocation is not supported by this browser");
      }
    }
    const getCoordinates = (position) =>{
      setLatitude( position.coords.latitude);
      setLongitude(position.coords.longitude)
     
    }

    const handleLocationError = (error) =>{
      switch(error.code){
        case error.PERMISSION.DENIED:
          alert("user denied the request for Geolocation.")
          break;
          case error.UNAVAILABLE:
          alert("unavailable")
          break;
          case error.TIMEOUT:
          alert('timedout')
          break;
          case error.UNKNOWN.ERROR:
          alert('unknown')
          break;
          default:
          alert('unknown default')
      }
    }

const reverseGeoCode = async () =>{
console.log(latitude,longitude,'ff')
  const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=false&key=${'AIzaSyBdcJQbJkKVtnS6LlBS9MozVTjJaIuxhlE'}`)
  const result = res.data
  setUserAddress(result.results[0].formatted_address)
  console.log(result)
  // .then(data => setUserAddress(data.results[0]))
}

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
      return;
    }
    if(userAddress === ''){
     return setAlert('please update current location')
    }
    register({ type, name, email, password,latitude,longitude,userAddress});
 console.log(formData)
    }
  //  }

  if (isAuthenticated) {
    if (typeofuser === 'user'){
    return <Navigate to='/userdashboard' />;
    }
    if(typeofuser === 'barber'){
    return <Navigate to='/barberdashboard' />;
    }
  }

//onSubmit={e => onSubmit(e)}
  return (
    <Fragment>
      <h1 className='large text-primaryy'>Sign Up</h1>
      <p className='lead'>

        <i className='fas fa-user' /> Create Your Account
      </p>
    
      <form className='form' onSubmit={e => onSubmit(e)} >
      <select 
                id="type"
                value={type}
                onChange={e => onChangeForm(e)}
                name="type"
            >
                <option value="">-- Select --</option>
                <option value="user">User</option>
                <option value="barber">Barber</option>
            </select>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={e => onChangeForm(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => onChangeForm(e)}
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={e => onChangeForm(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={e => onChangeForm(e)}
          />
        </div>
        <button onClick={getLocation}>Update Location</button>
        <div className='form-group'>
          <input
            type='user address' disabled
            placeholder='location'
            name='location'
            value={userAddress}
      
          />
        </div>
     
      
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
 
           


    </Fragment>
  );
};

// Register.propTypes = {
//   setAlert: PropTypes.func.isRequired,
//   register: PropTypes.func.isRequired,
//   isAuthenticated: PropTypes.bool
// };

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { setAlert, register })(Register);

