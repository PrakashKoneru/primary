const express = require("express");
const router = express.Router();
const pool = require("../db.js");

router.get("/all", async (req, res) => {
	try {
		const loans = await pool().query("SELECT * FROM loans");
		return res.json({ loans: loans.rows });
	} catch(err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

module.exports = router;