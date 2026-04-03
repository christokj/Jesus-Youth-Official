import { React, Suspense, lazy } from "react";
import { Box } from "@mui/material";
import { Hero, Navbar, About, Pillars, GlobalReach, Contact } from "../../components";
const StarsCanvas = lazy(() => import("../../components/canvas/Stars"));

const HomePage = () => {
  return (
    <Box sx={{ position: 'relative', zIndex: 0, bgcolor: 'background.default' }}>
      <Box
        sx={{
          backgroundImage: 'url("./src/assets/herobg.png")', // Make sure path is correct or imported
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <Navbar />
        <Hero />
      </Box>
      <About />
      <Pillars />
      <GlobalReach />
      <Box sx={{ position: 'relative', zIndex: 0 }}>
        <Contact />
        <Suspense fallback={null}>
          <StarsCanvas />
        </Suspense>
      </Box>
    </Box>
  );
};

export default HomePage;
