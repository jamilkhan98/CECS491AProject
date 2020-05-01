import React from 'react';
import { Jumbotron as Jumbo, Container, Carousel} from 'react-bootstrap';
import Tree from '../../assets/Tree.jpg';
import Field from '../../assets/Field.jpg';
import Baseball from '../../assets/Baseball.jpg';
import Equipment from '../../assets/Equipment.jpg';
import Lacrosse from '../../assets/Lacrosse.jpg';
 
export const Jumbotron = () => ( 
    <Carousel>
        <Carousel.Item>
            <img
                style={{height: "80vh"}}
                className="d-cover w-100"
                src={Tree}
                alt="First slide"
            />            
        </Carousel.Item>
        <Carousel.Item>
            <img
                style={{height: "80vh"}}
                className="d-cover w-100"
                src={Field}
                alt="Second slide"
            />
        </Carousel.Item>
        <Carousel.Item>
            <img
                style={{height: "80vh"}}
                className="d-cover w-100"
                src={Baseball}
                alt="Third slide"
            />
        </Carousel.Item>
        <Carousel.Item>
            <img
                style={{height: "80vh"}}
                className="d-cover w-100"
                src={Equipment}
                alt="Fourth slide"
            />
        </Carousel.Item>
        <Carousel.Item>
            <img
                style={{height: "80vh"}}
                className="d-cover w-100"
                src={Lacrosse}
                alt="Fifth slide"
            />            
        </Carousel.Item>
    </Carousel>
)