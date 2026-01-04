const express = require("express");
const cors = require("cors");
const app = express();

let days = [];

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res, send) => {
  res.json({ ok: true, message: "API is running" });
});

app.get("/api", (req, res) => {
  res.send("Halloo");
});

app.post("/api/days", (req, res) => {
  const newDay = req.body;
  days.push(newDay);
  res.status(201).send({ success: true });
});

app.get("/api/days", (req, res) => {
  res.json(days);
});

const port = 5000;

app.listen(port, () => console.log(`Server listening on ${port}`));
