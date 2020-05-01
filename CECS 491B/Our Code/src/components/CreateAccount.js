import React, { Component } from 'react';
import "./CreateAccount.css"
import firebase from '../Backend/Firestore';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({formErrors, ...rest}) => {
    let valid = true;
    
    Object.values(formErrors).forEach(val=>{ //Validate form errors being empty
        val.length > 0 && (valid = false);
    });

    Object.values(rest).forEach(val => { //Validate the form was filled out
        val == null && (valid = false)
    });

    return valid;
}

class CreateAccount extends Component {

    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            confirmPass: "",
            firstName: "",
            lastName: "",
            sport: "",
            city: "",
            state: "",
            ZIPCode: "",
            formErrors:{
                email: "",
                password: "",
                confirmPass: "",
                firstName: "",
                lastName: "",
                sport: "",
                city: "",
                state: "",
                ZIPCode: "",
            }
        };
    }

    componentDidMount() {
        document.getElementsByTagName("nav")[0].className = "navbar navbar-expand-lg navbar-dark collapse";
    }

    componentDidUpdate() {
        document.getElementsByTagName("nav")[0].className = "navbar navbar-expand-lg navbar-dark collapse";
    }

    handleAccountSubmit = e => {
        e.preventDefault();
        var email = document.getElementById("accountEmail").value;
        var accountPass = document.getElementById("accountPass").value;
        var confirmPass = document.getElementById("confirmPass").value;
        if(emailRegex.test(email) && accountPass.length > 5 && confirmPass.length > 5) {
            if(accountPass === confirmPass){
                firebase.auth().createUserWithEmailAndPassword(email, accountPass)
                .catch(e => {console.log("User account could not be created.");});
                firebase.auth().signInWithEmailAndPassword(email, accountPass)
                .catch(e => {console.log("User unable to sign in.");});

                firebase.auth().onAuthStateChanged(firebaseUser => {
                    if(firebaseUser){
                        const userUid = firebaseUser.uid;
                        const account = {
                            userUid: userUid,
                            createdEvents: [],
                            joinedEvents: [],
                        }
                        firebase.firestore().collection("user").doc(userUid).set(account);
                    }
                    else{
                        console.log("Not logged in.");
                    }
                });
                this.setState({
                    email: "",
                    password: "",
                    confirmPass: ""
                });
                alert("Account created. Must now create profile.");
                document.getElementById("accountForm").className ="account-form-wrapper collapse"
                document.getElementById("profileForm").className = "profile-form-wrapper collapse.show"
            }
            else{
                alert("Passwords do not match. Please try again.");
            }
        }
        else{
            alert("Invalid form values. Please try again.");
        }
    }

    handleProfileSubmit = e => {
        e.preventDefault();
        var firstName = document.getElementById("firstName").value
        var lastName = document.getElementById("lastName").value
        var city = document.getElementById("city").value
        var state = document.getElementById("state").value
        var ZIPCode = document.getElementById("ZIPCode").value
        var sport = document.getElementById("sport").value
        var profilePic = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAQAAABecRxxAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfkAhcILytGvF/nAAAeXElEQVR42u3da5wV9Z3n8U830Nzl0oCoXLoRQbkZVBK5JDEG79ExXqIZR2MyhM1M9hU0btZ5sq8xu9m8fCVjZnBmJyGJuwm5mIlRR8GAImoUBKN44SZoBAVEBZqLyK2h6X1AOgJC9+k+VfX9V/2/73rAI+p8T1X9fv2rOnXqVGDFdiI1nEJf+lBNNdX0oScdqKAnUEVXYBf1wHYa2c92tlBHHXVsYTNvs5ZN6jdgaapQB7DE9WcMo6mlhlpq6FLm2nazljdZy1qWsYx31W/OkuUGUAyVjORsRjOGM+mb4utsYilLWcYSVnBQ/aatfG4A+daVsUxkEhPonfErf8ArLGAhT7NDvRGs7dwA8qk947mEyYylvTjJAV7kceawmAPqjWJWfP24lplspTGw5QNmMZUB6s1jVlSDuI0/clBe6s0tB3mObzJQvanMiuQUprEg8NI/clnB7Zys3mxmedeJG3iSBnlBt2VpYD5/TSf1JjTLp+HcyWZ5GZe7bGMGZ6o3pVmeVHETC+Wlm+SygBupUm9Ws/CdwDTWyws2jeVd7sj8bgWzHKnlTrbLCzXNZSczGKbezGbhGcFvOCAv0CyWA/ya09Wb2ywcNcyIpPiblgZ+60nADAYxg/3yglQs+5nJqerNb6bTm7vZJy9E5bKP6b4waDFqz1Q2yQswhGUr0+RfaTLL1GdZKi+8kJZVXKreJWbZqGWWvOBCXP6TwepdY5auSqayU15qoS67uJ126l1klpbRLJYXWejLi5yl3k1myevA7ZFf8S…"
        var aboutMe = ""
        if(firstName.length > 1 && lastName.length > 1 && sport != "Sport"
            && city.length > 1 && state != "State" && ZIPCode.length == 5){
            firebase.auth().onAuthStateChanged(firebaseUser => {
                if(firebaseUser){
                    const userUid = firebaseUser.uid;
                    const profileInfo = {
                        firstName: firstName,
                        lastName: lastName,
                        city: city,
                        state: state,
                        ZIPCode: ZIPCode,
                        sport: sport,
                        profilePic: profilePic,
                        aboutMe: aboutMe,
                    }
                    firebase.firestore().collection("user").doc(userUid).set(profileInfo, {merge: true})
                    .catch(e => {console.log("Error adding document: ", e);});
                }
            })

            console.log(`
                --SUBMITTING--
                First Name: ${this.state.firstName}
                Last Name: ${this.state.lastName}
                Sport: ${this.state.sport}
                City: ${this.state.city}
                State: ${this.state.state}
                ZIPCode: ${this.state.ZIPCode}
                `);
            alert("Profile Created Successfully!");
            setTimeout(() => {
                window.location.replace("/");
            }, 1500);
        } else {
            console.error('FORM INVALID - DISPLAY ERROR MESSAGE');
            window.alert("Must fill out all fields to create a profile.");
        }
        this.setState({
            firstName: "",
            lastName: "",
            sport: "",
            city: "",
            state: "",
            ZIPCode: "",
            profilePic: ""
        });
        
    };

    handleAccountChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        switch(name){
            case 'email':
                formErrors.email = emailRegex.test(value) ? '' : 'invalid email address';
                break;
            case 'password':
                formErrors.password = document.getElementById("accountPass").value.length < 6 ? "minimum 6 characters required" : "";
                break;
            case 'confirmPass':
                formErrors.confirmPass = document.getElementById("accountPass").value !== document.getElementById("confirmPass").value ? "Passwords do not match" : "";
            default:
                break;
        }
        this.setState({formErrors, [name]: value}, () => console.log(this.state))
    }

    handleProfileChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;

        switch(name){
            case 'firstName':
                formErrors.firstName = value.length < 2 ? "2 characters minimum" : "";
                break;
            case 'lastName':
                formErrors.lastName = value.length < 2 ? "2 characters minimum" : "";
                break;
            case 'sport':
                formErrors.sport = value === "Sport" ? "Pick a Sport" : "";
                break;                
            case 'city':
                formErrors.city = value.length < 3 ? "3 characters minimum" : "";
                break;
            case 'state':
                formErrors.state = value === "State" ? "Pick a State" : "";
                break;
            case 'ZIPCode':
                formErrors.ZIPCode = value.length < 5 ? "5 digit ZIP code required" : "";
                break;
            default:
                break;
        }

        this.setState({formErrors, [name]: value}, () => console.log(this.state))
    }

    render() {
        const {formErrors} = this.state;
        return (
            <div className="newAccount-wrapper">
                <div id="accountForm" className="account-form-wrapper collapse.show">
                    <h1>Create Account</h1>
                    <form onSubmit= {this.handleAccountSubmit} noValidate>
                        <div className="email">
                            <label htmlFor="email">Email</label>
                            <input 
                                name="email"
                                type="email"
                                id="accountEmail"
                                placeholder="Email"
                                required
                                className={formErrors.email.length > 0 ? "error" : null}
                                onChange={this.handleAccountChange}
                                value={this.state.email}
                            />
                            {formErrors.email.length > 0 && (
                                <span className="errorMessage">{formErrors.email}</span>
                            )}
                        </div>
                        <div className="password">
                            <label htmlFor="password">Password</label>
                            <input
                                name="password"
                                type="password"
                                id="accountPass"
                                placeholder="Password"
                                required
                                className={formErrors.password.length > 0 ? "error" : null}
                                onChange={this.handleAccountChange}
                                value={this.state.password}
                            />
                            {formErrors.password.length > 0 && (
                                <span className="errorMessage">{formErrors.password}</span>
                            )}
                        </div>
                        <div className="confirmPass">
                            <label htmlFor="confirmPass">Confirm Password</label>
                            <input
                                name="confirmPass"
                                type="password"
                                id="confirmPass"
                                placeholder="Confirm Password"
                                required
                                className={formErrors.confirmPass.length > 0 ? "error" : null}
                                onChange={this.handleAccountChange}
                                value={this.state.confirmPass}
                            />
                            {formErrors.confirmPass.length > 0 && (
                                <span className="errorMessage">{formErrors.confirmPass}</span>
                            )}
                        </div>
                        <div className="createAccount">
                            <button>Create Account</button>
                            <big>Already Have An Account?</big>
                            <big><a className="link" href="/login">Log In</a></big>
                            <hr id="linkDivide"/>
                            <big>Don't Want An Account?</big>
                            <big><a className="link" href="/">Home</a></big>
                        </div>
                    </form>
                </div>
                <div id="profileForm" className="profile-form-wrapper collapse">
                    <h1>Create Profile</h1>
                    <form onSubmit={this.handleProfileSubmit} noValidate>
                        <div className="firstName">
                            <label htmlFor="firstName">First Name</label>
                            <input 
                                className={formErrors.firstName.length > 0 ? "error" : null}
                                placeholder="First Name"
                                type="text"
                                name="firstName"
                                id="firstName"
                                noValidate
                                onChange={this.handleProfileChange}
                            />
                            {formErrors.firstName.length > 0 && (
                                <span className="errorMessage">{formErrors.firstName}</span>
                            )}
                        </div>
                        <div className="lastName">
                            <label htmlFor="lastName">Last Name</label>
                            <input 
                                className={formErrors.lastName.length > 0 ? "error" : null}
                                placeholder="Last Name"
                                type="text"
                                name="lastName"
                                id="lastName"
                                noValidate
                                onChange={this.handleProfileChange}
                            />
                            {formErrors.lastName.length > 0 && (
                                <span className="errorMessage">{formErrors.lastName}</span>
                            )}
                        </div>
                        <div className="sport">
                            <label htmlFor="sport">Favorite Sport</label>
                            <select
                                name="sport"
                                id="sport"
                                required
                                className={formErrors.sport.length > 0 ? "error" : null}
                                onChange={this.handleProfileChange}
                            >
                                <option value="Sport" label="Sport">Select Sport</option>
                                <option value="Basketball" label="Basketball">Basketball</option>
                                <option value="Football" label="Football">Football</option>
                                <option value="Soccer" label="Soccer">Soccer</option>
                                <option value="Baseball" label="Baseball">Baseball</option>
                                <option value="Tennis" label="Tennis">Tennis</option>
                                <option value="Beach Volleyball" label="Beach Volleyball">Beach Volleyball</option>
                                <option value="Indoor Volleyball" label="Indoor Volleyball">Indoor Volleyball</option>
                                <option value="Racquetball" label="Racquetball">Racquetball</option>
                                <option value="Rugby" label="Rugby">Rugby</option>
                                <option value="Ice Hockey" label="Ice Hockey">Ice Hockey</option>
                                <option value="Field Hockey" label="Field Hockey">Field Hockey</option>
                            </select>                        
                            {formErrors.sport.length > 0 && (
                                <span className="errorMessage">{formErrors.sport}</span>
                            )}
                        </div>
                        <div className="city">
                            <label htmlFor="city">City</label>
                            <input 
                                className={formErrors.city.length > 0 ? "error" : null}
                                placeholder="City"
                                type="text"
                                name="city"
                                id="city"
                                noValidate
                                onChange={this.handleProfileChange}
                            />
                            {formErrors.city.length > 0 && (
                                <span className="errorMessage">{formErrors.city}</span>
                            )}
                        </div>
                        <div className="state">
                            <label htmlFor="state">State</label>
                            <select
                                name="state"
                                id="state"
                                required
                                className={formErrors.state.length > 0 ? "error" : null}
                                onChange={this.handleProfileChange}
                            >
                                <option value="State" label="State">State</option>
                                <option value="Alabama" label="Alabama">Alabama (AL)</option>
                                <option value="Alaska" label="Alaska">Alaska (AK)</option>
                                <option value="Arizona" label="Arizona">Arizona (AZ)</option>
                                <option value="Arkansas" label="Arkansas">Arkansas (AR)</option>
                                <option value="California" label="California">California (CA)</option>
                                <option value="Colorado" label="Colorado">Colorado (CO)</option>
                                <option value="Connecticut" label="Connecticut">Connecticut (CT)</option>
                                <option value="Delaware" label="Delaware">Delaware (DE)</option>
                                <option value="Florida" label="Florida">Florida (FL)</option>
                                <option value="Georgia" label="Georgia">Georgia (GA)</option>
                                <option value="Hawaii" label="Hawaii">Hawaii (HI)</option>
                                <option value="Idaho" label="Idaho">Idaho (ID)</option>
                                <option value="Illinois" label="Illinois">Illinois (IL)</option>
                                <option value="Indiana" label="Indiana">Indiana (IN)</option>
                                <option value="Iowa" label="Iowa">Iowa (IA)</option>
                                <option value="Kansas" label="Kansas">Kansas (KS)</option>
                                <option value="Kentucky" label="Kentucky">Kentucky (KY)</option>
                                <option value="Louisiana" label="Louisiana">Louisiana (LA)</option>
                                <option value="Maine" label="Maine">Maine (ME)</option>
                                <option value="Maryland" label="Maryland">Maryland (MD)</option>
                                <option value="Massachusetts" label="Massachusetts">Massachusetts (MA)</option>
                                <option value="Michigan" label="Michigan">Michigan (MI)</option>
                                <option value="Minnesota" label="Minnesota">Minnesota (MN)</option>
                                <option value="Mississippi" label="Mississippi">Mississippi (MS)</option>
                                <option value="Missouri" label="Missouri">Missouri (MO)</option>
                                <option value="Montana" label="Montana">Montana (MT)</option>
                                <option value="Nebraska" label="Nebraska">Nebraska (NE)</option>
                                <option value="Nevada" label="Nevada">Nevada (NV)</option>
                                <option value="New Hampshire" label="New Hampshire">New Hampshire (NH)</option>
                                <option value="New Jersey" label="New Jersey">New Jersey (NJ)</option>
                                <option value="New Mexico" label="New Mexico">New Mexico (NM)</option>
                                <option value="New York" label="New York">New York (NY)</option>
                                <option value="North Carolina" label="North Carolina">North Carolina (NC)</option>
                                <option value="North Dakota" label="North Dakota">North Dakota (ND)</option>
                                <option value="Ohio" label="Ohio">Ohio (OH)</option>
                                <option value="Oklahoma" label="Oklahoma">Oklahoma (OK)</option>
                                <option value="Oregon" label="Oregon">Oregon (OR)</option>
                                <option value="Pennsylvania" label="Pennsylvania">Pennsylvania (PA)</option>
                                <option value="Rhode Island" label="Rhode Island">Rhode Island (RI)</option>
                                <option value="South Carolina" label="South Carolina">South Carolina (SC)</option>
                                <option value="South Dakota" label="South Dakota">South Dakota (SD)</option>
                                <option value="Tennessee" label="Tennessee">Tennessee (TE)</option>
                                <option value="Texas" label="Texas">Texas (TX)</option>
                                <option value="Utah" label="Utah">Utah (UT)</option>
                                <option value="Vermont" label="Vermont">Vermont (VT)</option>
                                <option value="Virginia" label="Virginia">Virginia (VA)</option>
                                <option value="Washington" label="Washington">Washington (WA)</option>
                                <option value="West Virginia" label="West Virginia">West Virginia (WV)</option>
                                <option value="Wisconsin" label="Wisconsin">Wisconsin (WI)</option>
                                <option value="Wyoming" label="Wyoming">Wyoming (WY)</option>
                            </select>                        
                            {formErrors.state.length > 0 && (
                                <span className="errorMessage">{formErrors.state}</span>
                            )}
                        </div>
                        <div className="ZIPCode">
                            <label htmlFor="ZIPCode">ZIP</label>
                            <input 
                                className={formErrors.ZIPCode.length > 0 ? "error" : null}
                                placeholder="ZIPCode"
                                type="text"
                                name="ZIPCode"
                                id="ZIPCode"
                                noValidate
                                onChange={this.handleProfileChange}
                            />
                            {formErrors.ZIPCode.length > 0 && (
                                <span className="errorMessage">{formErrors.ZIPCode}</span>
                            )}
                        </div>
                        <div className="saveChanges">
                            <button onClick={this.handleSubmit}>Save Changes</button>
                            <button type="reset">Reset</button>
                        </div>
                        <span id="required">Must have profile to join or create events.</span>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateAccount;