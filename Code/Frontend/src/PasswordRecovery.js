import React, { Component } from 'react';
import "./PasswordRecovery.css"
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';

const Styles = styled.div `
    .nav-link {
        color: #bbb;

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

class PasswordRecovery extends Component {

    constructor(props){
        super(props);

        this.state = {
            email: null,
            formErrors:{
                email: ""
            }
        };
    }

    handleSubmit = e => {
        e.preventDefault();

        if(formValid(this.state)){
            console.log(`
                --SUBMITTING--
                Email: ${this.state.email}
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
            default:
                break;
        }

        this.setState({formErrors, [name]: value}, () => console.log(this.state))
    }

    render() {
        const {formErrors} = this.state;
        return (
            <div className="wrapper">
                <div className="passwordRecoveryform-wrapper">
                    <h1>Password Recovery</h1>
                    <p>Please enter your email so that we can send you a link to reset your forgotten password.</p>
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
                        <div className="passwordRecovery">
                            <button type="submit">Send Email</button>
                            <Styles>
                                <small><Nav.Link href="/login">Go Back</Nav.Link></small>
                            </Styles>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default PasswordRecovery;