import { motion } from "framer-motion";
import { Box, Container, Typography, Button, Stack, useTheme } from "@mui/material";

const Hero = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      id="home"
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: "center", zIndex: 1, position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Typography
            variant="h1"
            sx={{
              color: "white",
              fontWeight: 900,
              fontSize: { xs: "3rem", sm: "4rem", md: "5rem", lg: "6rem" },
              lineHeight: 1.1,
            }}
          >
            Jesus <Box component="span" sx={{ color: "primary.main" }}>Youth</Box>
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              mt: 4,
              maxWidth: "md",
              mx: "auto",
              fontWeight: 400,
              fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
              lineHeight: 1.6,
            }}
          >
            An international Catholic movement that challenges young people to live a{" "}
            <Box component="span" sx={{ color: "primary.main", fontWeight: "bold" }}>meaningful</Box>,{" "}
            <Box component="span" sx={{ color: "primary.main", fontWeight: "bold" }}>creative</Box> and{" "}
            <Box component="span" sx={{ color: "primary.main", fontWeight: "bold" }}>fulfilling</Box> life.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center" sx={{ mt: 8 }}>
            <Button
              variant="contained"
              size="large"
              href="#about"
              sx={{ px: 4, py: 1.5, fontSize: "1.1rem" }}
            >
              Discover Our Journey
            </Button>
            <Button
              variant="outlined"
              size="large"
              href="#pillars"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                color: "white",
                borderColor: "white",
                "&:hover": { borderColor: "primary.main", backgroundColor: "rgba(145, 94, 255, 0.08)" },
              }}
            >
              The Six Pillars
            </Button>
          </Stack>
        </motion.div>
      </Container>

      {/* Scroll Indicator */}
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: 32, sm: 40 },
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <a href="#about" style={{ textDecoration: "none" }}>
          <Box
            sx={{
              width: 35,
              height: 64,
              borderRadius: "20px",
              border: "3px solid",
              borderColor: "text.secondary",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              p: "6px",
            }}
          >
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: theme.palette.text.secondary,
              }}
            />
          </Box>
        </a>
      </Box>
    </Box>
  );
};

export default Hero;