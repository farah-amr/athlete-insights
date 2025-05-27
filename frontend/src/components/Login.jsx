import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Stack, Box, Paper } from "@mui/material";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("isAdmin", "true");
        onLogin(); // tell App.js we're logged in
        navigate("/");
      }
    } catch (err) {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f7f7f7",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Athlete Insights
        </Typography>
        <Typography variant="h6" textAlign="center" gutterBottom>
          Admin Login
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Login;
