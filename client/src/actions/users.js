import axios from 'axios';
import { ModalBody } from 'react-bootstrap';
import { setAlert } from './alert';
import {
    REQUEST_APPOINTMENT,
    AUTH_ERROR

} from './types';






export const requestAppointment= (tempData) => async (dispatch) => {

console.log(tempData)
    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
    try {
      
       const res = await axios.post('/api/findbarber/bookbarber', tempData,config);
      dispatch({
        type: REQUEST_APPOINTMENT,
        payload: res.data,
      });
      dispatch(setAlert('request sent','success'));
      // setTimeout(() =>{
      //   window.location.reload();
      //  },750);
   
  
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