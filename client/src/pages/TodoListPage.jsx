import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  IconButton,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

const TodoListPage = () => {
  const { tasks, addTask, updateTask, deleteTask, fetchTasks } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [username, setUsername] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        // Fetch tasks
        fetchTasks(token);

        // Fetch user info
        const userResponse = await axios.get("/api/v1/auth/info", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsername(userResponse.data.username);
      } catch (error) {
        console.error("Error fetching user info", error);
      }
    };

    fetchData();
  }, [navigate, fetchTasks]);

  const handleAddTask = () => {
    // Clear previous errors
    setTitleError("");
    setDescriptionError("");

    // Validate input fields
    if (!title.trim()) {
      setTitleError("Title is required.");
      return;
    }
    if (!description.trim()) {
      setDescriptionError("Description is required.");
      return;
    }

    const token = localStorage.getItem("token");
    if (token) {
      addTask({ title, description }, token);
      setTitle("");
      setDescription("");
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
  };

  const handleUpdateTask = () => {
    // Clear previous errors
    setTitleError("");
    setDescriptionError("");

    // Validate input fields
    if (!title.trim()) {
      setTitleError("Title is required.");
      return;
    }
    if (!description.trim()) {
      setDescriptionError("Description is required.");
      return;
    }

    const token = localStorage.getItem("token");
    if (token && editingTask) {
      updateTask(editingTask._id, { title, description }, token);
      setTitle("");
      setDescription("");
      setEditingTask(null);
    }
  };

  const handleDeleteTask = (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      deleteTask(id, token);
    }
  };

  return (
    <>
      <Header username={username} />
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
          background: "#f5f5f5",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          To-Do List
        </Typography>
        <Paper
          sx={{
            padding: 3,
            width: "100%",
            marginBottom: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            error={!!titleError}
            helperText={titleError}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            error={!!descriptionError}
            helperText={descriptionError}
          />
          {editingTask ? (
            <Button
              onClick={handleUpdateTask}
              variant="contained"
              color="primary"
              sx={{ alignSelf: "center" }}
            >
              Update Task
            </Button>
          ) : (
            <Button
              onClick={handleAddTask}
              variant="contained"
              color="primary"
              sx={{ alignSelf: "center" }}
            >
              Add Task
            </Button>
          )}
        </Paper>
        <List sx={{ width: "100%" }}>
          {tasks.length === 0 ? (
            <Typography variant="body1" align="center">
              No tasks
            </Typography>
          ) : (
            tasks.map((task) => (
              <ListItem key={task._id} sx={{ borderBottom: "1px solid #ddd" }}>
                <ListItemText
                  primary={task.title}
                  secondary={task.description}
                />
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton
                    onClick={() => handleEditTask(task)}
                    edge="end"
                    sx={{ color: "#1976d2" }} // Blue color for edit icon
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteTask(task._id)}
                    edge="end"
                    sx={{ color: "#e8554a" }} // Red color for delete icon
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))
          )}
        </List>
      </Container>
    </>
  );
};

export default TodoListPage;
