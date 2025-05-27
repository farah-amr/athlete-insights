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

const MetricsForm = () => {
  const [formData, setFormData] = useState({
    athlete_id: "",
    video_id: "",
    metric_type: "",
    value: ""
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
      await axios.post("http://localhost:5000/api/metrics", formData);
      alert("Metric submitted!");
      setFormData({
        athlete_id: "",
        video_id: "",
        metric_type: "",
        value: ""
      });
    } catch (error) {
      alert("Error submitting metric");
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
      <Paper sx={{ padding: 4, width: 450 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Add Performance Metric
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Athlete ID"
            name="athlete_id"
            value={formData.athlete_id}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Video ID"
            name="video_id"
            value={formData.video_id}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Metric Type"
            name="metric_type"
            value={formData.metric_type}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Value"
            name="value"
            value={formData.value}
            onChange={handleChange}
            required
            fullWidth
          />
          <Button variant="contained" onClick={handleSubmit}>
            Submit Metric
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default MetricsForm;
