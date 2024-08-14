// src/pages/SignUpPage.js
import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    // Reset error message
    setError("");

    // Validate username, email, and password
    if (!username || !email || !password) {
      setError("All fields are required.");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }

    return true;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post("/api/v1/auth/register", { username, email, password });
      navigate("/login");
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error("Registration error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",

          padding: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{ marginTop: 1, marginBottom: 2 }} // Adjusted marginTop to reduce space
        >
          Sign Up
        </Typography>
        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSignUp} sx={{ width: "100%" }}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!error && !username}
            helperText={!!error && !username ? "Username is required" : ""}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error && !email}
            helperText={!!error && !email ? "Email is required" : ""}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error && !password}
            helperText={!!error && !password ? "Password is required" : ""}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: 2,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              sx={{
                width: "100%", // Full width of the form container
                maxWidth: "400px", // Maximum width for the button
              }}
            >
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SignUpPage;
