import React, { createContext, useState, useContext } from "react";
import axios from "axios";

// Context for tasks
const TaskContext = createContext();

// Custom hook to use the TaskContext
export const useTasks = () => useContext(TaskContext);

// Provider component
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Function to fetch tasks
  const fetchTasks = async (token) => {
    try {
      const response = await axios.get("/api/v1/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  // Function to add a task
  const addTask = async (task, token) => {
    try {
      await axios.post("/api/v1/tasks", task, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks(token); // Refresh tasks
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  // Function to update a task
  const updateTask = async (id, updatedTask, token) => {
    try {
      await axios.put(`/api/v1/tasks/${id}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks(token); // Refresh tasks
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  // Function to delete a task
  const deleteTask = async (id, token) => {
    try {
      await axios.delete(`/api/v1/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks(token); // Refresh tasks
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask, fetchTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
};
