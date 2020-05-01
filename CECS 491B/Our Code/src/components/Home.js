import React from 'react'
import { Jumbotron } from './Header/Jumbotron';

export const Home = () => (
    <div style={{position: "absolute", left: "0%", width:"100%"}}>
        <Jumbotron />
        <div style={{padding: "1% 10%"}}>
        <h2 title="Product purpose and goals."> WELCOME TO PICK-UP SPORTZ</h2>
        <p> Pick-up Sportz is a pick-up sport web application that will allow users to easily find a pick-up game in their local area.</p>
        <p> As a player, you will be able to:
            <ul>
                <li>Create an account</li>
                <li>Create a profile</li>
                <li>Customize your profile</li>
                <li>Create an event</li>
                <li>Join an event</li>
                <li>Rate other players</li>
            </ul>
        </p>
        <h2>OUR GOAL</h2>
        <p> Find some way to get machine learning to work in our project.</p>
        </div>
    </div>
)

