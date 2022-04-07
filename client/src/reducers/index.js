import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
// import profile from './profile';
import barbers from './barbers';
import appointment from './appointment';


export default combineReducers({
  alert,
  auth,
  barbers,
  appointment

});
