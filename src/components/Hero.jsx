import { motion } from "framer-motion";

import { styles } from "../styles";
import FlowerCircle from "./HomePage/FlowerCircle";

const Hero = () => {


  return (
    <section className={`relative w-full h-screen pt-16`} id="home">
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >

        <div className="mt-28 md:mt-5 lg:5">
          {/* <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className='text-[#915EFF]'>Christo</span>
          </h1> */}
          {/* <FlowerCircle /> */}
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            {/* Jesus Youth is an international Catholic movement that challenges young people to live a meaningful, creative and fulfilling life. */}
          </p>
        </div>
      </div>

    </section>
  );
};

export default Hero