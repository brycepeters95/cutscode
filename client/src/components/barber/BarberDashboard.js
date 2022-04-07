import PropTypes from 'prop-types'
import React, { Fragment, useEffect,useState } from 'react'
import { connect } from 'react-redux'
import { Col, Row, Container } from 'react-bootstrap'
import { Card } from "react-bootstrap";

import {  getRequest,acceptRequest, declineRequest, getAppointments, onMyWay,cancelAppointment } from '../../actions/barber';
import BarberDashboardAppointments from './BarberDashboardAppointments';
import BarberDashboardRequest from './BarberDashboardRequest';
import Spinner from '../layout/Spinner';

export const BarberDashboard = ({
     getRequest,
     getAppointments,
   acceptRequest,
   onMyWay,
   cancelAppointment,
   declineRequest,
  auth:{user,loading},
  appointment:{requestforbarber, appointments}
}) => {
  // const [barbersRequest,setBarbersRequest]= useState([]);
// make state for appointment because you will accept request change appt table rerender
    useEffect(()=>{
      getRequest()
      getAppointments()
      // setBarbersRequest([appointment])
      // console.log(barbersRequest)
    },[getRequest,getAppointments])
  
    
      return  ( 
        <Fragment>
   <BarberDashboardAppointments appointments={appointments} onMyWay={onMyWay} cancelAppointment={cancelAppointment}  />
  <BarberDashboardRequest request={requestforbarber} acceptRequest={acceptRequest} declineRequest={declineRequest} />
  </Fragment>
      )

      }

const mapStateToProps = (state) => ({
 auth:state.auth,
appointment:state.appointment
})



export default connect(mapStateToProps, {getRequest, acceptRequest, declineRequest,getAppointments,onMyWay,cancelAppointment})(BarberDashboard);
