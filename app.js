const express = require("express");
const app = express();

const mongoose = require("mongoose");

require("dotenv").config();

const cors = require("cors");

const coursesRouter = require("./routes/courses_routes");
const httpStatusText = require("./utils/http_status_text");
const { errorHandlerMiddleware } = require("./middleware/error_handler");
const notFoundMiddleware = require("./middleware/not_found");

app.use(cors());
app.use(express.json());

app.use("/api/v1/courses", coursesRouter);

app.use("*", notFoundMiddleware);

app.use(errorHandlerMiddleware);

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
