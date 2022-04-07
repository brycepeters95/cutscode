import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  BARBER_LOADED,
  GET_BARBERS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  // CLEAR_PROFILE,
  // EMAIL_VERIFY,
  // GET_NOTIFICATIONS,

} from './types';

import setAuthToken from '../utils/setAuthToken';
//email verify

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
     const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
 

  } catch (err) {
   
    const errors = err.response.data.errors;
    console.log(errors,'userloaded')
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      // setTimeout(() =>{
      //   window.location.reload();
      //  },1000);
    }
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
export const getBarbers = () => async (dispatch) => {

  try {
     const res = await axios.get('/api/findbarber');
    dispatch({
      type: GET_BARBERS,
      payload: res.data,
    });
 

  } catch (err) {
   
    const errors = err.response.data.errors;
    console.log(errors,'userloaded')
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      // setTimeout(() =>{
      //   window.location.reload();
      //  },1000);
    }
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
export const loadBarber = () => async (dispatch) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
       const res = await axios.get('/api/auth/barber');
      dispatch({
        type: BARBER_LOADED,
        payload: res.data,
      });
   
  
    } catch (err) {
     
      const errors = err.response.data.errors;
      console.log(errors,'userloaded')
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        // setTimeout(() =>{
        //   window.location.reload();
        //  },1000);
      }
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

// Register User
export const register = ({type, name, email, password,latitude,longitude,userAddress }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ type, name, email, password, latitude, longitude, userAddress });

  try {
    const res = await axios.post('/api/users', body, config);

    const type = res.data.type
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    if(type ==='user'){
     dispatch(loadUser());
    }
    if(type ==='barber'){
        dispatch(loadBarber());   
    }
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors)
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      // setTimeout(() =>{
      //   window.location.reload();
      //  },1000);
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const loginUser = (email, password, type) => async (dispatch) => {

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
  
    const res = await axios.post('/api/auth', body, config);
   
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
     setTimeout(() =>{
      window.location.reload();
     },1000);
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
export const loginBarber = (email, password, type) => async (dispatch) => {

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
  
    const res = await axios.post('/api/auth/barber', body, config);
   
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadBarber());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
     setTimeout(() =>{
      window.location.reload();
     },1000);
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};