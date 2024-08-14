// src/pages/LoginPage.js
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

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    // Reset error message
    setError("");

    // Validate email and password
    if (!email || !password) {
      setError("Email and password are required.");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/tasks");
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error("Login error", error);
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
        <Typography variant="h4" sx={{ marginTop: 1, marginBottom: 2 }}>
          Login
        </Typography>
        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleLogin} sx={{ width: "100%" }}>
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
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;
