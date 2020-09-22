import React from 'react';
import {Button,Card} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';


const Place = (props) => {

    const history= useHistory();

    const {id,name,description,image}=props.place;

    const cardStyle = {
        display: 'flex',
        height: '50%',
        margin:'20px',
        // justifyContent: 'space-between'
    }
    return (
       
        <div className="col-md-3" style={cardStyle}>
         <Card style={{ width: '20rem' }}>
        
            <Card.Img style={{height: '50%'}}  variant="top" src={image}></Card.Img>
            <Card.Body>

                <Card.Title>{name}</Card.Title>
                <Card.Text>{description}</Card.Text>
               <Button  variant="warning" onClick={()=>history.push(`/booking/${name}`)} >Booking </Button>
    
    
            </Card.Body>
         </Card>
        </div>
    );
};

export default Place;