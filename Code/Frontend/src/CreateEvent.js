import React, { Component } from 'react';
import "./CreateEvent.css"
import styled from 'styled-components';
import { Form, Col, Nav } from 'react-bootstrap';
import firebase from './Firestore'

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

class CreateEvent extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            title: "",
            sport: "",
            location: "",
            date: "",
            startTime: "",
            endTime: "",
            formErrors:{
                title: "",
                sport: "",
                location: "",
                date: "",
                startTime: "",
                endTime: ""
            }
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        const db = firebase.firestore();// chaz {
        const eventRef = db.collection("events").add({
            title: this.state.title,
            sport: this.state.sport,
            location: this.state.location,
            date: this.state.date,
            startTime: this.state.startTime,
            endTime: this.state.endTime
        })
        .then(function(docRef){
            console.log("Doc written with IDL ", docRef.id);
        })
        .catch(function(error){
            console.error("Error adding: ", error);
        });
        this.setState({
            title: "",
            sport: "",
            location: "",
            date: "",
            startTime: "",
            endTime: ""
        });// }

        if(formValid(this.state)){
            console.log(`
                --SUBMITTING--
                Title: ${this.state.title}
                Sport: ${this.state.sport}
                Location: ${this.state.location}
                Date: ${this.state.date}
                Start Time: ${this.state.startTime}
                End Time: ${this.state.endTime}
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
            case 'title':
                formErrors.title = value.length < 10 ? "minimum 10 characters required" : "";
                break;
            case 'sport':
                formErrors.sport = value.length < 6 ? "minimum 6 characters required" : "";
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
                <div className="event-form-wrapper">
                    <h1>Create Event</h1>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="title">
                            <label htmlFor="title">Title</label>
                            <input 
                                className={formErrors.title.length > 0 ? "error" : null}
                                placeholder="Title"
                                type="text"
                                name="title"
                                noValidate
                                onChange={this.handleChange}
                                value={this.state.title}
                            />
                            {formErrors.title.length > 0 && (
                                <span className="errorMessage">{formErrors.title}</span>
                            )}
                        </div>
                        <div className="sport">
                            <label htmlFor="sport">Sport</label>
                            <input 
                                className={formErrors.sport.length > 0 ? "error" : null}
                                placeholder="Sport"
                                type="text"
                                name="sport"
                                noValidate
                                onChange={this.handleChange}
                                value={this.state.sport}
                            />
                        
                            {formErrors.sport.length > 0 && (
                                <span className="errorMessage">{formErrors.sport}</span>
                            )}
                        </div>
                        
                        <div className="location">
                            <label htmlFor="location">Location</label>
                            <input 
                                className={formErrors.location.length > 0 ? "error" : null}
                                placeholder="Location"
                                type="text"
                                name="location"
                                noValidate
                                onChange={this.handleChange}
                                value={this.state.location}
                            />
                        
                            {formErrors.location.length > 0 && (
                                <span className="errorMessage">{formErrors.location}</span>
                            )}
                        </div>

                        <div className="date">
                            <label htmlFor="date">Date</label>
                            <input 
                                className={formErrors.date.length > 0 ? "error" : null}
                                placeholder="Date"
                                type="date"
                                name="date"
                                noValidate
                                onChange={this.handleChange}
                                value={this.state.date}
                            />
                            {formErrors.date.length > 0 && (
                                <span className="errorMessage">{formErrors.date}</span>
                            )}
                        </div>

                        <div className="startTime">
                            <label htmlFor="startTime">Start Time</label>
                            <input 
                                className={formErrors.startTime.length > 0 ? "error" : null}
                                placeholder="Start Time"
                                type="time"
                                name="startTime"
                                noValidate
                                onChange={this.handleChange}
                                value={this.state.startTime}
                            />
                            {formErrors.startTime.length > 0 && (
                                <span className="errorMessage">{formErrors.startTime}</span>
                            )}
                        </div>
                        <div className="endTime">
                            <label htmlFor="endTime">End Time</label>
                            <input 
                                className={formErrors.endTime.length > 0 ? "error" : null}
                                placeholder="End Time"
                                type="time"
                                name="endTime"
                                noValidate
                                onChange={this.handleChange}
                                value={this.state.endTime}
                            />
                            {formErrors.endTime.length > 0 && (
                                <span className="errorMessage">{formErrors.endTime}</span>
                            )}
                        </div>
                        <div className="createEvent">
                            <button type="submit">Create Event</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateEvent;
