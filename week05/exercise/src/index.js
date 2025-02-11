"use strict";

const express = require("express");
const userRouter = require("./routers/user");

const app = express();

//application middleware
app.use(express.json());

//route
app.get("/", (_req, res) => {
  res.send("Server Running..");
});

app.use("/api/user", userRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});