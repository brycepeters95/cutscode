import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_APPOINTMENTS,
    GET_REQUEST,
    AUTH_ERROR,
    ACCEPT_REQUEST,
    DECLINE_REQUEST,
    ON_MY_WAY,
    CANCEL_APPOINTMENT,
//   LOGOUT,
//   CLEAR_PROFILE,
//   EMAIL_VERIFY,
//   GET_NOTIFICATIONS,

} from './types';






export const getAppointments = () => async (dispatch) => {
  
    try {
       const res = await axios.get('/api/scheduler/appointments');
      dispatch({
        type: GET_APPOINTMENTS,
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


export const getRequest = () => async (dispatch) => {
  
    try {
       const res = await axios.get('/api/scheduler/request');
      dispatch({
        type: GET_REQUEST,
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

  export const acceptRequest = (rq) => async (dispatch) => {
    try {

      const res = await axios.post('/api/scheduler/accept', rq);
  
      dispatch({
        type: ACCEPT_REQUEST,
        payload: res.data,
      });
    dispatch(setAlert('REQUEST ACCEPTED'));
      setTimeout(() =>{
        window.location.reload();
       },750);
    } catch (err) {
    console.log(err)
    }
  }
    export const declineRequest = (rq) => async (dispatch) => {
      try {
    
        const res = await axios.post('/api/scheduler/decline', rq);
    
        dispatch({
          type: DECLINE_REQUEST,
          payload: res.data,
        });
      dispatch(setAlert('REQUEST DECLINED'));
        setTimeout(() =>{
          window.location.reload();
         },750);
      } catch (err) {
      console.log(err)
      }
    }

    export const onMyWay = (ap) => async (dispatch) => {
      try {
    
        const res = await axios.post('/api/scheduler/onMyWay',ap);
    
        dispatch({
          type: ON_MY_WAY,
          payload: res.data,
        });
      } catch (err) {
      console.log(err)
      }
    }
    export const cancelAppointment = (ap) => async (dispatch) => {
      try {
    
        const res = await axios.post('/api/scheduler/cancelappointment', ap);
    
        dispatch({
          type: CANCEL_APPOINTMENT,
          payload: res.data,
        });
      } catch (err) {
      console.log(err)
      }
    }
