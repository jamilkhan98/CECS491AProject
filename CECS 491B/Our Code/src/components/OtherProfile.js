import React, { Component } from 'react';
import "./Profile.css"
import profileDefaultPic from '../assets/profileDefaultPic.png';
import { Image, Nav } from "react-bootstrap"
import styled from 'styled-components';
import firebase from '../Backend/Firestore';
import StarRatingComponent from './StarRatingComponent';
import Review from "./PlayerReview";

const Styles = styled.div`
    .nav-link {

        color: green;
        &:hover{
            color: red;
        }
    }
`;


class OtherProfile extends Component {

    constructor(props){
        super(props);
        this.state = {
            rating : 0,
            profileURL: "",
            editing : true
        }
    }
    updateRating(rating) {
        this.setState({rating});
    }
    
    componentDidMount = e => {
        console.log(this.props);
        this.state.profileURL = window.location.search;
        var searchParams = new URLSearchParams(this.state.profileURL);
        var userID = searchParams.get("userID");
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                firebase.firestore().collection("user").doc(userID)
                .get().then(function (doc) {
                    document.getElementById("profileName").innerHTML = doc.data().firstName + " " + doc.data().lastName; 
                    document.getElementById("profileAddress").innerHTML = doc.data().city + ", " + doc.data().state + " " + doc.data().ZIPCode;
                    document.getElementById("profileSport").innerHTML = doc.data().sport;                    
                    document.getElementById("profileAbout").innerHTML = doc.data().aboutMe;
                    document.getElementById("profilePic").src = doc.data().profilePic;
                    // document.getElementById("profile-nav-link-wrapper").className = firebaseUser.uid === userID ? "collapse.show" : "collapse";
                })
            }
            else {
                console.log("Not a registered user");
            }
        })
        this.state.profileURL = "/playerReview" + this.state.profileURL;
    }


    render() {
        return (
            <div className="wrapper">
                <div className="profile-wrapper">
                    <div className="profile-picture-wrapper">
                        {/* This is where the profile picture will be*/}
                        <Image id="profilePic" src={profileDefaultPic} fluid />
                    </div>
                    <div className="profile-detail-wrapper">
                        <div id="profileName" className="profile-name" />
                        <div className="profile-rating">
                            Player's Rating:
                            <StarRatingComponent
                            editing={false}
                            rating={this.state.rating}
                            updateRating={this.updateRating.bind(this.state.rating)}/>
                            <Styles>
                                <big>
                                    <Nav.Link href={this.state.profileURL}>
                                        Leave a Review!
                                    </Nav.Link>
                                </big>
                            </Styles>
                        </div>
                        <div id="profileAddress" className="profile-city-state" />
                        <div id="profileSport" className="profile-sport" />
                        <div id="profileAbout" className="profile-about" />
                    </div>
                    <div id="profile-nav-link-wrapper">
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default OtherProfile;