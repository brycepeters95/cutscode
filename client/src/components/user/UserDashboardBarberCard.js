import React from 'react'
 import { Card, Button,  } from "react-bootstrap";
import Modal from './Modal';
const UserDashboardBarberCard = ({barbers,getData}) => {
 

  return (
    <Card style={{ width: "18rem" }}  className="box">
    {/* <Card.Img variant="top" src={card.image} /> */}
    <Card.Body>
      <Card.Title><h2>{barbers.name}</h2></Card.Title>
      <Button variant="contained" onClick={() => getData(barbers._id,barbers.name, barbers.email)} color="primary">
         open
        </Button>
     
      </Card.Body>
      
     
   
      {/* <Card.Text><h2>{barbers.location}</h2></Card.Text> */}
      {/* <Card.Text>{barbers.ratings}</Card.Text> */}
      {/* <Card.Button>Book Barber</Card.Button> */}
  

  </Card>
  )
}

export default UserDashboardBarberCard