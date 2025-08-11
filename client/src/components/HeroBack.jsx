import React from "react";
import bg from "../assets/gradientBackground.png";
import { useNavigate } from "react-router-dom";

const HeroBack = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className="px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-cover bg-no-repeat min-h-screen"
    >
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]">
          Create amazing content
          <br /> with <span className="text-purple-600">AI tools</span>
        </h1>
        <p className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600">
          Transform your content creation with our site of premium AI tools.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 text-sm max:sm:text-xs">
        <button
          onClick={() => navigate("/ai")}
          className="bg-purple-500 text-white px-10 py-3 rounded-lg hover:scale-120 active:scale-95 transition cursor-pointer"
        >
          Start Creating Now
        </button>
        <button className="bg-purple-100 text-black px-10 py-3 rounded-lg hover:scale-120 active:scale-95 transition cursor-pointer">
          {" "}
          Watch Demo!
        </button>
      </div>
    </div>
  );
};

export default HeroBack;
