import React from "react"
import Background from "./psBackgroundImg.jpg"

function Navbar(){

  const styles = {
    border: "3px solid green",
    margin: "140px 280px",
    padding: "60px",
    display: "inline-block",
    textAlign: "center",
    maxWidth: "75%",
    backgroundImage: "url(" +  Background  + ")"
  }

    return(
      <span>
        <form style = {styles}>
          Username
          <input type="text"></input>
          <br/><br/>
          Password<br/> 
          <input type="text"></input>
          <br/><br/>
          <input type="submit" value="Submit"></input>
        </form>
      </span>

    )
}

export default Navbar