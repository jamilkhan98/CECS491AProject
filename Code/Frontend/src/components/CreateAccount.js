import React, { Component } from 'react';
import "./CreateAccount.css"
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';
import firebase from "./Firestore";
import { thisTypeAnnotation } from '@babel/types';
import PopUpAccount from './PopUpAccount'

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

class CreateAccount extends Component {

    constructor(props){
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            formErrors:{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
            }
        };
    }

    state = {
        isOpen: false
    }
    handleSubmit = e => {
        
        e.preventDefault();
        const db = firebase.firestore();
        const userRef = db.collection("users").add({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        })
        .then(function(docRef){
            console.log("Doc written with IDL ", docRef.id);
        })
        .catch(function(error){
            console.error("Error adding: ", error);
        });
        this.setState({
            firstName: "",
            lastName: "",
            email: "",
            password: ""

        });

        if(formValid(this.state)){
            console.log(`
                --SUBMITTING--
                First Name: ${this.state.firstName}
                Last Name: ${this.state.lastName}
                Email: ${this.state.email}
                Password: ${this.state.password}
            `);
        } else {
            console.error('FORM INVALID - DISPLAY ERROR MESSAGE');
        }


    };

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;

        switch(name){
            case 'firstName':
                formErrors.firstName = value.length < 2 ? "minimum 2 characters required" : "";
                break;
            case 'lastName':
                formErrors.lastName = value.length < 2 ? "minimum 2 characters required" : "";
                break;
            case 'email':
                formErrors.email = emailRegex.test(value) ? '' : 'invalid email address';
                break;
            case 'password':
                formErrors.password = value.length < 6 ? "minimum 6 characters required" : "";
                break;
            default:
                break;
        }

        this.setState({formErrors, [name]: value}, () => console.log(this.state))
    }

    render() {
        const {formErrors} = this.state;
        return (
            <div className="wrapper">
                <div className="form-wrapper">
                    <h1>Create Account</h1>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="firstName">
                            <label htmlFor="firstName">First Name</label>
                            <input 
                                className={formErrors.firstName.length > 0 ? "error" : null}
                                placeholder="First Name"
                                type="text"
                                name="firstName"
                                noValidate
                                onChange={this.handleChange}
                                value={this.state.firstName}
                            />
                            {formErrors.firstName.length > 0 && (
                                <span className="errorMessage">{formErrors.firstName}</span>
                            )}
                        </div>
                        <div className="lastName">
                            <label htmlFor="lastName">Last Name</label>
                            <input 
                                className={formErrors.lastName.length > 0 ? "error" : null}
                                placeholder="Last Name"
                                type="text"
                                name="lastName"
                                noValidate
                                onChange={this.handleChange}
                                value={this.state.lastname}
                            />
                            {formErrors.lastName.length > 0 && (
                                <span className="errorMessage">{formErrors.lastName}</span>
                            )}
                        </div>
                        <div className="email">
                            <label htmlFor="email">Email</label>
                            <input 
                                className={formErrors.email.length > 0 ? "error" : null}
                                placeholder="Email"
                                type="email"
                                name="email"
                                noValidate
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
                                className={formErrors.password.length > 0 ? "error" : null}
                                placeholder="Password"
                                type="password"
                                name="password"
                                noValidate
                                onChange={this.handleChange}
                                value={this.state.password}
                            />
                            {formErrors.password.length > 0 && (
                                <span className="errorMessage">{formErrors.password}</span>
                            )}
                        </div>
                        <div className="createAccount">
                            <button onClick={this.handleSubmit}><Nav.Link id="normal" href = "/createProfile">Create Account</Nav.Link> </button>
                            <Styles>
                                <big>Already Have An Account?</big>
                                <big><Nav.Link href="/login">Log In</Nav.Link></big>
                                <big><Nav.Link href="/createProfile">Create Profile</Nav.Link></big>
                            </Styles>
                            <PopUpAccount isOpen={this.state.isOpen}>
                                Created Account Successfully!!
                            </PopUpAccount>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateAccount;