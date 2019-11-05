//Need to modify this one
import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Background from "./psBackgroundImg.jpg"
import Navbar from './Navbar';
import Header from './Header';
import Footer from './Footer';

function App() {  

  const styles2 = {
    backgroundSize: "cover",
    backgroundImage: "url(" +  Background  + ")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "fixed",

    minHeight: "100%",
    minWidth: "100%"
  }

  return (
    <div class = "container-fluid" style = {styles2}>
      <Navbar />
    </div>
  );
}



export default App;