import React, { Component } from 'react';
import ProfilePicture from "profile-picture"
import "profile-picture/build/ProfilePicture.css"
import "./Profile.css"
class Profile extends Component {
    constructor(props) {
        super(props)
        this.profilePictureRef = React.createRef();
    }

    handleUpload() {
        const profilePic = this.profilePictureRef.current;
        const imageData = profilePic.getData();
        const file = imageData.file;
        const imageAsDataURL = profilePic.getImageAsDataUrl();
    }

    render() {
        return (
            <div className="wrapper">
                <div className="profile-wrapper">
                    <div className="profile-picture-wrapper">
                        {/* This is where the profile picture will be*/}
                        pic
                    </div>
                    <div className="profile-about-me-wrapper">
                        {/* This is where all the information like location, sports, description etc. will be 
                            You can place the rating system here as well*/}
                        about
                    </div>
                    <div className="profile-content-wrapper">
                        {/* This is where the user can create event, see schedule, etc. need to think about it more*/}
                        content
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;


