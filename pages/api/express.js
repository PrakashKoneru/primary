const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db.js");

//middleware

app.use(cors());
app.use(express.json());
pool();

//routes

app.use("/loans", require("./routes/loans"));
// app.use("/", require("./routes/scoreCalculator"));

app.listen(5000, () => {
  console.log(`Server is starting on port 5000`);
});
