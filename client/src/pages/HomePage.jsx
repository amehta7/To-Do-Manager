// src/pages/HomePage.js
import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        background:
          "linear-gradient(to bottom right, #c5e9b9, #f7e0b5, #e48daf, #d9aeeb)", // Colorful gradient
        padding: 3,
        boxSizing: "border-box",
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          color: "#6c248a", // Primary blue color
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        To-Do Manager
      </Typography>
      <Box mt={4} sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/login")}
          sx={{
            backgroundColor: "#1976d2", // Primary blue color
            "&:hover": {
              backgroundColor: "#1565c0", // Darker blue on hover
            },
            padding: "12px 24px",
            borderRadius: "8px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow effect
          }}
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/signup")}
          sx={{
            backgroundColor: "#d32f2f", // Secondary red color
            "&:hover": {
              backgroundColor: "#b71c1c", // Darker red on hover
            },
            padding: "12px 24px",
            borderRadius: "8px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow effect
          }}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
