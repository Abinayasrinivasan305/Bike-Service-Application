import React from "react";
import "./Styles/AboutUs.css";

// Import the images
import card1 from "../assets/card1.jpg";
import card2 from "../assets/card2.jpg";
import card3 from "../assets/card3.jpg";

const AboutUs = () => {
  const cards = [
    {
      title: "Our Mission",
      image: card1, // Reference the imported image
      description:
        "We strive to provide the best bike services to ensure customer satisfaction.",
    },
    {
      title: "Our Vision",
      image: card2, // Reference the imported image
      description:
        "To become the leading bike service provider by delivering quality and timely services.",
    },
    {
      title: "Our Values",
      image: card3, // Reference the imported image
      description:
        "Customer first, innovation, integrity, and continuous improvement.",
    },
  ];

  return (
    <div className="aboutus-container">
      <h1 className="abouth1">About Us</h1>
      <div className="cards">
        {cards.map((card, index) => (
          <div className="card" key={index}>
            <img src={card.image} alt={card.title} className="card-image" />
            <h2>{card.title}</h2>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
