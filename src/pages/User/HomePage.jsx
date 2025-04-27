import { React, useEffect, useState } from "react";
// import { Link } from "react-router-dom";

const HomePage = () => {

  const images = [
    "https://res.cloudinary.com/dfm6raue1/image/upload/v1745768457/Rooted_In_Christ_gualbf.png",
    "https://res.cloudinary.com/dfm6raue1/image/upload/v1745768457/Rooted_In_Christ_gualbf.png",
    "https://res.cloudinary.com/dfm6raue1/image/upload/v1745768457/Rooted_In_Christ_gualbf.png",

  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // change slide every 5 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, [images.length]);

  // const imageUrl = 'https://res.cloudinary.com/dfm6raue1/image/upload/v1742993296/menu_header_tvrv1v.jpg';

  return (
    <>
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
        </div>
      </div>
      {/* <div className="relative h-[411px]">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
          <div className="flex justify-center items-center h-full z-20">
            <div className="flex flex-col items-center gap-8 max-w-4xl px-4">
              <h1 className="mb-8 font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-500 text-dark-grey-900 animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black">
                Welcome
              </h1>

              <p className="text-white max-w-xl text-center">
                Our mission is to inspire lives through vibrant faith, committed fellowship, and transformative outreach, grounded in the love of Christ.            </p>
              <Link to="/register-page" className="z-10" >
                <button className="uppercase bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                  register
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default HomePage;
