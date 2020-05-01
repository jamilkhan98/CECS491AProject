import React, { Component } from 'react';
import "./Profile.css"
import profileDefaultPic from '../assets/profileDefaultPic.png';
import { Image, Nav } from "react-bootstrap"
import styled from 'styled-components';
import firebase from '../Backend/Firestore';
import StarRatingComponent from './StarRatingComponent';

const Styles = styled.div`
    .nav-link {
        color: green;
        &:hover{
            color: red;
        }
    }
`;

class Profile extends Component {

    constructor(props){
        super(props);
        this.state = {
            rating : 0,
            editing : true
        }
    }

    componentDidMount = e => {
        console.log(this.props);
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser){
                firebase.firestore().collection("user").doc(firebaseUser.uid)
                .get().then(function(doc) {
                    document.getElementById("profileName").innerHTML = doc.data().firstName + " " + doc.data().lastName;
                    document.getElementById("profileAddress").innerHTML = doc.data().city + ", " + doc.data().state + " " + doc.data().ZIPCode;
                    document.getElementById("profileSport").innerHTML = doc.data().sport;
                    document.getElementById("profileAbout").innerHTML = doc.data().aboutMe;
                    document.getElementById("profilePic").src = doc.data().profilePic;
                    document.getElementById("profilePic").innerHTML = doc.data().avgRating;
                })
            }
            else{
                console.log("Not a registered user");
            }
        })
    }

    render() {
        return (
            <div className="wrapper">
                <div className="profile-wrapper">
                    <div className="profile-picture-wrapper">
                        <Image id="profilePic" src={profileDefaultPic} fluid/>
                    </div>
                    <div className="profile-detail-wrapper">
                        <div id="profileName" className="profile-name"/>
                        <div className="profile-rating">
                            Player's Rating:
                            <StarRatingComponent 
                            editing={false}
                            rating = {4}
                            />
                            <div id="avgRating"/>
                        </div>
                        <div id="profileAddress" className="profile-city-state"/>
                        <div id="profileSport" className="profile-sport"/>
                        <div id="profileAbout" className="profile-about"/>
                    </div>
                    <div id="profile-nav-link-wrapper">
                        <Styles>
                            <big>
                                <Nav.Link href="/profileSetting">
                                    Change Profile Settings
                                </Nav.Link>
                            </big>
                        </Styles>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;