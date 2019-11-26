import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { MDBCol } from "mdbreact";
import styled from 'styled-components';

const Styles = styled.div `
    .navbar {
        background-color: #111;
    }

    .navbar-brand, .navbar-nav .nav-link {
        color: #bbb;

        &:hover{
            color: white;
        }
    }
    .icon-bar {
        color: #bbb;
    }
`;

export const LoggedInNavBar = () => (
    <Styles>
        <Navbar expand="lg" variant="dark">
            <Navbar.Brand href="/">Pick-Up Sportz</Navbar.Brand>
            <MDBCol md="4">
                <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
            </MDBCol>
            <Navbar.Toggle aria-controls ="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Item><Nav.Link href="/createProfile">Profile</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/schedule">Schedule</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/createEvent">Events</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/createAccount">Map</Nav.Link></Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Styles>
)