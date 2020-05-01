import React from 'react'
import { Jumbotron } from './Header/Jumbotron';

export const Contact = () => (
    <div style={{position: "absolute", left: "0%", width:"100%"}}>
        <Jumbotron />
        <div style={{padding: "1% 10%"}}>
            <h2 title="Contact Information"> CONTACT US</h2>
            <p> For issues, questions, or concerns, please contact us:</p>
            <p> <b>Location</b> </p>
            <p>ECS 413, Table 3</p>
            <hr/>
            <p> <b>Hours</b> </p>
            <ul>
                <li>Mon: 3PM-5:15PM</li>
                <li>Tues: Closed</li>
                <li>Wed: 3PM-5:15PM</li>
                <li>Thurs-Sun: Closed</li>
            </ul>
            <span style={{padding: "1%", backgroundColor: "seagreen", color: "white"}}> Pick-Up Sportz Corporation </span>
        </div>
    </div>
)
