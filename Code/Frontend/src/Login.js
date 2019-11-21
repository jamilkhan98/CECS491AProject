import React, { Component } from 'react';
import "./Page.css"
import { Nav } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div `
    .nav-link {
        color: black;
        text-align: center;
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
            email: null,
            password: null,
            formErrors:{
                email: "",
                password: ""
            }
        };
    }

    handleSubmit = e => {
        e.preventDefault();

        if(formValid(this.state)){
            console.log(`
                --SUBMITTING--
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
            <div className="login-wrapper">
                <div className="login-form-wrapper">
                    <h1>Login</h1>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="email">
                            <label htmlFor="email">Email</label>
                            <input 
                                className={formErrors.email.length > 0 ? "error" : null}
                                placeholder="Email"
                                type="email"
                                name="email"
                                noValidate
                                onChange={this.handleChange}
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
                            />
                            {formErrors.password.length > 0 && (
                                <span className="errorMessage">{formErrors.password}</span>
                            )}
                        </div>
                        <div className="login">
                            <button type="submit">Sign In</button>
                            <Styles>
                                <small><Nav.Link href="/createAccount">Don't have an Account?</Nav.Link></small>
                                <small><Nav.Link href="/passwordRecovery">Forgot Password?</Nav.Link></small>
                            </Styles>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;