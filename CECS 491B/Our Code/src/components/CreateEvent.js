import React, { Component } from 'react';
import "./CreateEvent.css"
import firebase from '../Backend/Firestore';

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

    formatTime(time){
        var timeSplit = time.split(":"), hours, minutes, meridian;
        hours = timeSplit[0];
        minutes = timeSplit[1];
        if(hours > 12){
            meridian = "PM";
            hours -= 12;
        } 
        else if(hours < 12){
            meridian = "AM";
            if(hours == 0){
                hours = 12;
            }
        } else {
            meridian = "PM";
        }
        return hours + ':' + minutes + ' ' + meridian;
    }

    handleSubmit = e => {
        e.preventDefault();
        var title = document.getElementById("title").value;
        var sport = document.getElementById("sport").value;
        var location = document.getElementById("location").value;

        var date = document.getElementById("date").value.split("-");

        var properDate = new Date(date[0], date[1]-1, date[2]);
        var startTime = this.formatTime(document.getElementById("startTime").value);
        var endTime = this.formatTime(document.getElementById("endTime").value);

        if(title.length >= 10 && sport !== "Sport" && location.length > 1 
        && date !== "" && startTime !== "" && endTime !== ""){
            firebase.auth().onAuthStateChanged(firebaseUser => {
                if(firebaseUser){
                    const uid = firebaseUser.uid;
                    const eventDetails = {
                        hostID: uid,
                        title: title,
                        sport: sport,
                        location: location,
                        date: properDate,
                        startTime: startTime,
                        endTime: endTime,
                        attendees: []
                    }
                    firebase.firestore().collection("events").add(eventDetails)
                    .then(function(docRef){
                        console.log("Document written with ID: ", docRef.id);
                        firebase.firestore().collection("events").doc(docRef.id).update({
                            attendees: firebase.firestore.FieldValue.arrayUnion(uid)
                        })
                        firebase.firestore().collection("user").doc(uid).update({
                            createdEvents: firebase.firestore.FieldValue.arrayUnion(docRef.id),
                            joinedEvents: firebase.firestore.FieldValue.arrayUnion(docRef.id)
                        })
                    })
                    .catch(e => {console.log("Error adding document: ", e);});
                }
            })
            console.log(`
                --SUBMITTING--
                Title: ${this.state.title}
                Sport: ${this.state.sport}
                Location: ${this.state.location}
                Date: ${this.state.date}
                Start Time: ${this.state.startTime}
                End Time: ${this.state.endTime}
            `);
            alert("Event created successfully!");
            setTimeout(() => {
                window.location.replace("/schedule");
            }, 1500);
        } else {
            console.error('FORM INVALID - DISPLAY ERROR MESSAGE');
            window.alert("Must fill out all fields to create an event.");
        }
        this.setState({
            title: "newEvent",
            sport: "",
            location: "",
            date: "",
            startTime: "",
            endTime: ""
        });
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
                formErrors.sport = value === "Sport" ? "Pick a Sport" : "";
                break;
            case 'location':
                formErrors.location = value === "" ? "Must enter location" : "";
                break;
            case 'date':
                formErrors.date = value === "" ? "Must enter date" : "";
                break;
            case 'startTime':
                formErrors.startTime = value === "" ? "Must enter start time" : "";
                break;
            case 'endTime':
                formErrors.endTime = value === "" ? "Must enter end time" : "";
                break;
            default:
                break;
        }
        this.setState({formErrors, [name]: value}, () => console.log(this.state))
    }

    hideForm = e => {
        e.preventDefault();
        var length = document.getElementById("schedule-tbody").innerHTML.length
        document.getElementById("noEvents").className = length === 0 ? "collapse.show" : "collapse"
        document.getElementById("eventForm").className = "event-form-wrapper collapse"
        document.getElementById("hidden").style.display = "inline-block"
    }

    render() {
        const {formErrors} = this.state;
        return (
            <div id = "eventForm" className="event-form-wrapper collapse">
                <h1>Create Event</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="title">
                        <label htmlFor="title">Title</label>
                        <input 
                            name="title"
                            type="text"
                            id="title"
                            placeholder="Title"
                            required
                            className={formErrors.title.length > 0 ? "error" : null}
                            onChange={this.handleChange}
                        />
                        {formErrors.title.length > 0 && (
                            <span className="errorMessage">{formErrors.title}</span>
                        )}
                    </div>
                    <div className="sport">
                        <label htmlFor="sport">Sport</label>
                        <select
                            name="sport"
                            placeholder="Sport"
                            id="sport"
                            required
                            className={formErrors.sport.length > 0 ? "error" : null}
                            onChange={this.handleChange}
                        >
                            <option value="Sport" label="Sport">Select Sport</option>
                            <option value="Basketball" label="Basketball">Basketball</option>
                            <option value="Football" label="Football">Football</option>
                            <option value="Soccer" label="Soccer">Soccer</option>
                            <option value="Baseball" label="Baseball">Baseball</option>
                            <option value="Tennis" label="Tennis">Tennis</option>
                            <option value="Beach Volleyball" label="Beach Volleyball">Beach Volleyball</option>
                            <option value="Indoor Volleyball" label="Indoor Volleyball">Indoor Volleyball</option>
                            <option value="Racquetball" label="Racquetball">Racquetball</option>
                            <option value="Rugby" label="Rugby">Rugby</option>
                            <option value="Ice Hockey" label="Ice Hockey">Ice Hockey</option>
                            <option value="Field Hockey" label="Field Hockey">Field Hockey</option>
                        </select>                        
                        {formErrors.sport.length > 0 && (
                            <span className="errorMessage">{formErrors.sport}</span>
                        )}
                    </div>
                    <div className="location">
                        <label htmlFor="location">Location</label>
                        <input 
                            name="location"
                            type="text"
                            id="location"
                            placeholder="Location"
                            required
                            className={formErrors.location.length > 0 ? "error" : null}
                            onChange={this.handleChange}
                        />
                        {formErrors.location.length > 0 && (
                            <span className="errorMessage">{formErrors.location}</span>
                        )}
                    </div>
                    <div className="date">
                        <label htmlFor="date">Date</label>
                        <input 
                            name="date"
                            type="date"
                            id="date"
                            placeholder="Date"
                            required
                            className={formErrors.date.length > 0 ? "error" : null}
                            onChange={this.handleChange}
                            min='2020-03-17'
                        />
                        {formErrors.date.length > 0 && (
                            <span className="errorMessage">{formErrors.date}</span>
                        )}
                    </div>
                    <div className="startTime">
                        <label htmlFor="startTime">Start Time</label>
                        <input 
                            name="startTime"
                            type="time"
                            id="startTime"
                            placeholder="Start Time"
                            required
                            className={formErrors.startTime.length > 0 ? "error" : null}
                            onChange={this.handleChange}
                        />
                        {formErrors.startTime.length > 0 && (
                            <span className="errorMessage">{formErrors.startTime}</span>
                        )}
                    </div>
                    <div className="endTime">
                        <label htmlFor="endTime">End Time</label>
                        <input 
                            name="endTime"
                            type="time"
                            id="endTime"
                            placeholder="End Time"
                            required
                            className={formErrors.endTime.length > 0 ? "error" : null}
                            onChange={this.handleChange}
                        />
                        {formErrors.endTime.length > 0 && (
                            <span className="errorMessage">{formErrors.endTime}</span>
                        )}
                    </div>
                    <div className="createEvent">
                        <button title="Cancels event creation" onClick = {this.hideForm}>Cancel</button>
                        <button title="Creates event" onClick = {this.handleSubmit}>Create Event</button>
                        <button title="Resets form fields" type="reset">Reset</button>                    
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateEvent;