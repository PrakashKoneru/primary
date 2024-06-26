CREATE TABLE loans(
  loan_id uuid DEFAULT uuid_generate_v4(),
  loan_amnt numeric NOT NULL,
  term text COLLATE pg_catalog."default" NOT NULL,
  interest_rate_percent numeric NOT NULL,
  installment numeric NOT NULL,
  loan_grade text COLLATE pg_catalog."default" NOT NULL,
  loan_sub_grade text COLLATE pg_catalog."default" NOT NULL,
  emp_title text COLLATE pg_catalog."default" NOT NULL,
  emp_length text COLLATE pg_catalog."default" NOT NULL,
  home_ownership text COLLATE pg_catalog."default" NOT NULL,
  annual_inc numeric NOT NULL,
  verification_status text COLLATE pg_catalog."default" NOT NULL,
  loan_issue_date text COLLATE pg_catalog."default" NOT NULL,
  loan_status text COLLATE pg_catalog."default" NOT NULL,
  purpose text COLLATE pg_catalog."default" NOT NULL,
  title text COLLATE pg_catalog."default",
  zip_code text COLLATE pg_catalog."default",
  addr_state text COLLATE pg_catalog."default",
  dti numeric,
  inq_last_6mths numeric,
  open_acc numeric,
  revol_bal numeric,
  revol_util numeric,
  total_acc numeric,
  total_pymnt numeric,
  total_rec_principal numeric,
  total_rec_interest numeric,
  total_rec_late_fee numeric,
  last_pymnt_date text COLLATE pg_catalog."default",
  last_pymnt_amnt numeric,
  next_pymnt_date text COLLATE pg_catalog."default",
  last_credit_pull_date text COLLATE pg_catalog."default",
  last_fico_range_high numeric,
  last_fico_range_low numeric,
  application_type text COLLATE pg_catalog."default",
  acc_open_past_24mths numeric,
  bc_util numeric,
  months_since_old_il_acct numeric,
  months_since_old_rev_tl_op numeric NOT NULL,
  months_since_rcnt_rev_tl_op numeric,
  months_since_rcnt_tl numeric,
  mort_acc numeric NOT NULL,
  months_since_recent_bc numeric NOT NULL,
  tot_hi_cred_lim numeric,
  diff_fico_range_high_fico_range_low numeric NOT NULL,
  avg_fico_range_high_fico_range_low numeric NOT NULL,
  us_unemploy_rate_next_3yr_avg numeric,
  diff_issue_date_earliest_cr_line_date_months integer,
  div_tot_coll_amt_tot_hi_cred_lim numeric NOT NULL,
  div_tot_cur_bal_tot_hi_cred_lim numeric NOT NULL,
  div_total_bal_ex_mort_tot_hi_cred_lim numeric NOT NULL,
  div_total_bc_limit_tot_hi_cred_lim numeric,
  div_total_il_high_credit_limit_tot_hi_cred_lim numeric,
  div_num_actv_bc_tl_total_acc numeric,
  div_num_actv_rev_tl_total_acc numeric NOT NULL,
  div_num_bc_sats_total_acc numeric NOT NULL,
  div_num_bc_tl_total_acc numeric NOT NULL,
  div_num_il_tl_total_acc numeric NOT NULL,
  div_num_op_rev_tl_total_acc numeric,
  div_num_rev_accts_total_acc numeric,
  div_num_sats_total_acc numeric NOT NULL,
  div_acc_now_delinq_open_acc numeric NOT NULL,
  div_num_accts_ever_120_pd_open_acc numeric NOT NULL,
  div_num_tl_30dpd_open_acc numeric NOT NULL,
  div_num_tl_90g_dpd_24m_open_acc numeric NOT NULL,
  div_num_tl_op_past_12m_open_acc numeric NOT NULL,
  div_delinq_2yrs_open_acc numeric NOT NULL,
  div_pub_rec_total_acc numeric,
  div_collections_12_mths_ex_med_open_acc numeric NOT NULL,
  div_chargeoff_within_12_mths_open_acc numeric,
  div_pub_rec_bankruptcies_total_acc numeric,
  div_tax_liens_total_acc numeric,
  div_delinq_amnt_tot_cur_bal numeric,
  div_loan_amnt_non_revol_bal numeric,
  div_acc_open_past_24mths_open_acc numeric,
  default_probability_percent_at_issue numeric,
  pending_ids  integer ARRAY
  PRIMARY KEY(loan_id)
);

-- INSERT INTO users (user_name, user_email, user_password) VALUES ('henry', 'henryly213@gmail.com', 'kthl8822');
loan_amnt, term, interest_rate_percent, installment, loan_grade, loan_sub_grade, emp_title, emp_length, home_ownership, annual_inc, verification_status, loan_issue_date, loan_status, purpose, title, zip_code, addr_state, dti, inq_last_6mths, open_acc, revol_bal, revol_util, total_acc, total_pymnt, total_rec_principal, total_rec_interest, total_rec_late_fee, last_pymnt_date, last_pymnt_amnt, next_pymnt_date, last_credit_pull_date, last_fico_range_high, last_fico_range_low, application_type, acc_open_past_24mths, bc_util, months_since_old_il_acct, months_since_old_rev_tl_op, months_since_rcnt_rev_tl_op, months_since_rcnt_tl, mort_acc, months_since_recent_bc, tot_hi_cred_lim, diff_fico_range_high_fico_range_low, avg_fico_range_high_fico_range_low, us_unemploy_rate_next_3yr_avg, diff_issue_date_earliest_cr_line_date_months, div_tot_coll_amt_tot_hi_cred_lim, div_tot_cur_bal_tot_hi_cred_lim, div_total_bal_ex_mort_tot_hi_cred_lim, div_total_bc_limit_tot_hi_cred_lim, div_total_il_high_credit_limit_tot_hi_cred_lim, div_num_actv_bc_tl_total_acc, div_num_actv_rev_tl_total_acc, div_num_bc_sats_total_acc, div_num_bc_tl_total_acc, div_num_il_tl_total_acc, div_num_op_rev_tl_total_acc, div_num_rev_accts_total_acc, div_num_sats_total_acc, div_acc_now_delinq_open_acc, div_num_accts_ever_120_pd_open_acc, div_num_tl_30dpd_open_acc, div_num_tl_90g_dpd_24m_open_acc, div_num_tl_op_past_12m_open_acc, div_delinq_2yrs_open_acc, div_pub_rec_total_acc, div_collections_12_mths_ex_med_open_acc, div_chargeoff_within_12_mths_open_acc, div_pub_rec_bankruptcies_total_acc, div_tax_liens_total_acc, div_delinq_amnt_tot_cur_bal, div_loan_amnt_non_revol_bal, div_acc_open_past_24mths_open_acc, default_probability_percent_at_issue