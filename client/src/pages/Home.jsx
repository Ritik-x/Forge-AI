// Home.jsx
import React from "react";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Aitool from "../components/Aitool.jsx";
import Testimonial from "../components/Testimonial.jsx";
import Price from "../components/Price.jsx";
import Footer from "../components/Footer.jsx";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Aitool />
      <Testimonial />
      <Price />
      <Footer />
    </>
  );
};

export default Home;
