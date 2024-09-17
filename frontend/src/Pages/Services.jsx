import React from 'react';
import './Styles/Services.css';
import card1 from "../assets/oilex.jpg";
import card2 from "../assets/generalservice.jpg";
import card3 from "../assets/waterwash.jpg";
import { Link } from 'react-router-dom';
const services = [
  {
    title: "Oil Exchange",
    description: "Get your vehicle's oil changed quickly and efficiently with our top-quality oil exchange service.",
    image: card1,
  },
  {
    title: "General Services",
    description: "Routine maintenance and general services to keep your vehicle in optimal condition.",
    image: card2,
  },
  {
    title: "Water Wash",
    description: "Thorough exterior and interior water wash service to keep your vehicle looking pristine.",
    image: card3,
  },
];

const Services = () => {
  
  return (
    <div className="services-container">
      <h1 className="services-title">Our Services</h1>
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <img src={service.image} alt={service.title} className="card-image" />
            <div className="service-content">
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <br/>
              <button className="btn btn-primary"><Link to="/regservice">Register for Service</Link></button>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default Services;
