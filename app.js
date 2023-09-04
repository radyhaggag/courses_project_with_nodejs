const express = require("express");
const app = express();

const mongoose = require("mongoose");
require("dotenv").config();

const coursesRouter = require("./routes/courses_routes");

app.use(express.json());
app.use("/api/v1/courses", coursesRouter);

const port = 8000;

const connectToDB = async (url) => {
  try {
    await mongoose.connect(url);
    app.listen(port, () => console.log(`App is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

connectToDB(process.env.MONGO_URL);
