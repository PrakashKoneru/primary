const graphLineUp = (loans = []) => {
	let total_amount_invested = 0;
	let total_received = 0;
	let percent_of_late_payments;
	let percent_of_late_payments_filter = 0;
	let total_princ_lost = 0;
	let total_princ_received = 0;
	let total_princ_pending = 0;
	
	let initial_expected_returns;
	let initial_expected_returns_num = 0;
	let current_expected_returns;
	let current_expected_returns_num = 0;
	let total_interest_received_current = 0;
	let total_princ_received_current = 0;
	let total_princ_pending_current = 0;
	let total_princ_pending_lost_current = 0;
	let total_princ_lost_current = 0;
	let received_return = 0;

	loans && loans.map((loan, index) => {
		// For Field 1
		total_amount_invested+=Number(loan.loan_amnt)
		
		// For Field 2
		total_received+=Number(loan.total_pymnt)

		// For Field 3
		if(loan.loan_status === "late_16_30_days" || loan.loan_status === "late_30_120_days" || loan.loan_status === "late_grace_period") {
			percent_of_late_payments_filter+=Number(loan.total_pymnt)
		}

		// For Field 4
		if(loan.loan_status === "default" || loan.loan_status === "charged_off") {
			total_princ_lost+=Number(loan.loan_amnt) - Number(loan.total_pymnt)
		}

		// For Field 5
		total_princ_received+=Number(loan.total_rec_principal)

		// For Field 6. Directly in return

		// For Field 7.
		initial_expected_returns_num+=Number(loan.installment)*(Number(loan.term.slice(0,1)))*12

		// For Field 8
		if(loan.loan_status != "default" && loan.loan_status != "charged_off" && loan.loan_status != "fully_paid") {
			total_princ_pending_lost_current+=Number(loan.loan_amnt) - Number(loan.total_rec_principal)
			if(loan.loan_status === "late_16_30_days" || loan.loan_status === "late_30_120_days" || loan.loan_status === "late_grace_period") {
				total_princ_lost_current+=Number(loan.loan_amnt) - Number(loan.total_pymnt);
			}
			total_princ_received_current+=Number(loan.total_rec_principal)
			total_interest_received_current+=Number(loan.total_rec_interest)
			current_expected_returns_num+=Number(loan.installment)*(Number(loan.term.slice(0,1)))*12
		}
		total_princ_pending_current = total_princ_pending_lost_current - total_princ_lost_current

		// For Field 9. Look Return Directly.
	})
	let current_expected_returns_numerator = current_expected_returns_num - (total_princ_received_current + total_interest_received_current)
	total_princ_pending = total_amount_invested - total_princ_received - total_princ_lost;
	
	// return {
	// 	total_amount_invested: total_amount_invested.toFixed(2),
	// 	total_received: total_received.toFixed(2),
	// 	percent_of_late_payments: `${((percent_of_late_payments_filter/total_received) * 100).toFixed(2)}%`,
	// 	total_princ_lost: total_princ_lost.toFixed(2),
	// 	total_princ_received: total_princ_received.toFixed(2),
	// 	total_princ_pending: (total_amount_invested - total_princ_received - total_princ_lost).toFixed(2),
	// 	initial_expected_returns: `${(((initial_expected_returns_num/total_amount_invested) - 1) * 100).toFixed(2)}%`,
	// 	current_expected_returns: `${(((current_expected_returns_numerator/total_princ_pending_current) - 1) * 100).toFixed(2)}%`,
	// 	received_return: `${(((total_received/total_princ_received) - 1)*100).toFixed(2)}%`,
	// }

	return {
		blocks: [
			{
				title: 'Total Amount Invested',
				value: total_amount_invested.toFixed(2),
			},
			{
				title: 'Total Received',
				value: total_received.toFixed(2),
			},
			{
				title: '% of Late Payments',
				value: `${((percent_of_late_payments_filter/total_received) * 100).toFixed(2)}%`
			},
			{
				title: 'Total Princ. Lost',
				value: total_princ_lost.toFixed(2),
			},
			{
				title: 'Total Princ. Received',
				value: total_princ_received.toFixed(2),
			},
			{
				title: 'Total Princ. Pending',
				value: (total_princ_pending).toFixed(2),
			},
			{
				title: 'Initial Expected Returns',
				value: `${(((initial_expected_returns_num/total_amount_invested) - 1) * 100).toFixed(2)}%`
			},
			{
				title: 'Current Expected Returns',
				value: `${(((current_expected_returns_numerator/total_princ_pending_current) - 1) * 100).toFixed(2)}%`,
			},
			{
				title: 'Received Return',
				value: `${(((total_received/total_princ_received) - 1)*100).toFixed(2)}%`,
			}
		],
		total_princ_received: Number(total_princ_received.toFixed(2)),
		total_princ_pending: Number(total_princ_pending.toFixed(2)),
		total_princ_lost: Number(total_princ_lost.toFixed(2))
	};
}

export default graphLineUp;