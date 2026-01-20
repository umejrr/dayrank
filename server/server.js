const express = require("express");
const cors = require("cors");
const { use } = require("react");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = express();
const User = require("./models/user.model");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//Fake DBs

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Success"))
  .catch((err) => console.error("Error: ", err));

let days = [];
let todos = [];

//Dependencies

app.use(cors());
app.use(express.json());

//Health

app.get("/", (req, res, send) => {
  res.json({ ok: true, message: "API is running" });
});

//Days

app.post("/api/days", (req, res) => {
  const newDay = req.body;
  days.push(newDay);
  res.status(201).send({ success: true });
});

app.get("/api/days", (req, res) => {
  res.json(days);
});

//Todos

app.post("/api/todos", (req, res) => {
  const newTodo = req.body;
  todos.push(newTodo);
  res.status(201).send({ success: true });
});

app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.delete("/api/todos/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id === Number(id));

  if (index === -1) {
    return res.status(400).json({ error: "Doesnt exist!" });
  }

  todos.splice(index, 1);

  res.status(200).send("Ok!");
});

app.patch("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find((t) => t.id === id);
  const update = req.body;

  for (let key in update) {
    if (key in todo) {
      todo[key] = update[key];
    }
  }

  res.send(todo);
});

app.get("/api/todos/:id", (req, res) => {
  const id = req.params.id;
  res.send(id);
});

//Users

app.post("/signup/user", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.signup(username, email, password);

    const token = createToken(user._id);

    res.status(200).json({ email, token });
    res.redirect("/dashboard");
  } catch (error) {
    //console.log(error);
    res.status(400).json({ errors: error });
  }
});

app.post("/login/user", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    //console.log(error);
    res.status(400).json({ errors: error });
  }
});

app.get("/api/user", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

const port = 5000;

app.listen(port, () => console.log(`Server listening on ${port}`));
