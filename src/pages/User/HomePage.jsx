
const HomePage = () => {

  const imageUrl = 'https://res.cloudinary.com/dfm6raue1/image/upload/v1742993296/menu_header_tvrv1v.jpg';

  return (
    <div className="relative h-[411px]">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{ backgroundImage: `url('${imageUrl}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
        <div className="flex justify-center items-center h-full z-20">
          <div className="flex flex-col items-center gap-8 max-w-4xl px-4">
            <h1 className="text-8xl font-extrabold text-white">WELCOME </h1>
            <p className="text-white max-w-xl text-center">
              Our mission is to provide exceptional customer service and innovative solutions that elevate the quality of life for our customers.
            </p>
            <a to="/menu" className="inline-block px-6 py-3 text-white font-bold tracking-widest uppercase">
              ORDER ONLINE
            </a>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
