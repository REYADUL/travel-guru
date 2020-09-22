import React, { createContext, useState } from 'react';

import './App.css';
import Booking from './components/Booking/Booking';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NoMatch from './components/NoMatch/NoMatch';
import HotelList from './components/HotelList/HotelList';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


export const UserContext= createContext();

function App() {

    const [loggedInUser,setLoggedInUser]=useState({});

  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
    <div className="App">
      

      <Router>

     

        <Switch>
        <Route exact path="/home">
          <Home></Home>

        </Route>

        <Route exact path="/">

          <Home></Home>

        </Route>
        <Route  exact path="/booking/:placeName">
            <Booking></Booking>
        </Route>

        <Route path="/login">
            <Login></Login>
        </Route>


        <PrivateRoute  exact path="/hotel">
            <HotelList></HotelList>
        </PrivateRoute>

        <Route exact  path="*">
            <NoMatch/>
        </Route>

        </Switch>


      </Router>

     
    
     
     
    </div>
    </UserContext.Provider>
      
  );
}

export default App;
