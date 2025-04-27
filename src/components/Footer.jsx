import React from "react";

const Footer = () => {
  return (
    <footer className=" text-white bg-gradient-to-br from-black via-gray-600 to-black">
      <div className="container mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

        {/* Connect Section */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-2xl font-bold mb-4">Connect With Us</h3>
          <p className="text-gray-400 mb-2">+91 6282130289</p>
          <p className="text-gray-400">
            Email us at{" "}
            <a
              href="mailto:jychengaloor@gmail.com"
              className="text-blue-400 hover:text-blue-300 transition"
            >
              jychengaloor@gmail.com
            </a>
          </p>
        </div>

        {/* Jesus Youth Section */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-2xl font-bold mb-4">Jesus Youth Chengaloor</h3>
          <p className="text-gray-400">
            Prayer, Word of God, Sacraments, Fellowship, Evangelization and The option for the poor
          </p>
        </div>

        {/* Find Us Section with Embedded Map */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-2xl font-bold mb-4">Find Us</h3>

          {/* Embedded Map */}
          <div className="w-full h-20 rounded-xl overflow-hidden shadow-lg">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.6812644119794!2d76.2756346750402!3d10.373891089731601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7f5b3b4085c7b%3A0x6219ab7b02a0f8eb!2sOur%20Lady%20of%20Mount%20Carmel%20Syro-Malabar%20Catholic%20Church%2C%20Chengaloor!5e0!3m2!1sen!2sin!4v1714224701877!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 "></div>

      {/* Bottom Bar */}
      <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Jesus Youth Chengaloor. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-white transition">Terms & Conditions</a>
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
