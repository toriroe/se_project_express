require("dotenv").config();

const express = require("express");

const { default: mongoose } = require("mongoose");
const helmet = require("helmet");

const { errors } = require("celebrate");

const app = express();
const { PORT = 3001 } = process.env;
const cors = require("cors");
const errorHandler = require("./middleware/error-handler");
const { requestLogger, errorLogger } = require("./middleware/logger");
const { limiter } = require("./utils/limiter");

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

/* ------------------------------- Crash test; Remove after code review ------------------------------- */

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

/* -------------------------------------------------------------------------- */

const routes = require("./routes");

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
