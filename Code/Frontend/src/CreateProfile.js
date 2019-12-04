import React, { Component } from 'react';
import "./CreateProfile.css"
import styled, { keyframes } from 'styled-components';
import { Nav } from 'react-bootstrap';

const Styles = styled.div `
    .nav-link {
        color: green;

        &:hover{
            color: red;
        }
    }
`;
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

class CreateProfile extends Component {

    constructor(props){
        super(props);

        this.state = {
            firstName: null,
            lastName: null,
            address: null,
            city: null,
            state: null,
            ZIPCode: null,
            formErrors:{
                firstName: "",
                lastName: "",
                address: "",
                city: "",
                state: "",
                ZIPCode: "",            
            }
        };
    }

    handleSubmit = e => {
        e.preventDefault();

        if(formValid(this.state)){
            console.log(`
                --SUBMITTING--
                First Name: ${this.state.firstName}
                Last Name: ${this.state.lastName}
                Address: ${this.state.address}
                City: ${this.state.city}
                State: ${this.state.state}
                ZIPCode: ${this.state.ZIPCode}
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
                formErrors.firstName = value.length < 3 ? "minimum 3 characters required" : "";
                break;
            case 'lastName':
                formErrors.lastName = value.length < 3 ? "minimum 3 characters required" : "";
                break;
            case 'city':
                formErrors.city = value.length < 3 ? "minimum 3 characters required" : "";
                break;
            case 'state':
                formErrors.state = value.length < 2 ? "2 character state abbreviation required" : "";
                break;
            case 'ZIPCode':
                formErrors.ZIPCode = value.length < 5 ? "5 number ZIP code required" : "";
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
                    <h1>Create Profile</h1>
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
                            />
                            {formErrors.lastName.length > 0 && (
                                <span className="errorMessage">{formErrors.lastName}</span>
                            )}
                        </div>
                        <div className="address">
                            <label htmlFor="address">Address</label>
                            <input 
                                className={formErrors.address.length > 0 ? "error" : null}
                                placeholder="Address"
                                type="text"
                                name="address"
                                noValidate
                                onChange={this.handleChange}
                            />
                            {formErrors.address.length > 0 && (
                                <span className="errorMessage">{formErrors.address}</span>
                            )}
                        </div>
                        <div className="city">
                            <label htmlFor="city">City</label>
                            <input 
                                className={formErrors.city.length > 0 ? "error" : null}
                                placeholder="City"
                                type="text"
                                name="city"
                                noValidate
                                onChange={this.handleChange}
                            />
                            {formErrors.city.length > 0 && (
                                <span className="errorMessage">{formErrors.city}</span>
                            )}
                        </div>
                        <div className="state">
                            <label htmlFor="state">State</label>
                            <input 
                                className={formErrors.state.length > 0 ? "error" : null}
                                placeholder="State"
                                type="text"
                                name="state"
                                noValidate
                                onChange={this.handleChange}
                            />
                            {formErrors.state.length > 0 && (
                                <span className="errorMessage">{formErrors.state}</span>
                            )}
                        </div>
                        <div className="ZIPCode">
                            <label htmlFor="ZIPCode">ZIP</label>
                            <input 
                                className={formErrors.ZIPCode.length > 0 ? "error" : null}
                                placeholder="ZIPCode"
                                type="text"
                                name="ZIPCode"
                                noValidate
                                onChange={this.handleChange}
                            />
                            {formErrors.ZIPCode.length > 0 && (
                                <span className="errorMessage">{formErrors.ZIPCode}</span>
                            )}
                        </div>
                        <div className="saveChanges">
                            <button type="submit">Save Changes</button>
                            <button type="submit">Continue without saving</button>
                            <button type="reset">Reset</button>
                            <Styles>
                                <big><Nav.Link href="/">Go Back</Nav.Link></big>
                            </Styles>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateProfile;