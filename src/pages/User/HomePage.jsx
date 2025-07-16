import { React, useEffect, useState, Suspense } from "react";
import { Link } from "react-router-dom";
import { Contact, Hero, Navbar, StarsCanvas } from "../../components";

const HomePage = () => {
  // const images = [
  //   "https://res.cloudinary.com/dfm6raue1/image/upload/v1745768457/Rooted_In_Christ_gualbf.png",
  //   "https://res.cloudinary.com/dfm6raue1/image/upload/v1745768457/Rooted_In_Christ_gualbf.png",
  // ];

  // const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <>

      <div className="relative z-0 ">
        <div className=" ">
          <Navbar />
          <Hero />
          <Contact />
          <StarsCanvas />
        </div>
      </div >

    </>
  );
};

export default HomePage;
