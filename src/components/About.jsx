import React, { useRef, useEffect } from "react";
import Tilt from 'react-parallax-tilt';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Box, Typography, Grid } from "@mui/material";

import { services } from "../constants";
import { SectionWrapper } from "../hoc";

gsap.registerPlugin(ScrollTrigger);

const useGsap = (elementRef, animation, delay = 0) => {
  useEffect(() => {
    if (elementRef.current) {
      gsap.fromTo(
        elementRef.current,
        animation.from,
        {
          ...animation.to,
          delay,
          scrollTrigger: {
            trigger: elementRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [elementRef, animation, delay]);
};

const ServiceCard = ({ index, title, icon }) => {
  const cardRef = useRef(null);
  useGsap(cardRef, {
    from: { opacity: 0, y: 100, scale: 0.8 },
    to: { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" },
  }, index * 0.2);

  return (
    <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <Tilt className="service-card-wrapper" style={{ width: '100%' }}>
        <Box
          ref={cardRef}
          sx={{
            width: "100%",
            background: "linear-gradient(90deg, #00cea8, #bf61ff)",
            p: "1px",
            borderRadius: "20px",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Box
            sx={{
              backgroundColor: "background.paper",
              borderRadius: "20px",
              py: 5,
              px: { xs: 4, sm: 6 },
              minHeight: 280,
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img src={icon} alt={title} style={{ width: 64, height: 64, objectFit: "contain" }} />
            <Typography variant="h6" sx={{ color: "white", fontWeight: "bold", textAlign: "center", mt: 2 }}>
              {title}
            </Typography>
          </Box>
        </Box>
      </Tilt>
    </Grid>
  );
};

const About = () => {
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);

  // Heading Animation
  useGsap(headingRef, {
    from: { opacity: 0, x: -50 },
    to: { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
  });

  // Paragraph Animation
  useGsap(paragraphRef, {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
  }, 0.3);

  return (
    <>
      <Box ref={headingRef}>
        <Typography variant="subtitle1" sx={{ color: "text.secondary", textTransform: "uppercase", letterSpacing: 2 }}>
          Introduction
        </Typography>
        <Typography variant="h2" sx={{ color: "white", fontWeight: 900, fontSize: { xs: "2.5rem", sm: "3.5rem" } }}>
          The Movement.
        </Typography>
      </Box>

      <Typography
        ref={paragraphRef}
        variant="body1"
        sx={{
          mt: 4,
          color: "text.secondary",
          fontSize: "1.05rem",
          lineHeight: 1.8,
          maxWidth: "md",
        }}
      >
        Jesus Youth is an international Catholic movement that challenges young people to live a meaningful,
        creative and fulfilling life.
        This life begins with a personal,
        loving encounter with Jesus and continues as they grow in a joyful spirituality within a community of likeminded friends.
        Each person in the movement is called to live the faith every day by sharing the Good News in today’s diverse environments and by carrying the mission of the Church to the peripheries of our world.
        Jesus Youth is approved by the Holy See and present in over 40 countries.
      </Typography>

      <Box sx={{ mt: { xs: 8, md: 10 } }}>
        <Grid container spacing={4} justifyContent="center">
          {services.map((service, index) => (
            <ServiceCard key={service.title} index={index} {...service} />
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default SectionWrapper(About, "about");
