const loanFieldGroups = {
	'Paisa Risk Prediction': {
		'default_probability_percent_at_issue': {
			title: 'Probablity of Default'
		}
	},
	'Loan Information': {
		'loan_id': {
			title: 'Loan ID'
		},
		'loan_amnt': {
			title: 'Loan Amount'
		},
		'term': {
			title: 'Loan Term'
		},
		'interest_rate_percent': {
			title: 'Interest Rate'
		},
		'installment': {
			title: 'Monthly Payment'
		},
		'loan_grade': {
			title: 'Loan Grade'
		},
		'loan_sub_grade': {
			title: 'Loan Sub-grade'
		},
		'loan_issue_date': {
			title: 'Loan Issued Date'
		},
		'loan_issue_date': {
			title: 'Loan Issued Date'
		},
		'loan_status': {
			title: `Loan's Current Status`
		},
		'purpose': {
			title: 'Purpose of Loan'
		},
		'title': {
			title: 'Purpose Description'
		},
		'total_pymnt': {
			title: 'Total Payment Received'
		},
		'total_rec_principal': {
			title: 'Total Principal Received'
		},
		'total_rec_interest': {
			title: 'Total Interest Recevied'
		},
		'total_rec_late_fee': {
			title: 'Total Late Fees Recevied'
		},
		'last_pymnt_date': {
			title: 'Last Payment Date'
		},
		'last_pymnt_amnt': {
			title: 'Last Payment Amount'
		},
		'next_pymnt_date': {
			title: 'Next Payment Date'
		},
	},
	'About The Applicant': {
		'emp_title': {
			title: 'Employment Title'
		},
		'emp_length': {
			title: 'Length of Employment'
		},
		'annual_inc': {
			title: 'Annual Income'
		},
		'verification_status': {
			title: 'Income Verification'
		},
		'zip_code': {
			title: 'Zip Code'
		},
		'addr_state': {
			title: 'State'
		},
		'inq_last_6mths': {
			title: 'No of Inquiries in the last 6 months'
		},
		'application_type': {
			title: 'Application Type'
		}
	},
	'Debt Information': {
		'home_ownership': {
			title: 'Home Ownership'
		},
		'open_acc': {
			title: 'Number of open (debt) accounts'
		},
		'revol_bal': {
			title: 'Balance in revolving (debt) accounts'
		},
		'revol_util': {
			title: 'Utilization of Revolving (debt) Accounts'
		},
		'total_acc': {
			title: 'Total (debt) Accounts (includes Open and Closed)'
		},
		'last_credit_pull_date': {
			title: 'Date of Last Credit Check'
		},
		'acc_open_past_24mths': {
			title: '(Debt) Accounts opened in the last 24 months'
		},
		'bc_util': {
			title: 'Utilization of Bank Cards (Debt)'
		},
		'months_since_old_il_acct': {
			title: 'Months since "first" Installment Account opened'
		},
		'months_since_old_rev_tl_op': {
			title: 'Months since "first" Trade Line Account opened'
		},
		'months_since_rcnt_rev_tl_op': {
			title: 'Months since "recent" Revolving Account opened'
		},
		'months_since_rcnt_tl': {
			title: 'Months since "recent" Trade Line Account opened'
		},
		'mort_acc': {
			title: 'No of Mortgage Accounts'
		},
		'months_since_recent_bc': {
			title: 'Months since "recent" Bank Card opened'
		},
		'tot_hi_cred_lim': {
			title: 'Max Credit Limit available on (Debt) related accounts'
		},
	},
	'Debt Statistics': {
		'dti': {
			title: 'Debt to Income Ratio'
		},
		'avg_fico_range_high_fico_range_low': {
			title: 'FICO Score'
		},
		'diff_issue_date_earliest_cr_line_date_months': {
			title: 'Months between Loan Issued Date and "first" Credit Line'
		},
		'div_tot_cur_bal_tot_hi_cred_lim': {
			title: 'Current Balance on All accounts to Max Cred Limit'
		},
		'div_total_bal_ex_mort_tot_hi_cred_lim': {
			title: 'Total (Debt) balance to Max Cred Limit'
		},
		'div_total_bc_limit_tot_hi_cred_lim': {
			title: 'Total Bank Cards limit to Max Cred Limit'
		},
		'div_total_il_high_credit_limit_tot_hi_cred_lim': {
			title: 'Max Cred Limit (Installement Accts.) to Max Cred Limit'
		},
		'div_num_actv_bc_tl_total_acc': {
			title: '"Active" Bank Card Accounts to Total (debt) accounts'
		},
		'div_num_actv_rev_tl_total_acc': {
			title: '"Active" Revolving Accounts to Total (debt) accounts'
		},
		'div_num_bc_sats_total_acc': {
			title: 'Satisfied BankCard accounts to Total (debt) accounts'
		},
		'div_num_bc_tl_total_acc': {
			title: 'BankCard (debt) accounts to Total (debt) accounts'
		},
		'div_num_il_tl_total_acc': {
			title: 'Installment accounts to Total (debt) accounts'
		},
		'div_num_op_rev_tl_total_acc': {
			title: 'Open revolving (debt) accounts to total (debt) accounts'
		},
		'div_num_rev_accts_total_acc': {
			title: 'Revolving (debt) accounts to Total (debt) accounts'
		},
		'div_num_sats_total_acc': {
			title: 'Satisifactory (debt) accounts to Total (debt) accounts'
		},
		'div_num_tl_op_past_12m_open_acc': {
			title: 'Accounts (debt) opened in the last 1 year to Open (debt) accounts'
		},
		'div_loan_amnt_non_revol_bal': {
			title: 'Loan Amount to Total Balance (excl. mortgage and revol balance)'
		},
		'div_acc_open_past_24mths_open_acc': {
			title: 'No of open accounts (last 24 months) to Open (debt) accounts'
		},
		'div_acc_open_past_24mths_open_acc': {
			title: 'No of open accounts (last 24 months) to Open (debt) accounts'
		},
	},
	'Non Payment History': {
		'div_tot_coll_amt_tot_hi_cred_lim': {
			title: 'Total Collected Amount (past) to Max Credit Limit'
		},
		'div_acc_now_delinq_open_acc': {
			title: 'Current delinquent accounts to Open (debt) accounts'
		},
		'div_num_accts_ever_120_pd_open_acc': {
			title: 'All (>120 days) due accounts to Open (debt) accounts'
		},
		'div_num_tl_30dpd_open_acc': {
			title: 'Current (>30 days) due accounts to Open (debt) accounts'
		},
		'div_num_tl_90g_dpd_24m_open_acc': {
			title: `Last two years' (>90 days) due accounts to Open (debt) accounts`
		},
		'div_delinq_2yrs_open_acc': {
			title: `Delinquent Accts in last 2 years to Open (debt) accounts`
		},
		'div_pub_rec_total_acc': {
			title: `No of (bad) public records to Total (debt) accounts`
		},
		'div_collections_12_mths_ex_med_open_acc': {
			title: 'No of collections (last 12 months) to Open (debt) accounts'
		},
		'div_chargeoff_within_12_mths_open_acc': {
			title: 'No of charge offs (last 12 months) to Open (debt) accounts'
		},
		'div_pub_rec_bankruptcies_total_acc': {
			title: 'No of public bankruptcy records to Total (debt) accounts'
		},
		'div_tax_liens_total_acc': {
			title: 'No of tax liens to Total (debt) accounts'
		},
		'div_delinq_amnt_tot_cur_bal': {
			title: 'Delinquency amount to Total Credit Limit'
		},
		'div_delinq_amnt_tot_cur_bal': {
			title: 'Delinquency amount to Total Credit Limit'
		},
	}
};

export default loanFieldGroups;