import React from "react";
import { motion } from "framer-motion";
import { Box, Typography, Grid, useTheme } from "@mui/material";

import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const GlobalReach = () => {
  const theme = useTheme();

  return (
    <>
      <motion.div variants={textVariant()}>
        <Typography variant="subtitle1" sx={{ color: "text.secondary", textTransform: "uppercase", letterSpacing: 2 }}>
          Our Global Impact
        </Typography>
        <Typography variant="h2" sx={{ color: "white", fontWeight: 900, fontSize: { xs: "2.5rem", sm: "3.5rem" } }}>
          A Growing Mission.
        </Typography>
      </motion.div>

      <Box sx={{ mt: { xs: 8, md: 10 } }}>
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} md={6}>
            <motion.div
              variants={fadeIn("right", "spring", 0.5, 0.75)}
              style={{ height: '100%' }}
            >
              <Box
                sx={{
                  backgroundColor: "background.paper",
                  p: { xs: 4, md: 5 },
                  borderRadius: "20px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  border: "1px solid rgba(145, 94, 255, 0.2)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(145, 94, 255, 0.05)",
                  }
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    backgroundColor: "rgba(170, 166, 195, 0.1)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 4,
                  }}
                >
                  <Typography variant="h4" sx={{ color: "primary.main", fontWeight: "bold" }}>
                    40+
                  </Typography>
                </Box>
                <Typography variant="h5" sx={{ color: "white", fontWeight: "bold", mb: 2 }}>
                  International Presence
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                  Jesus Youth is present in over 40 countries across 5 continents, 
                  transforming lives through its refreshing spirituality and mission.
                </Typography>
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              variants={fadeIn("left", "spring", 0.5, 0.75)}
              style={{ height: '100%' }}
            >
              <Box
                sx={{
                  backgroundColor: "background.paper",
                  p: { xs: 4, md: 5 },
                  borderRadius: "20px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  border: "1px solid rgba(145, 94, 255, 0.2)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(145, 94, 255, 0.05)",
                  }
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    backgroundColor: "rgba(170, 166, 195, 0.1)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 4,
                  }}
                >
                  <img 
                    src="https://res.cloudinary.com/dfm6raue1/image/upload/v1750397101/20211229_221839__1_-removebg-preview_sayl4j.png" 
                    alt="Holy See"
                    style={{ width: 48, height: 48, objectFit: "contain", filter: "grayscale(1) invert(1)" }}
                  />
                </Box>
                <Typography variant="h5" sx={{ color: "white", fontWeight: "bold", mb: 2 }}>
                  Approved by Holy See
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                  Recognized as an International Private Association of the Faithful, 
                  Jesus Youth remains deeply rooted in the heart of the Church.
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SectionWrapper(GlobalReach, "global-reach");
