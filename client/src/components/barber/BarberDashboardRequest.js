import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const BarberDashboardRequest = ({
request,
acceptRequest,
declineRequest
  }) => {
    const onClickAccept = (rq) => {
  
      console.log(rq,'rq');
      acceptRequest({rq });
  
    };
    const onClickDecline = (rq) => {
   ;
      console.log(rq);
      declineRequest({ rq});
   
    };
  
   
  
    const requests = request.map((rq) => (
      <Tr key={rq._id}>
 
  
        <Td className='hide-sm'>{rq.requesteduser.name}</Td>
      <Td className='hide-sm'>{rq.requesteduser.location}</Td>
    
        
        <Td className='hide-sm'>{rq.time}</Td>
        <Td className='hide-sm'>{rq.amount}</Td>
        <Td className='hide-sm'>{moment(rq.date).format('MMMM Do, h:mm a')}</Td>
        <Td className = 'hide-sm'>
       
             
                  <button onClick={() => onClickAccept(rq)}>Accept</button>
          <br/>
                   <button onClick={() => onClickDecline(rq)}>Decline</button>
                      
    
    
      </Td>
       </Tr>
    ));
    return (
      <Fragment>
        <h2 className='my-2' style={{ color: '#4f8737' }}>
          Request
        </h2>
        <div className='table-responsive'>
          <Table className='table table-dark table-bordered'>
    
            <Thead>
              <Tr>
                <Th className='hide-sm'>Name</Th>
                <Th className='hide-sm'>Location</Th>
                <Th className='hide-sm'>Time</Th>
                <Th className ='hide-sm'>Amount</Th>
                <Th className='hide-sm'>Date</Th>
                <Th className='hide-sm'>Decision</Th>
                {/* <Th className='hide-sm'>Description</Th> */}
           
           
              </Tr>
            </Thead>
            <Tbody>{requests}</Tbody>
          </Table>
          </div> 
      </Fragment>
    );
  };
  
  BarberDashboardRequest.propTypes = {};
  
  export default BarberDashboardRequest;
  