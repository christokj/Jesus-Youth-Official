import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white ">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 py-8 text-center md:text-left">

        <div className="font-semibold border p-3 rounded-2xl flex justify-center flex-col items-center">
          <h3 className="text-lg ">CONNECT WITH US</h3>
          <p className="text-gray-400">+91 9567843340</p>
          <p className="text-gray-400">
            Email us at <a href="mailto:info@deepnetsoft.com" className="text-blue-400 hover:underline">info@deepnetsoft.com</a>
          </p>
        </div>

        <div className="font-semibold border p-3 rounded-2xl flex justify-center flex-col items-center">
          <h3 className="text-lg font-semibold">DEEP NET SOFT</h3>
          <p className="text-gray-400"></p>
        </div>

        <div className="font-semibold border p-3 rounded-2xl flex justify-center flex-col items-center">
          <h3 className="text-lg font-semibold">FIND US</h3>
          <p className="text-gray-400">
            First floor, Geo infopark, Infopark EXPY, Kakkanad
          </p>
        </div>

      </div>
      <div className="w-full h-5 flex justify-around">
        <p className="text-gray-400">© {new Date().getFullYear()} Deepnetsoft Solutions. All rights reserved.</p>
        <p className="text-gray-400">Terms & Conditions Privacy Policy</p>
      </div>
    </footer>
  );
};

export default Footer;
