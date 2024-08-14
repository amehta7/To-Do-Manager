import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

const Header = ({ username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          To-Do Manager
        </Typography>
        {username && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1" sx={{ marginRight: 2 }}>
              {username}
            </Typography>
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{
                backgroundColor: "#e8554a", // Red color for logout button
                color: "#fff", // White text color
                "&:hover": {
                  backgroundColor: "#d32f2f", // Darker red on hover
                },
              }}
            >
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
