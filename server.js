const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req,res) => {
  res.send("Welcome to the Jukebox API!")
})

app.use("/users", require("./api/users.js"))

app.use((req,res,next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use((req,res,next) => {
  next({ status: 404, message: "Endpoint doesn't exist."})
});

app.use((err,req,res,next) => {
  console.error(err);
  res.status(err.status || 500);
  res.json(err.message || "Something has gone terribly wrong.")
})

app.listen(PORT, () =>{
  console.log(`listening on port ${PORT}`);
});