import React from "react";
import Navbar from "../components/Navbar";
import HeroBack from "../components/HeroBack";
import AiTools from "../components/AiTools";
import Reviews from "../components/Reviews";
import Plan from "../components/Plan";
import Footer from "../components/Footer";
const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroBack />
      <AiTools />
      <Plan />
      <Footer />
    </div>
  );
};

export default Home;
