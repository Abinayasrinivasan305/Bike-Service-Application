import React from "react";
import './Styles/Home.css'; // Make sure to include the CSS file
import Bannerimg from '../assets/Bannerimg1.png';
import {Link} from "react-router-dom";


const Home = () => {
  return (
    <div className="home-container">
      <div className="banner">
        <img 
          src={Bannerimg} // Replace with your image URL
          alt="Banner" 
          className="banner-image"
        />
        <div className="banner-text">
          <h1>Welcome to <br/><span className="banner_span">Gear Up!!!!</span></h1>
          <br/>
          <h2>Your bike service <span className="banner_span">starts here!</span></h2>
          <br/>
        </div>
      </div>
    </div>
  );
};

export default Home;
