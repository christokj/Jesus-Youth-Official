import { React, useEffect, useState, Suspense } from "react";
import { Link } from "react-router-dom";
import RotatingText from "../../components/HomePage/RotatingText";

const HomePage = () => {
  const images = [
    "https://res.cloudinary.com/dfm6raue1/image/upload/v1745768457/Rooted_In_Christ_gualbf.png",
    "https://res.cloudinary.com/dfm6raue1/image/upload/v1745768457/Rooted_In_Christ_gualbf.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Suspense fallback={<div className="p-8 text-white">Loading...</div>}>
        <RotatingText />
      </Suspense>

      <div className="w-full h-full max-w-full mx-auto overflow-hidden shadow-lg">
        <div className="relative w-full h-96">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className={`absolute w-full h-full object-cover transition-opacity duration-700 ${index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
            />
          ))}

          <div className="absolute visible sm:invisible bottom-0.5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Link
              to="/register-page"
              className="btn btn-sm bg-gradient-to-br from-white via-black to-white text-white w-full 
                         py-3 rounded-lg font-semibold transition-all duration-300 
                         hover:scale-105 hover:brightness-110 hover:shadow-lg"
            >
              Register now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
