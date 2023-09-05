const express = require("express");
const app = express();

const mongoose = require("mongoose");

require("dotenv").config();

const cors = require("cors");

const coursesRouter = require("./routes/courses_routes");
const httpStatusText = require("./utils/http_status_text");

app.use(cors());
app.use(express.json());

app.use("/api/v1/courses", coursesRouter);

app.use("*", (req, res, next) => {
  return res.status(404).json({
    status: httpStatusText.ERROR,
    message: "This Resource is not available",
  });
});

app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.statusCode || 500).json({
    status: error.statusText || httpStatusText.ERROR,
    message: error.message,
    data: null,
  });
});

const port = process.env.PORT || 8000;

const connectToDB = async (url) => {
  try {
    await mongoose.connect(url);
    app.listen(port, () => console.log(`App is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

connectToDB(process.env.MONGO_URL);
