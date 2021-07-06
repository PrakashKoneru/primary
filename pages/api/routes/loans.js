const express = require("express");
const moment = require("moment");
const router = express.Router();
const pool = require("../db.js");

router.get("/new", async (req, res) => {
	try {
		const loans = await pool().query("SELECT * FROM loans WHERE approval_status = $1", ["new"]);
		return res.json({ loans: loans.rows });
	} catch(err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

router.post("/details", async (req, res) => {
	try {
		const { loan_id, lender_id } = req.body;
		const loan = await pool().query("SELECT * FROM loans WHERE loan_id = $1", [loan_id]);
		if(loan.rows.length === 0) {
			res.status(404).send("Invalid Request")
		}

		if(loan.rows[0].approval_status === "approved" && loan.rows[0].approver_id != lender_id) {
			res.status(401).send("Invalid Request")
		}

		return res.json({ loan: loan.rows[0] });
	} catch(err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

router.get("/pending", async (req, res) => {
	try {
		const loans = await pool().query("SELECT * FROM loans WHERE approval_status = $1", ["pending"]);
		return res.json({ loans: loans.rows });
	} catch(err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

router.get("/rejected", async (req, res) => {
	try {
		const loans = await pool().query("SELECT * FROM loans WHERE approval_status = $1 AND $2 = ANY (rejected_ids)", ["rejected", req.lender_id]);
		return res.json({ loans: loans.rows });
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
		return res.json({ loans: loansWithMonths });
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

		// No Changes on loan if approved or rejected
		if(loan.rows[0].approval_status === 'rejected' || loan.rows[0].approval_status === 'approved') {
			res.status(401).send("Invalid Request")
		}
		
		if(approval_status === "approved") {
			pool().query('UPDATE loans SET approval_status = $1, approver_id = $2 WHERE loan_id = $3', [
				approval_status, lender_id, loan_id
			],
			async (error, results) => {
				if (error) {
					throw error
				}
				// const loans = await pool().query("SELECT * FROM loans WHERE approval_status = $1", ["new"]);
				return res.json({ status: 'approved' });
			})
		}

		if(approval_status === "pending") {
			const pending_ids = loan.rows[0].pending_ids;
			pool().query('UPDATE loans SET pending_ids = $1, approval_status = $2 WHERE loan_id = $3', [
				[...pending_ids, lender_id], "pending", loan_id
			],
			async (error, results) => {
				if (error) {
					throw error
				}
				return res.json({ status: 'pending' });
			})
		}

		if(approval_status === "rejected") {
			const rejected_ids = loan.rows[0].rejected_ids;
			pool().query('UPDATE loans SET rejected_ids = $1, approval_status = $2 WHERE loan_id = $3', [
				[...rejected_ids, lender_id], "rejected", loan_id
			],
			async (error, results) => {
				if (error) {
					throw error
				}
				return res.json({ status: 'rejected' });
			})
		}
	} catch(err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
})

module.exports = router;