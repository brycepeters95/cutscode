import {

     GET_BARBERS, REQUEST_APPOINTMENT

  } from '../actions/types';
  
  const initialState = {
    loading: true,
    theBarbers:[],
 

  };
  
  // eslint-disable-next-line import/no-anonymous-default-export
  export default function (state = initialState, action) {
    const {
      type,
      payload
    } = action;
  
    switch (type) {
   
        case GET_BARBERS:
          return{
            ...state,
            theBarbers:payload,
            loading: false
          }
        case REQUEST_APPOINTMENT:
          return{
            ...state,
            loading:false
          }
  
  
  
      default:
        return state;
    }
  }