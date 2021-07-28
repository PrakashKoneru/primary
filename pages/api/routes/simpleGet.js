const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db.js");
const jwtGenerator = require("../utils/jwtGenerator");

router.get("/", async (req, res) => {
	try {
		return res.json({ loans: 'loans' });
	} catch(err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

module.exports = router;