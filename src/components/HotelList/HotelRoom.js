import React from 'react';

const HotelRoom = (props) => {
    const { hotelName, capacity, cancellation, facilities, ratting, photo, price } = props.room;
    return (
        <div style={ {display: 'flex', margin: 'auto', flexDirection: 'row', justifyContent: 'center',marginBottom:'10px' }}>

            <div>
                <img src={photo} alt="" />
            </div>
            <div style={{ color: 'red', fontSize: '25px', fontWeight: '300' }}>
                <div>
                    <p>hotelName:{hotelName}</p>
                    <p>capacity:{capacity}</p>
                    <p>{cancellation}</p>
                    <p>{facilities}</p>

                    <p>{ratting}</p>
                    <p>price:{price}$</p>
                </div>


            </div>



        </div>
    );
};

export default HotelRoom;