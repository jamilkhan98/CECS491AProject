import React, { Component } from 'react';
import "./Login.css"
import { Nav } from 'react-bootstrap';
import styled from 'styled-components';
import firebase from '../Backend/Firestore';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const Styles = styled.div `
    .nav-link {
        color: green;
        &:hover{
            color: red;
        }
    }
`;

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({formErrors, ...rest}) => {
    let valid = true;
    
    //Validate form errors being empty
    Object.values(formErrors).forEach(val=>{
        val.length > 0 && (valid = false);
    });

    //Validate the form was filled out
    Object.values(rest).forEach(val => {
        val == null && (valid = false)
    });

    return valid;
}

class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            formErrors:{
                email: "",
                password: ""
            }
        };
    }

    componentDidMount() {
        document.getElementsByTagName("nav")[0].className = "navbar navbar-expand-lg navbar-dark collapse";
    }

    componentDidUpdate() {
        document.getElementsByTagName("nav")[0].className = "navbar navbar-expand-lg navbar-dark collapse";
    }

    handleSubmit = e => {
        e.preventDefault();
        var email = document.getElementById("loginEmail").value
        var pass = document.getElementById("loginPass").value
        if(emailRegex.test(email) && pass.length >= 6){
            firebase.auth().signInWithEmailAndPassword(email, pass)
            .then(function(){
                console.log(`
                    --SUBMITTING--
                    Email: ${email}
                    Password: ${pass}
                `);
                setTimeout(() => {
                    window.location.replace("/profile");
                }, 1000);
            })
            .catch(e => {window.alert("User could not be signed in.");});

            this.setState({
                email: "",
                password: ""
            });
        } else {
            console.error('FORM INVALID - DISPLAY ERROR MESSAGE');
            window.alert("Your account email or password is incorrect.");
        }
    };

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;

        switch(name){
            case 'email':
                formErrors.email = emailRegex.test(value) ? '' : 'invalid email address';
                break;
            case 'password':
                formErrors.password = document.getElementById("loginPass").value.length < 6 ? "minimum 6 characters required" : "";
                break;
            default:
                break;
        }

        this.setState({formErrors, [name]: value}, () => console.log(this.state))
    }


    state={isSignedIn:false}
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccess: () => false
        }
    }

    componentDidMount = () =>{

        firebase.auth().onAuthStateChanged(user =>{
            this.setState({isSignedIn: !!user})
        })
    }

    login = e => {
        e.preventDefault();
        firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    render() {
        const {formErrors} = this.state;
        return (
            <div className="login-wrapper">
                <div className="login-form-wrapper">
                    <h1>Log In</h1>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="email">
                            <label htmlFor="email">Email</label>
                            <input
                                name="email"
                                type="email"
                                id="loginEmail"
                                placeholder="Email"
                                required
                                className={formErrors.email.length > 0 ? "error" : null}
                                onChange={this.handleChange}
                                value={this.state.email}
                            />
                            {formErrors.email.length > 0 && (
                                <span className="errorMessage">{formErrors.email}</span>
                            )}
                        </div>
                        <div className="password">
                            <label htmlFor="password">Password</label>
                            <input
                                name="password" 
                                type="password"
                                id="loginPass"
                                placeholder="Password"
                                required
                                className={formErrors.password.length > 0 ? "error" : null}
                                onChange={this.handleChange}
                                value={this.state.password}
                            />
                            {formErrors.password.length > 0 && (
                                <span className="errorMessage">{formErrors.password}</span>
                            )}
                        </div>
                        <div className="login">
                            <button onClick={this.login}>Login with Google</button>
                            <button onClick={this.handleSubmit}>Log In</button>
                            <Styles>
                                <big><Nav.Link href="/createAccount">Don't have an Account?</Nav.Link></big>
                                <big><Nav.Link href="/passwordRecovery">Forgot Password?</Nav.Link></big>
                            </Styles>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default Login;