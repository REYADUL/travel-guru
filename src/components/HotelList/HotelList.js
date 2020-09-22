import userEvent from '@testing-library/user-event';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import hotel from '../../FakeData/hotel';
import HotelRoom from './HotelRoom';

const HotelList = () => {

    const[loggedInUser,setLoggedInUser]= useContext(UserContext);
    const [hotels,setHotel]= useState(hotel);

    
    return (
        <div>
           
            <p style={{ color: 'white', marginTop: "20px", marginBottom: "20px",fontSize:'40px'}}>User:{loggedInUser.email  }</p>
           
            {
                hotels.map(room=><HotelRoom room={room}></HotelRoom>)
            }
        </div>
    );
};

export default HotelList;