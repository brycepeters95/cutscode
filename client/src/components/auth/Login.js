import React, { Fragment, useState } from 'react';
import { Link, Navigate} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser, loginBarber } from '../../actions/auth';
import { setAlert } from '../../actions/alert';


const Login = ({ loginUser, isAuthenticated,typeofuser, loginBarber,setAlert }) => {
  const [formData, setFormData] = useState({
    type:'',
    email: '',
    password: ''
  });
  const { email, password, type} = formData;

  const onChangeForm = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if(type === 'user'){
   await loginUser(email, password, type);
    }
    if(type === 'barber'){
      await loginBarber(email,password,type)
    }
  }





  //redirect if logged in
  if (isAuthenticated) {
      if(typeofuser === 'user'){
    return <Navigate to='/userdashboard' />;
      }
      if(typeofuser === 'barber'){
        return <Navigate to='/barberdashboard' />;
        }
  };



  return (
    <Fragment>
      <h1 className='large text-primaryy'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Sign Into Your Account
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
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
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => onChangeForm(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={e => onChangeForm(e)}
            minLength='6'
          />
        </div>
  
    
        <input type='submit' className='btn btn-primary' value='Login' />
     
      </form>
      <p className = 'my-1'>Forgot Password? Click
      <Link to = '/check-email-pw'> Here</Link>
      </p>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up!</Link>
      </p>
    </Fragment>
    // link to forget password page twigger api call to send email with random string 
  );
};
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  typeofuser: state.auth.typeofuser
});
export default connect(
  mapStateToProps,
  { loginUser, loginBarber,setAlert }
)(Login);