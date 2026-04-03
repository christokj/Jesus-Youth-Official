import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { Box, Typography, Grid } from "@mui/material";

import { pillars } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const PillarCard = ({ index, title, icon, description }) => (
  <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      style={{ width: '100%' }}
    >
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        style={{ height: '100%' }}
      >
        <Box
          sx={{
            backgroundColor: "background.paper",
            p: 4,
            borderRadius: "20px",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "flex-start",
            border: "1px solid rgba(145, 94, 255, 0.2)",
            transition: "all 0.3s ease",
            "&:hover": {
              borderColor: "rgba(145, 94, 255, 0.5)",
              backgroundColor: "rgba(145, 94, 255, 0.05)",
            }
          }}
        >
          <Box sx={{ width: 80, height: 80, mb: 3 }}>
            <img
              src={icon}
              alt={title}
              style={{ width: "100%", height: "100%", objectFit: "contain", filter: "drop-shadow(0 0 8px rgba(145, 94, 255, 0.5))" }}
              onError={(e) => {
                e.target.src = "https://res.cloudinary.com/dfm6raue1/image/upload/v1750397101/20211229_221839__1_-removebg-preview_sayl4j.png"; 
              }}
            />
          </Box>

          <Typography variant="h5" sx={{ color: "white", fontWeight: "bold", mb: 2 }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
            {description}
          </Typography>
        </Box>
      </Tilt>
    </motion.div>
  </Grid>
);

const Pillars = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <Typography variant="subtitle1" sx={{ color: "text.secondary", textTransform: "uppercase", letterSpacing: 2 }}>
          A Unique Spirituality
        </Typography>
        <Typography variant="h2" sx={{ color: "white", fontWeight: 900, fontSize: { xs: "2.5rem", sm: "3.5rem" } }}>
          The Six Pillars.
        </Typography>
      </motion.div>

      <Box sx={{ w: "100%", display: "flex", mt: 3 }}>
        <motion.div variants={fadeIn("", "", 0.1, 1)}>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              fontSize: "1.05rem",
              lineHeight: 1.8,
              maxWidth: "md",
            }}
          >
            Drawn from the spirit of the Catholic Charismatic Renewal and the rich traditions of the Church, 
            this unique spirituality is rooted in six strong pillars. It is structured around the needs of 
            people as they live out their everyday lives in homes, offices, universities, schools, trains, 
            playgrounds and streets around the world.
          </Typography>
        </motion.div>
      </Box>

      <Box sx={{ mt: { xs: 8, md: 10 } }}>
        <Grid container spacing={4} justifyContent="center" alignItems="stretch">
          {pillars.map((pillar, index) => (
            <PillarCard key={`pillar-${index}`} index={index} {...pillar} />
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default SectionWrapper(Pillars, "pillars");
