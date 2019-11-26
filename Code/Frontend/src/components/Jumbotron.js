import React from 'react';
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import styled from 'styled-components';
import Tree from '../assets/Tree.jpg';
import Field from '../assets/Field.jpg';
import Baseball from '../assets/Baseball.jpg';

const Styles = styled.div`
    .jumbo{
        background: url(${Field}) no-repeat fixed bottom;
        background-size: cover;
        color: #efefef;
        height: 200px;
        position: relative;
        z-index: -2;
    }

    .overlay {
        background-color: #000;
        opacity: 0.3;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
    }
`;

export const Jumbotron = () => (
    <Styles>
        <Jumbo fluid className="jumbo">
            <div className="overlay"></div>
            <Container>
                <h3>Pick-Up Sportz</h3>
                <p>All Your Pick Up Game Needs</p>
            </Container>
        </Jumbo>
    </Styles>
)