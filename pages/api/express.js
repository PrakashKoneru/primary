const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db.js");
const middlewareAuth = require("./middleware/authorize.js")

//middleware

app.use(cors());
app.use(express.json());
pool();

//routes

app.use("/primaryLenders/loans", middlewareAuth, require("./routes/loans"));
app.use("/primaryLenders/auth", require("./routes/login"));

app.listen(5003, () => {
  console.log(`Server is starting on port 5003`);
});
