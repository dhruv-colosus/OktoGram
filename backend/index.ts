import express from "express";
import { getUser } from "./api";

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

const user = await getUser({
  params: { user_id: "59ec5b96-d6a1-4109-8d08-dce7ed680000" },
});
console.log(user);
