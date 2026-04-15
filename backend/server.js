const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [
  { id: 1, title: "Learn Docker" },
  { id: 2, title: "Learn Kubernetes" }
];

// GET tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// ADD task
app.post("/tasks", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title
  };
  tasks.push(newTask);
  res.json(newTask);
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});