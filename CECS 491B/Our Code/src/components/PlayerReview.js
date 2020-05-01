import React, { Component } from 'react';
import "./PlayerReview.css"
import { Nav } from 'react-bootstrap';
import styled from 'styled-components';
import firebase from '../Backend/Firestore';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import StarRatingComponent from './StarRatingComponent';

const Styles = styled.div `
    .nav-link {
        color: green;
        &:hover{
            color: red;
        }
    }
`;

class PlayerReview extends Component {

    constructor(props){
        super(props);

        this.state = {
            rating : 0,
            profileURL: "",
            editing : true,
            review: "",
            formErrors: {
                review: "", 
                rating: ""

            }
        };
    }
    updateRating(rating) {
        this.setState({rating});
    }
    handleSubmit = e => {
        e.preventDefault();

        console.log(this.props);
        this.state.profileURL = window.location.search;
        console.log(this.state.profileURL);
        var searchParams = new URLSearchParams(this.state.profileURL);
        var userID = searchParams.get("userID");
        
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                const reviewInfo = {
                    review: this.state.review,
                    rating: this.state.rating
                }
                firebase.firestore().collection("user").doc(userID).set(reviewInfo, {merge: true})
                .catch(e => {console.log("Error adding document: ", e);});
            }
        })
                
        console.log(`
            --SUBMITTING--
            Review: ${this.state.review}
            `);

        alert("Review has been submitted!");

        setTimeout(() => {
            window.location.replace(this.state.profileURL);
        }, 1500);

        
        this.setState({
            review: ""
        });
    };
    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;

        switch (name) {
            case 'review':
                formErrors.review = value.length === 500 ? "500 character max" : "";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value }, () => console.log(this.state))
    }

    render(){
        const { formErrors } = this.state;
        return (
            <div className="review-wrapper">
                <div className="review-form-wrapper">
                    <h1>Review</h1>
                    <div id="profileSettingForm">
                    <form>
                        <div className="profile-rating">
                            Select Rating:
                            <StarRatingComponent
                            editing={true}
                            rating={this.state.rating}
                            updateRating={this.updateRating.bind(this.state.rating)}/>

                        </div>
                        <div className="review">
                            <textarea
                                className={formErrors.review.length > 0 ? "error" : null}
                                maxLength = "500"
                                placeholder="Add a Review!"
                                type="text"
                                name="review"
                                id="review"
                                noValidate
                                onChange={this.handleChange}
                            />
                            {formErrors.review.length > 0 && (
                                <span className="errorMessage">{formErrors.review}</span>
                            )}
                            <p id="charNum" className = "collapse.show"></p>
                            {/* <label htmlFor="aboutMe" text-align="right">(max 500 char)</label> */}
                        </div>

                        <div className="saveChanges">
                            <button onClick={this.handleSubmit}>Submit Review</button>
                            <Styles>
                                <big><Nav.Link href="/schedule">Back</Nav.Link></big>
                            </Styles>
                        </div>

                    </form>
                    </div>
                </div>
                
            </div>
        );
    }
}
export default PlayerReview;