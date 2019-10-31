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
    boxSizing: "inherit"
    // backgroundImage: "url(" +  Background  + ")"
  }

  // const styles2 = {
  //   backgroundImage: "url(" +  Background  + ")"
  // }

    return(
      <span>
        <form class = "container-fluid" style = {styles}>
          Username
          <input type="text"></input>
          <br/><br/>
          Password 
          <input type="text"></input>
          <br/>
          <input type="submit" value="Submit"></input>
        </form>
      </span>

    )
}

export default Navbar