const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const TodoModel = require("./Models/Todo");
const UserModel = require("./Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser")

require("dotenv").config();
const app = express();

//middleware
app.use(bodyParser.json());


app.use(cors());
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));


//authentication
// Routes
app.use("/auth", require("./Routers/auth"));



//Routes
app.get("/get", async (req, res) => {
  const allTasks = await TodoModel.find();
  res.json(allTasks);
});

app.post("/add", async (req, res) => {
  const newTask = await TodoModel.create(req.body);
  res.status(201).json({ newTask });
});

app.put("/edit/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTask = req.body.task;

    const result = await TodoModel.findByIdAndUpdate(
      taskId,
      { task: updatedTask },
      { new: true }
    );

    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error updating task", error });
  }
});

app.delete("/delete/:id", async (req, res) => {
  const result = await TodoModel.findByIdAndDelete(req.params.id);
  res.json(result);
});

app.listen(2000, () => {
  console.log("Server is running at http://localhost:2000");
});
