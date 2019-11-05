//Need to modify this one
import React from "react"
// import Background from "./psBackgroundImg.jpg"

function Navbar(){

  const styles = {
    backgroundColor: "white",
    border: "3px solid green",
    margin: "140px 280px",
    padding: "60px",
    display: "inline-block",
    textAlign: "center",
    position: "relative",
    boxSizing: "border-box"
    // backgroundImage: "url(" +  Background  + ")"
  }

  // const styles2 = {
  //   backgroundImage: "url(" +  Background  + ")"
  // }

    return(
      <span>
        <form class = "container-fluid" style = {styles}>
          Username: 
          <input type="text"></input>
          <br/>
          <br/>
          Password: 
          <input type="text"></input>
          <br/>
          <br/>
          <input type="submit" value="Sign in"></input>
          <br/>
          <br/>
          <input type="submit" value="Sign in with Google"></input>
        </form>
      </span>

    )
}

export default Navbar