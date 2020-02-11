import React from 'react';
import { Jumbotron as Jumbo, Container, Carousel} from 'react-bootstrap';
import Tree from '../../assets/Tree.jpg';
import Field from '../../assets/Field1.png';
import Baseball from '../../assets/Baseball.jpg';
import Equipment from '../../assets/Equipment.jpg';
import Tennis from '../../assets/Tennis.png';

 
export const Jumbotron = () => (
    
    <Carousel>
        <Carousel.Item>
            <img
                className="d-cover w-100"
                src={Tree}
                alt="First slide"
            />
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-cover w-100"
                src={Field}
                alt="Third slide"
            />
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-cover w-100"
                src={Baseball}
                alt="Third slide"
            />
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-cover w-100"
                src={Equipment}
                alt="Fifth slide"
            />
        </Carousel.Item>
    </Carousel>
)