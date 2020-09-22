import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

const Login = () => {




    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        // newUser:'false',
        name: '',
        email: '',
        password: '',
        error: '',
        photo: '',
        success: false
    })

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: '/' } };

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }




    const handleGoogleSignIN = () => {
        var provider = new firebase.auth.GoogleAuthProvider();


        firebase.auth().signInWithPopup(provider).then(function (result) {

            var token = result.credential.accessToken;

            const { displayName, email } = result.user;
            const signedInUser = { name: displayName, email }
            setLoggedInUser(signedInUser);

            history.replace(from);

        }).catch(function (error) {
            // Handle Errors here.
            const newUserInfo = { ...user };
            newUserInfo.error = error.message;
            setUser(newUserInfo);


        });
    }

    const handleFbSignIn = () => {

        var fbProvider = new firebase.auth.FacebookAuthProvider();


        firebase.auth().signInWithPopup(fbProvider).then(function (result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;

            const { displayName, email } = result.user;

            const newUser = {
                name: displayName,
                email: email,
            }
            setLoggedInUser(newUser);
            history.replace(from);



            
        })
            .catch(function (error) {
                // Handle Errors here.
                const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                // ...
            });
    }



    //Form submission



    const handleSubmit = (event) => {

        event.preventDefault();
        console.log(user, Form);

        if (newUser && user.email && user.password) {

            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    // updateUserName(user.name);


                    history.replace(from)


                })
                .catch((error) => {

                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);

                    // 
                });

        }

        if (!newUser && user.email && user.password) {

            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };

                    newUserInfo.name = res.user.displayName;

                    newUserInfo.error = "";
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    console.log('sign in user info', res.user)
                    setLoggedInUser(newUserInfo)
                    history.replace(from)

                })


                .catch(function (error) {
                    // Handle Errors here.
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                    // ...
                });
        }


    }


    const handleBlur = (event) => {

        console.log(event.target.value);
        console.log(event.target.name);

        let isFieldValid = true;


        if (event.target.name === 'email') {

            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
            
        }
        if (event.target.name === 'password') {
           
            const isPasswordValid = event.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(event.target.value);
            isFieldValid = (isPasswordValid && passwordHasNumber);
           
        }

       
            if (user.password!==user.confirmPassword) {
                const passwordValid= {...user}
                passwordValid.error ='not matched';
                setUser(passwordValid);
            }
            
           
                  
            
         


        if (isFieldValid) {
            console.log(isFieldValid);
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }


    }


    const buttonStyle = {
        backgroundColor: "white",
        // border:"none",
        fontWeight: "700",
        margin: "5px",
        opacity: '0.8'


    }

    return (


        <div style={{ paddingBottom: "50px" }}>


            <div className="container">
                <div className="row" style={{
                    width: "60%",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    margin: 'auto',
                    padding: '20px',
                }}>


                    <div className="col-md-12">
                        <h1>{!newUser ? <p style={{ color: 'white', marginTop: "20px", marginBottom: "20px" }}> User Login</p> : <p style={{ color: 'white', marginTop: "20px", marginBottom: "20px" }}>New User Registration</p>} </h1>


                        <Form onSubmit={handleSubmit}>




                            {newUser && <Form.Group controlId="name">

                                <Form.Label>User Name</Form.Label>

                                <Form.Control onBlur={handleBlur} type="text" name='userName' placeholder="Enter Name" />


                                <Form.Text className="text-muted">

                                </Form.Text>

                            </Form.Group>}




                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name='email' onBlur={handleBlur} placeholder="Enter email" required />
                                <Form.Text className="text-muted">

                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name='password' onBlur={handleBlur} placeholder="Password" required />
                            </Form.Group>
                            {newUser &&<Form.Group controlId="formBasicPassword">

                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" name='confirmPassword' onBlur={handleBlur} placeholder="Confirm Password" required />

                            </Form.Group>}
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" label="New User" />
                            </Form.Group>




                            <br /><br />






                            <Button variant="primary" type="submit">

                                {
                                    newUser ? "SignUp" : "Log In"

                                }
                            </Button>
                        </Form>







                        <p style={{ color: 'red' }}>

                            {user.error}

                        </p>
                        {
                            user.success &&



                            <p style={{ color: 'green' }}>
                                User {
                                    newUser ? 'Created' : "Logged in"
                                }

                             Successfully</p>


                        }







                    </div>

                </div>

            </div>



            <button style={buttonStyle} onClick={handleGoogleSignIN}> <img style={{ width: "7%", marginRight: "10px" }} src="https://i.ibb.co/BsGRpCy/google.png" alt="fb"></img>Sign in with Google</button>
            <br></br>
            <button style={buttonStyle} onClick={handleFbSignIn}>  <img style={{ width: "7%", marginRight: "10px" }} src="https://i.ibb.co/VLY14d0/fb.png" alt="fb"></img>Sign in with Facebook</button>


        </div>




    );
};






export default Login;