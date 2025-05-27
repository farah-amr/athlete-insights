import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import AthleteForm from "./components/AthleteForm";
import VideoUpload from "./components/VideoUpload";
import MetricsForm from "./components/MetricsForm";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { AppBar, Toolbar, Button, Box } from "@mui/material";

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("isAdmin") === "true");

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setLoggedIn(false);
  };

  return (
    <Router>
      <InnerApp loggedIn={loggedIn} setLoggedIn={setLoggedIn} onLogout={handleLogout} />
    </Router>
  );
}

function InnerApp({ loggedIn, setLoggedIn, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  const showNavbar = loggedIn && location.pathname !== "/login";

  return (
    <div style={{ padding: 20 }}>
      {showNavbar && (
  <AppBar position="static" color="primary" sx={{ marginBottom: 4 }}>
    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box>
        <Button color="inherit" component={Link} to="/">Dashboard</Button>
        <Button color="inherit" component={Link} to="/athlete">Add Athlete</Button>
        <Button color="inherit" component={Link} to="/upload">Upload Video</Button>
        <Button color="inherit" component={Link} to="/metrics">Add Metrics</Button>
      </Box>
      <Button color="inherit" onClick={() => { onLogout(); navigate("/login"); }}>
        Logout
      </Button>
    </Toolbar>
  </AppBar>
)}

      <Routes>
  <Route
    path="/login"
    element={<Login onLogin={() => setLoggedIn(true)} />}
  />
  <Route
    path="/"
    element={loggedIn ? <Dashboard /> : <Navigate to="/login" />}
  />
  <Route
    path="/athlete"
    element={loggedIn ? <AthleteForm /> : <Navigate to="/login" />}
  />
  <Route
    path="/upload"
    element={loggedIn ? <VideoUpload /> : <Navigate to="/login" />}
  />
  <Route
    path="/metrics"
    element={loggedIn ? <MetricsForm /> : <Navigate to="/login" />}
  />
  <Route path="*" element={<Navigate to="/login" replace />} />
</Routes>

    </div>
  );
}

export default App;
