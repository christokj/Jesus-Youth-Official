import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Box, Typography, TextField, Button, Grid, useTheme } from "@mui/material";

import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const theme = useTheme();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Huzaif Ahmed", // Update this as necessary
          from_email: form.email,
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <Grid container spacing={4} sx={{ mt: { xl: 6 }, overflow: "hidden" }} direction={{ xs: "column-reverse", md: "row" }}>
      <Grid item xs={12} md={6}>
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
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
            }}
          >
            <Typography variant="subtitle1" sx={{ color: "text.secondary", textTransform: "uppercase", letterSpacing: 2 }}>
              Get in touch
            </Typography>
            <Typography variant="h2" sx={{ color: "white", fontWeight: 900, mb: 4, fontSize: { xs: "2.5rem", sm: "3.5rem" } }}>
              Contact.
            </Typography>

            <Box
              component="form"
              ref={formRef}
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
            >
              <TextField
                fullWidth
                label="Your Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your good name?"
                variant="filled"
                InputProps={{
                  sx: { backgroundColor: "rgba(145, 94, 255, 0.05)", color: "white" }
                }}
                InputLabelProps={{
                  sx: { color: "text.secondary" }
                }}
              />
              <TextField
                fullWidth
                type="email"
                label="Your email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your email address?"
                variant="filled"
                InputProps={{
                  sx: { backgroundColor: "rgba(145, 94, 255, 0.05)", color: "white" }
                }}
                InputLabelProps={{
                  sx: { color: "text.secondary" }
                }}
              />
              <TextField
                fullWidth
                multiline
                rows={7}
                label="Your Message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What you want to say?"
                variant="filled"
                InputProps={{
                  sx: { backgroundColor: "rgba(145, 94, 255, 0.05)", color: "white" }
                }}
                InputLabelProps={{
                  sx: { color: "text.secondary" }
                }}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  alignSelf: "flex-start",
                  mt: 2,
                  px: 5,
                  py: 1.5,
                  backgroundColor: "rgba(145, 94, 255, 0.2)",
                  color: "white",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3)",
                  "&:hover": {
                    backgroundColor: "primary.main",
                  }
                }}
              >
                {loading ? "Sending..." : "Send"}
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Grid>

      <Grid item xs={12} md={6} sx={{ minHeight: { xs: 350, md: 550 }, height: 'auto' }}>
        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          style={{ height: '100%', width: '100%' }}
        >
          <EarthCanvas />
        </motion.div>
      </Grid>
    </Grid>
  );
};

export default SectionWrapper(Contact, "contact");
