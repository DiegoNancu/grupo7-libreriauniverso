const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const proRoutes = require("./routes/producRoutes");
const catRoutes = require("./routes/categoriaRoutes");

mongoose.set('strictQuery', false);


app.use(cors());
app.use(express.json());
app.options("*", cors());
app.use("/api", proRoutes);
app.use("/api", catRoutes);


const options = {
  useNewUrlParser: true,
  autoIndex: true,
  keepAlive: true,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.DB, options, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Connected to database");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port  ${process.env.PORT}`);
});