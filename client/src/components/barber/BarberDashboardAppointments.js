import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import moment from 'moment';
import { Link } from 'react-router-dom';

const BarberDashboardAppointments = ({
  appointments,
  cancelAppointment,
  onMyWay
  }) => {
   
    const onClickOnMyWay = (ap) => {
        onMyWay({ap});
      };
      const onClickCancel = (ap) => {
        cancelAppointment({ap});
      };
    
  
    const barberAppointments = appointments.map((ap) => (
      <Tr key={ap._id}>
      
     
        <Td className='hide-sm'>{ap.requesteduser.name}</Td>
        <Td className='hide-sm'>{ap.requesteduser.location}</Td>
        <Td className='hide-sm'>{moment(ap.date).format('MMMM Do, h:mm a')}</Td>
        <Td className ='hide-sm'>{ap.time}</Td>
        <Td className='hide-sm'>{ap.amount}</Td>
        <Td className = 'hide-sm'><button>chat</button></Td>
        <Td className = 'hide-sm'>
       
             
       <button onClick={() => onClickOnMyWay(ap)}>ON MY WAY!</button>
<br/>
        <button onClick={() => onClickCancel(ap)}>CANCEL</button>
           


</Td>
      </Tr>
    ));
    return (
      <Fragment>
        <h2 className='my-2' style={{ color: '#4f8737' }}>
            appointments
        </h2>
        <div className='table-responsive'>
          <Table className='table table-dark table-bordered'>
    
            <Thead>
              <Tr>
                <Th className='hide-sm'>Name</Th>
                <Th className='hide-sm'>location</Th>
                <Th className='hide-sm'>date</Th>
                <Th className='hide-sm'>Time</Th>
                <Th className ='hide-sm'>amount</Th>
                <Th className='hide-sm'>chat</Th>
                <Th className='hide-sm'>Decision</Th>
              </Tr>
            </Thead>
            <Tbody>{barberAppointments}</Tbody>
          </Table>
          </div> 
      </Fragment>
    );
  };
  
 BarberDashboardAppointments.propTypes = {};
  
  export default BarberDashboardAppointments;
  