const express = require("express");
const cors = require("cors");
const pool = require("./pages/api/db.js");
const middlewareAuth = require("./pages/api/middleware/authorize.js")
const next = require("next");
const { parse } = require('url')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  try {
    const server = express();

    server.use(cors());
    server.use(express.json());
    pool();

    //routes
    server.use("/", require("./pages/api/routes/simpleGet"));
    server.use("/primary/primaryLenders/loans", middlewareAuth, require("./pages/api/routes/loans"));
    server.use("/primary/primaryLenders/auth", require("./pages/api/routes/login"));
  
    server.all('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      console.log(`Ready on http://localhost:${port}`);
    });
  } catch (err) {
    console.log('error', err);
  }
});

