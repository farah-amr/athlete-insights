import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Typography, 
  Card, 
  CardContent, 
  Divider, 
  Box, 
  IconButton, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button, 
  MenuItem, 
  Select, 
  InputLabel, 
  FormControl 
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [open, setOpen] = useState(false);

  const [sportFilter, setSportFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");

  const fetchDashboard = async () => {
    const params = {
      sport: sportFilter,
      startDate: startDateFilter,
      endDate: endDateFilter,
    };

    try {
      const res = await axios.get("http://localhost:5000/api/dashboard", { params });
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [sportFilter, startDateFilter, endDateFilter]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this athlete?")) {
      await axios.delete(`http://localhost:5000/api/athletes/${id}`);
      fetchDashboard();
    }
  };

  const handleEdit = (athlete) => {
    setEditData({ ...athlete });
    setOpen(true);
  };

  const handleEditSave = async () => {
    await axios.put(`http://localhost:5000/api/athletes/${editData.id}`, editData);
    setOpen(false);
    fetchDashboard();
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Athlete Performance Dashboard
      </Typography>

      {/* Filter by Sport */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Filter by Sport</InputLabel>
        <Select
          value={sportFilter}
          onChange={(e) => setSportFilter(e.target.value)}
          label="Filter by Sport"
        >
          <MenuItem value="">All Sports</MenuItem>
          <MenuItem value="Tennis">Tennis</MenuItem>
          <MenuItem value="Swimming">Swimming</MenuItem>
          <MenuItem value="Football">Football</MenuItem>
        </Select>
      </FormControl>

      {/* Filter by Date Range */}
      <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
        <TextField
          label="Start Date"
          type="date"
          fullWidth
          value={startDateFilter}
          onChange={(e) => setStartDateFilter(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="End Date"
          type="date"
          fullWidth
          value={endDateFilter}
          onChange={(e) => setEndDateFilter(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>

      {/* Render Athlete Cards */}
      {data.map((entry) => (
        <Card key={entry.athlete.id} sx={{ marginBottom: 3 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
  ID: {entry.athlete.id} — {entry.athlete.name} — {entry.athlete.sport} (Age {entry.athlete.age})
</Typography>

              <Box>
                <IconButton onClick={() => handleEdit(entry.athlete)}><EditIcon /></IconButton>
                <IconButton onClick={() => handleDelete(entry.athlete.id)}><DeleteIcon /></IconButton>
              </Box>
            </Box>

            {entry.videos.length === 0 ? (
              <Typography color="text.secondary">No videos uploaded.</Typography>
            ) : (
              entry.videos.map((video) => (
                <Box key={video.id} sx={{ marginTop: 2 }}>
                  <Divider />
                  <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
                    Video ID: {video.id} — Status: {video.status}
                  </Typography>
                  <Typography variant="body2">
  <a href={`http://localhost:5000/${video.file_path}`} target="_blank" rel="noreferrer">
    Watch Video in New Tab
  </a>
</Typography>

<video width="100%" height="auto" controls style={{ marginTop: "10px" }}>
  <source src={`http://localhost:5000/${video.file_path}`} type="video/mp4" />
  Your browser does not support the video tag.
</video>


                  {video.metrics.length === 0 ? (
                    <Typography color="text.secondary">No metrics added.</Typography>
                  ) : (
                    video.metrics.map((metric, index) => (
                      <Typography key={index} sx={{ marginLeft: 2 }}>
                        • {metric.metric_type}: {metric.value} ({new Date(metric.timestamp).toLocaleString()})
                      </Typography>
                    ))
                  )}
                </Box>
              ))
            )}
          </CardContent>
        </Card>
      ))}

      {/* Edit Athlete Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Athlete</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={editData?.name || ""}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          />
          <TextField
            label="Sport"
            fullWidth
            margin="dense"
            value={editData?.sport || ""}
            onChange={(e) => setEditData({ ...editData, sport: e.target.value })}
          />
          <TextField
            label="Age"
            type="number"
            fullWidth
            margin="dense"
            value={editData?.age || ""}
            onChange={(e) => setEditData({ ...editData, age: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
