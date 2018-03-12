const express = require("express");
const colors = require("colors/safe");

const app = express();

app.use((req, res, next) => {
  console.log(colors.rainbow(`${req.method} - ${req.originalUrl} - ${new Date()}`));
  next();
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/name/:name", (req, res) => {
  const { name } = req.params;
  res.json({
    message: `Hello, ${name}`,
  });
});

app.use((req, res, next) => {
  const error = new Error("Not found");
  res.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  res.status(res.statusCode || 500);
  res.json({
    error: error.message,
    message: error.stack,
  });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Listening on port 3000");
});
