const express = require("express");
const prisma = require("../db");

const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Social Media API" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
