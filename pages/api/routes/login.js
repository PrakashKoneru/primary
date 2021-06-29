const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db.js");
const jwtGenerator = require("../utils/jwtGenerator");

router.post("/resetPassword", async (req, res) => {
	try {
		const { email, oldPassword, newPassword } = req.body;
		const lender = await pool().query("SELECT * FROM lenders WHERE lender_email = $1", [
      email
		]);

		if (lender.rows.length === 0) {
      return res.status(401).json("Lender Doesnot Exist.");
		} 

		const validPassword = await bcrypt.compare(
      oldPassword,
      lender.rows[0].lender_password
    );
		
		if (!validPassword) {
			return res.status(401).json("Invalid Password from email.");
		} else if (oldPassword === newPassword){
			return res.status(401).json("Old Password Canot match New Password");
		} else {
			const salt = await bcrypt.genSalt(10);
			const bcryptPassword = await bcrypt.hash(newPassword, salt);

			pool().query(
				'UPDATE lenders SET lender_password = $1, lender_password_changed = $2 WHERE lender_id = $3',
				[bcryptPassword, true, lender.rows[0].lender_id],
				(error, results) => {
					if (error) {
						throw error
					}
					const pToken = jwtGenerator(lender.rows[0].lender_id);
					return res.json({ pToken });
				}
			);
		}

		// const loans = await pool().query("SELECT * FROM loans");
		// return res.json({ loans: loans.rows });
	} catch(err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const lender = await pool().query("SELECT * FROM lenders WHERE lender_email = $1", [
      email
		]);
		
		if (lender.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    } else if (lender.rows[0].lender_password_changed === false) {
			return res.status(401).json("Password not reset");
		}

    const validPassword = await bcrypt.compare(
      password,
      lender.rows[0].lender_password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }
    const pToken = jwtGenerator(lender.rows[0].lender_id);
    return res.json({ pToken });
	} catch(err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

module.exports = router;