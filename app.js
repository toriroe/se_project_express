const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();

const { PORT = 3001 } = process.env;

app.use((req, res, next) => {
  req.user = {
    _id: "6514c9e60e1eea25cf8a822d",
  };
  next();
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db", (r) => {
  console.log("connected to DB", r), (e) => console.log("DB error", e);
});

const routes = require("./routes");
app.use(express.json());
app.use(routes);
