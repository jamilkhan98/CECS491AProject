import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import firebase from '../../Backend/Firestore';

const Styles = styled.div `
    .navbar {
        background-color: seagreen;
    }
    .nav-item {
        padding-right: 5px;
    }
    .navbar-brand, .navbar-nav .nav-link {
        color: white;
        border-bottom: 2px solid white;
        &:hover{
            color: white;
            border-bottom: 2px solid orange;
            cursor: pointer;
        }
    }
    .icon-bar {
        color: #bbb;
    }
`;

const mustCreateProfile = e => {
    e.preventDefault();
    firebase.auth().onAuthStateChanged(firebaseUser => {
        firebase.firestore().collection("user").doc(firebaseUser.uid).get()
        .then((docSnapshot) => { 
            if(docSnapshot.exists) {
                window.location.replace("/profile");
            }
            else {
                window.location.replace("/createProfile");
            }
        });
    });
};

const canCreateEvent = e => {
    e.preventDefault();
    firebase.auth().onAuthStateChanged(firebaseUser => {
        firebase.firestore().collection("user").doc(firebaseUser.uid).get()
        .then((docSnapshot) => { 
            if(docSnapshot.exists) {
                window.location.replace("/events");
            }
            else {
                window.alert("Must create profile before viewing events.")
                window.location.replace("/createProfile");
            }
        });
    });
};

const signOut = e => {
    e.preventDefault();
    firebase.auth().signOut().then(function(){
        console.log("Successfully signed out.");
        setTimeout(() => {
            window.location.replace("/");
        }, 1500);
    }).catch(function(e) {
        console.alert("ERROR: Unable to log user out.");
    });
};

export const LoggedInNavBar = () => (
    <Styles>
        <Navbar expand="lg" variant="dark">
            <Navbar.Brand href="/">Pick-Up Sportz</Navbar.Brand>
            <Navbar.Toggle aria-controls ="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Item><Nav.Link onClick={mustCreateProfile}>Profile</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/schedule">Schedule</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link onClick={canCreateEvent}>Events</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/map">Map</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link onClick={signOut}>Sign Out</Nav.Link></Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Styles>
)
