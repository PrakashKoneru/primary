const express = require("express");
const moment = require("moment");
const router = express.Router();
const pool = require("../db.js");

router.get("/new", async (req, res) => {
	try {
		const loans = await pool().query("SELECT * FROM loans WHERE approval_status = $1", ["new"]);
		return res.json({ newLoans: loans.rows });
	} catch(err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

router.get("/approved", async (req, res) => {
	try {
		const approvedLoans = await pool().query("SELECT * FROM loans WHERE approval_status = $1 AND approver_id = $2", [
			"approved",
			req.lender_id
		]);
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', "December"]
		const loansWithMonths = approvedLoans.rows.map((loan) => {
			loan.issue_month = loan.loan_issue_date.slice(0, 3);
			return loan
		})
		return res.json({ approvedLoans: loansWithMonths });
	} catch(err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

router.post("/update", async (req, res) => {
	try {
		const { loan_id, approval_status } = req.body;
		const lender_id = req.lender_id;
		const loan = await pool().query("SELECT * FROM loans WHERE loan_id = $1", [
			loan_id
		]);

		if(loan.rows.length === 0) {
			res.status(404).send("Invalid Request")
		}

		if(loan.rows[0].approval_status === 'rejected' || loan.rows[0].approval_status === 'approved') {
			res.status(401).send("Invalid Request")
		}
		
		if(approval_status) {
			pool().query('UPDATE loans SET approval_status = $1, approver_id = $2 WHERE loan_id = $3', [
				approval_status, lender_id, loan_id
			],
			async (error, results) => {
				if (error) {
					throw error
				}
				// const loans = await pool().query("SELECT * FROM loans WHERE approval_status = $1", ["new"]);
				return res.json({ approved: 'approved' });
			})
		} 
	} catch(err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
})

module.exports = router;