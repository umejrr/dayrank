const express = require("express");
const cors = require("cors");
const { use } = require("react");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = express();
const User = require("./models/user.model");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const requireAuth = require("../server/middleware/requireAuth");
const Day = require("./models/dayModel");

//Token

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

//DB

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Success"))
  .catch((err) => console.error("Error: ", err));

let days = [];
let todos = [];

//Dependencies

app.use(cors());
app.use(express.json());
app.use("/api/days", requireAuth);
app.use("/api/todos", requireAuth);

//Health

app.get("/", (req, res, send) => {
  res.json({ ok: true, message: "API is running" });
});

//Days

app.post("/api/days", async (req, res) => {
  const user_id = req.userId;
  const newDay = req.body;
  console.log(newDay);

  const day = await Day.create({ ...req.body, user_id });

  res.status(201).json(day);
});

app.get("/api/days", async (req, res) => {
  const user_id = req.userId;

  const days = await Day.find({ user_id }).sort({ createdAt: -1 });

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

    res.status(200).json({ username, token });
  } catch (error) {
    //console.log(error);
    res.status(400).json({ errors: error });
  }
});

app.post("/login/user", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);

    const token = createToken(user._id);

    res.status(200).json({ username, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ errors: error });
  }
});

app.get("/api/user", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

//Listenin

const port = 5000;

app.listen(port, () => console.log(`Server listening on ${port}`));
