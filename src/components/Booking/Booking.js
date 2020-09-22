import React, { useEffect, useState } from 'react';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import place from '../../FakeData/place'

const Booking = () => {
   
    const {placeName}=useParams();
    const data = place.find((item) => item.name === placeName);
    const {description,name} =data;

   
    const styles ={
        height:'610px',padding:'255px',fontSize:'50px',opacity:'0.8',textAlign:'center',color:'#DE3163'
        
    }
    
    return (

     

        <div style={styles} >


          <div style={{margin:'10px'}}>
          <h>Your Destination:{name}</h>
         
          </div>
           
    <Form>

    <InputGroup className="mb-3">
            <InputGroup.Prepend>
            <InputGroup.Text>Origin</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl  placeholder="Dhaka" />
            </InputGroup>
            <InputGroup  className="mb-3">
            <InputGroup.Prepend>
            <InputGroup.Text>Destination</InputGroup.Text>
            
            </InputGroup.Prepend>
            <FormControl  aria-label="Destination"  value={placeName} required />
            
    </InputGroup>
    

    <Link to={"/hotel"}><Button variant="warning" type="submit">Start Booking</Button></Link>
      
    </Form>
    
    
    </div>
    );
};

export default Booking;