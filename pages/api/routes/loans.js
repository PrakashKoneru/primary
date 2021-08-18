const express = require("express");
const moment = require("moment");
const router = express.Router();
const pool = require("../db.js");

router.get("/counts", async (req, res) => {
	try {
		const newLoans = await pool().query("SELECT count(*) AS count FROM loans WHERE approval_status = $1", ["new"]);
		const pendingLoans = await pool().query("SELECT count(*) AS count FROM loans WHERE approval_status = $1", ["pending"]);
		const rejectedLoans = await pool().query("SELECT count(*) AS count FROM loans WHERE approval_status = $1 AND $2 = ANY (rejected_ids)", ["rejected", req.lender_id]);
		const approvedLoans = await pool().query("SELECT count(*) AS count FROM loans WHERE approval_status = $1 AND approver_id = $2", ["approved", req.lender_id]);
		return res.json({ 
			'New Loans': newLoans.rows[0].count,
			'Pending Loans': pendingLoans.rows[0].count,
			'Rejected Loans': rejectedLoans.rows[0].count,
			'Approved Loans': approvedLoans.rows[0].count
		});
	} catch(err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

router.get("/new", async (req, res) => {
	try {
		const loans = await pool().query("SELECT loan_id, loan_amnt, term, interest_rate_percent, annual_inc, loan_sub_grade, default_probability_percent_at_issue, approval_status FROM loans WHERE approval_status = $1 LIMIT 100", ["new"]);
		return res.json({ loans: loans.rows });
	} catch(err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

router.post("/details", async (req, res) => {
	try {
		const { loan_id } = req.body;
		const loan = await pool().query("SELECT * FROM loans WHERE loan_id = $1", [loan_id]);
		if(loan.rows.length === 0) {
			res.status(404).send("Invalid Request")
		}

		if(loan.rows[0].approval_status === "approved" && loan.rows[0].approver_id != req.lender_id) {
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
		const { lender_id } = req.body
		const loans = await pool().query("SELECT * FROM loans WHERE approval_status = $1 LIMIT 100", ["pending"]);
		// logic for hiding four loans to attach them in borrower onboarding flow. Need to remove after finalizing the actual transunion flow
		const filteredLoans = loans.rows.filter((loan) => {
			if (
				loan.loan_id !== '8e359f42-9eab-4718-a004-99b35ba28d4d' &&
				loan.loan_id !== '6996728d-8cde-4c3e-8808-08b892020754' &&
				loan.loan_id !== '5e13e474-00f8-4a32-91c2-614a5eedd41e' &&
				loan.loan_id !== '7c1ce11a-4f49-4f41-9919-1a269b3bef94'
			) {
				return loan
			}
		});
		return res.json({ loans: filteredLoans });
	} catch(err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

router.get("/rejected", async (req, res) => {
	try {
		const loans = await pool().query("SELECT * FROM loans WHERE approval_status = $1 AND $2 = ANY (rejected_ids) LIMIT 100", ["rejected", req.lender_id]);
		return res.json({ loans: loans.rows });
	} catch(err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

router.get("/completed", async (req, res) => {
	try {
		const completedLoans = await pool().query("SELECT * FROM loans WHERE approval_status = $1 AND approver_id = $2", [
			"completed",
			req.lender_id
		]);
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', "December"]
		const loansWithMonths = completedLoans.rows.map((loan) => {
			loan.issue_month = loan.loan_issue_date.slice(0, 3);
			return loan
		})
		return res.json({ loans: loansWithMonths });
	} catch(err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

router.get("/approved", async (req, res) => {
	try {
		const approvedLoans = await pool().query("SELECT * FROM loans WHERE approval_status = $1 AND approver_id = $2 LIMIT 100", [
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
		let updatedLoans;

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
				updatedLoans = await pool().query("SELECT loan_id, loan_amnt, term, interest_rate_percent, annual_inc, loan_sub_grade, default_probability_percent_at_issue, approval_status FROM loans WHERE approval_status = $1 LIMIT 100", ["new"]);
				// return res.json({ loans: loans.rows });
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
				updatedLoans = await pool().query("SELECT loan_id, loan_amnt, term, interest_rate_percent, annual_inc, loan_sub_grade, default_probability_percent_at_issue, approval_status FROM loans WHERE approval_status = $1 LIMIT 100", ["new"]);
				// return res.json({ loans: loans.rows });
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
				updatedLoans = await pool().query("SELECT loan_id, loan_amnt, term, interest_rate_percent, annual_inc, loan_sub_grade, default_probability_percent_at_issue, approval_status FROM loans WHERE approval_status = $1 LIMIT 100", ["new"]);
				// return res.json({ loans: loans.rows });
			})
		}

		const newLoans = await pool().query("SELECT count(*) AS count FROM loans WHERE approval_status = $1", ["new"]);
		const pendingLoans = await pool().query("SELECT count(*) AS count FROM loans WHERE approval_status = $1", ["pending"]);
		const rejectedLoans = await pool().query("SELECT count(*) AS count FROM loans WHERE approval_status = $1 AND $2 = ANY (rejected_ids)", ["rejected", req.lender_id]);
		const approvedLoans = await pool().query("SELECT count(*) AS count FROM loans WHERE approval_status = $1 AND approver_id = $2", ["approved", req.lender_id]);
		return res.json({
			loanCount: {
				'New Loans': newLoans.rows[0].count,
				'Pending Loans': pendingLoans.rows[0].count,
				'Rejected Loans': rejectedLoans.rows[0].count,
				'Approved Loans': approvedLoans.rows[0].count
			},
			loans: updatedLoans.rows
		});
	} catch(err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
})

module.exports = router;