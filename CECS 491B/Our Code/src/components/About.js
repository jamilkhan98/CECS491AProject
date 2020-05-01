import React from 'react'
import { Jumbotron } from './Header/Jumbotron';

export const About = () => (
    <div style={{position: "absolute", left: "0%", width:"100%"}}>
        <Jumbotron />
        <div style={{padding: "1% 10%"}}>
            <h2 title="Background on team and product."> ABOUT PICK-UP SPORTZ</h2>
                <ul> A little bit about us:
                    <li> We are a team of Senior Computer Science students working in the roles of software engineers and developers.</li>
                    <li> We are building a website that will help people find pick up games easily.</li>
                    <li> We are currently in our second semester and we are working diligently toward completing our project.</li>
                </ul>
        </div>
    </div>
)
