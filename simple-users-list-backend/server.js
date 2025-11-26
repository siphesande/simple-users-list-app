const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");

//const UserRepo = require("./repo/InMemoryUserRepo");
const UserRepo = require("./repo/MongoUserRepo");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(bodyParser.json());

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to Simple Users List Backend API");
});


const userRepository = new UserRepo();
app.use("/users", userRoutes(userRepository));

app.listen(3000, () => {
  console.log("Simple Users List Backend running at http://localhost:3000");
});
