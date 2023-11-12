require("dotenv").config;

const express = require("express");
const { default: mongoose } = require("mongoose");
const { rateLimit } = require("express-rate-limit");
const helmet = require("helmet");

const errorHandler = require("./middleware/error-handler");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middleware/logger");

const app = express();
const { PORT = 3001 } = process.env;
const cors = require("cors");

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

mongoose.connect(
  "mongodb://127.0.0.1:27017/wtwr_db",
  (r) => {
    console.log("connected to DB", r);
  },
  (e) => console.log("DB error", e),
);

const routes = require("./routes");

app.use(express.json());
app.use(cors());
// app.use(rateLimit());
app.use(helmet());
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
