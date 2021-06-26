const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db.js");

//middleware

app.use(cors());
app.use(express.json());
pool();

//routes

app.use("/primaryLenders/loans", require("./routes/loans"));
app.use("/primaryLenders/auth", require("./routes/login"));

app.listen(5000, () => {
  console.log(`Server is starting on port 5000`);
});
