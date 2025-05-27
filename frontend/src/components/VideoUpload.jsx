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

const VideoUpload = () => {
  const [video, setVideo] = useState(null);
  const [athleteIds, setAthleteIds] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!video || !athleteIds) {
      alert("Please provide a video file and athlete IDs.");
      return;
    }

    const formData = new FormData();
    formData.append("video", video);
    formData.append("athleteIds", athleteIds);

    try {
      await axios.post("http://localhost:5000/api/videos/upload", formData);
      alert("Video uploaded and athletes tagged!");
      setVideo(null);
      setAthleteIds("");
    } catch (err) {
      console.error(err);
      alert("Failed to upload video.");
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
          Upload Video & Tag Athletes
        </Typography>

        <Stack spacing={2}>
          <Button variant="contained" component="label">
            Select Video
            <input
              type="file"
              accept=".mp4,.mov"
              hidden
              onChange={(e) => setVideo(e.target.files[0])}
            />
          </Button>

          {video && (
            <Typography variant="body2" color="text.secondary">
              Selected: {video.name}
            </Typography>
          )}

          <TextField
            label="Athlete IDs (e.g. 1,2)"
            value={athleteIds}
            onChange={(e) => setAthleteIds(e.target.value)}
            fullWidth
          />

          <Button variant="contained" onClick={handleSubmit}>
            Upload Video
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default VideoUpload;
