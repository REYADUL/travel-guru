import React, { useState } from 'react';
import place from '../../FakeData/place'
import Header from '../Header/Header';
import Place from '../Place/Place';


import './Home.css';

const Home = () => {

     const[places,setPlaces]= useState(place);

    return (
        <div>
          <Header></Header>
            <div className="row d-flex justify-content-between mx-auto">
      {
        places.map(place => <Place  place={place} key={place.id}></Place>)
      }
      
           </div>
        </div>
    );
};

export default Home;