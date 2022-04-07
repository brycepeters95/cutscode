import PropTypes from 'prop-types'
import React, { Fragment, useEffect,useState } from 'react'
import { connect } from 'react-redux'
import { Col, Row, Container,Button } from 'react-bootstrap'
import { Card } from "react-bootstrap";
import UserDashboardBarberCard from './UserDashboardBarberCard';
import { getBarbers } from '../../actions/auth';
import Spinner from '../layout/Spinner';
import Modal from './Modal';
import{requestAppointment} from '../../actions/users'
export const UserDashboard = ({
  getBarbers,
  auth:{user},
  barbers:{theBarbers},
  requestAppointment
}) => {
const [showModal, setShowModal]= useState(false);
const [tempData, setTempData] = useState([])
    useEffect(()=>{
      console.log(tempData)
      getBarbers()
    },[tempData])
    // const renderCard = (card, index) => {
    //     return (
    //       <Card style={{ width: "18rem" }} key={index} className="box">
    //         <Card.Img variant="top" src="holder.js/100px180" src={card.image} />
    //         <Card.Body>
    //           <Card.Title>{card.title}</Card.Title>
    //           <Card.Text>{card.text}</Card.Text>
    //         </Card.Body>
    //       </Card>
    //     );
    //   };

    


   
    const onSubmit = async e =>{
      console.log(user, tempData)
      // const name = {...tempData[1]}
      // const email = {...tempData[2]}
 
  
    // const theApptDetails = {...tempData}
      // console.log(theApptDetails)
      console.log(tempData)
      console.log(...tempData)
     await requestAppointment(...tempData)
     return setShowModal(false)
  }

    const getData = (id,name,email) =>{
      let data = [id,name,email];
      console.warn(data)
      setTempData([ data])
     return setShowModal(true)
    
    }

      return ( 
     
        <Fragment>
      <div className="grid">
        {theBarbers.length > 0 ? ( 
           theBarbers.map((theBarbers, index)=>(
      
    <UserDashboardBarberCard 
    barbers= {theBarbers} 
    key ={theBarbers._id} 
    showModal ={showModal}
    setShowModal ={setShowModal}
    tempData ={tempData}
    setTempData={setTempData}
    getData ={getData}
      />
 
            ))
        ):(
          <Spinner />
        )}
        {showModal === true ? <Modal  tempData={tempData} onSubmit={onSubmit} hide = {()=>setShowModal(false)}/> : ''}
      </div>
   
      </Fragment>
      )

      }

const mapStateToProps = (state) => ({
 auth:state.auth,
 barbers:state.barbers
})



export default connect(mapStateToProps, {getBarbers, requestAppointment})(UserDashboard);