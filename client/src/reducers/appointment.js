import {

  ACCEPT_REQUEST,
    DECLINE_REQUEST,
    GET_APPOINTMENTS,
    GET_REQUEST

 } from '../actions/types';
 
 const initialState = {
   loading: true,
    appointments:[],
    requestforbarber:[],


 };
 
 // eslint-disable-next-line import/no-anonymous-default-export
 export default function (state = initialState, action) {
   const {
     type,
     payload
   } = action;
 
   switch (type) {
  
       case GET_APPOINTMENTS:
         return{
           ...state,
           appointments:payload,
           loading: false
         }
         case GET_REQUEST:
            return{
              ...state,
              requestforbarber:payload,
              loading: false
            }
          case ACCEPT_REQUEST:
            return{
              ...state,
              appointments:payload,
              requestforbarber:state.requestforbarber.filter((rq) => rq._id !== payload._id),
              loading: false
            }
            case DECLINE_REQUEST:
              return{
                ...state,
                requestforbarber:state.requestforbarber.filter((rq) => rq._id !== payload._id),
                loading: false
              }
 
 
 
     default:
       return state;
   }
 }