import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Stack,
  Typography,
  Paper,
  Box
} from "@mui/material";

const AthleteForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    sport: "",
    age: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/athletes", formData);
      alert("Athlete added successfully!");
      setFormData({ name: "", sport: "", age: "" });
    } catch (error) {
      alert("Error adding athlete");
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Paper sx={{ padding: 4, width: 400 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Add New Athlete
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Sport"
            name="sport"
            value={formData.sport}
            onChange={handleChange}
            required
          />
          <TextField
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            required
          />
          <Button variant="contained" onClick={handleSubmit}>
            Add Athlete
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default AthleteForm;
