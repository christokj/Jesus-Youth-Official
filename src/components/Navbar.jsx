import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { navLinks } from "../constants";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navContent = (
    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
      {navLinks.map((nav) => (
        <Button
          key={nav.id}
          component={nav.id === "register-page" ? Link : "a"}
          to={nav.id === "register-page" ? "/register-page" : undefined}
          href={nav.id !== "register-page" ? `/#${nav.id}` : undefined}
          onClick={() => setActive(nav.title)}
          variant={nav.id === "register-page" ? "contained" : "text"}
          color={nav.id === "register-page" ? "primary" : "inherit"}
          sx={{
            color: active === nav.title || nav.id === "register-page" ? "white" : "text.secondary",
            fontWeight: "medium",
            "&:hover": { color: "white" },
            boxShadow: nav.id === "register-page" ? "0 4px 6px -1px var(--primary)" : "none",
          }}
        >
          {nav.title}
        </Button>
      ))}
    </Box>
  );

  const drawerContent = (
    <Box
      sx={{
        width: 250,
        backgroundColor: "background.default",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        p: 2,
      }}
      role="presentation"
      onClick={handleDrawerToggle}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <IconButton onClick={handleDrawerToggle} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navLinks.map((nav) => (
          <ListItem
            button
            key={nav.id}
            component={nav.id === "register-page" ? Link : "a"}
            to={nav.id === "register-page" ? "/register-page" : undefined}
            href={nav.id !== "register-page" ? `/#${nav.id}` : undefined}
            onClick={() => setActive(nav.title)}
            sx={{
              textAlign: "center",
              bgcolor: nav.id === "register-page" ? "primary.main" : "transparent",
              color: active === nav.title || nav.id === "register-page" ? "white" : "text.secondary",
              borderRadius: nav.id === "register-page" ? 2 : 0,
              mb: 1,
              "&:hover": { color: "white" },
            }}
          >
            <ListItemText primary={nav.title} primaryTypographyProps={{ fontWeight: "medium" }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={scrolled ? 4 : 0}
        sx={{
          backgroundColor: scrolled ? "background.default" : "transparent",
          transition: "all 0.3s ease-in-out",
          top: 0,
          py: 1,
        }}
      >
        <Toolbar sx={{ maxWidth: "lg", width: "100%", mx: "auto", display: "flex", justifyContent: "space-between" }}>
          {/* Logo */}
          <Box
            component={Link}
            to="/"
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}
            sx={{ display: "flex", alignItems: "center", gap: 2, textDecoration: "none" }}
          >
            <img
              src="https://res.cloudinary.com/dfm6raue1/image/upload/v1750397101/20211229_221839__1_-removebg-preview_sayl4j.png"
              alt="logo"
              style={{ width: 44, height: 44, objectFit: "contain" }}
            />
            <Typography variant="h6" sx={{ color: "white", fontWeight: "bold", display: { xs: "none", sm: "block" } }}>
              Jesus Youth <Box component="span" sx={{ display: { xs: "none", md: "inline" } }}>&nbsp;Chengaloor</Box>
            </Typography>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>{navContent}</Box>

          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={handleDrawerToggle}>
              <MenuIcon fontSize="large" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }} 
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Navbar;
