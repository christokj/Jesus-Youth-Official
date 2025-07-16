import { React, useEffect, useState, Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { Contact, Hero, Navbar } from "../../components";
const StarsCanvas = lazy(() => import("../../components/canvas/Stars"));

const HomePage = () => {


  return (
    <>

      <div className="relative z-0 ">
        <div className=" w-full h-screen  ">
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
