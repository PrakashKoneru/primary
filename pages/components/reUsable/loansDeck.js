import React, { useState, useEffect } from 'react';
import { Box, Input, Flex, Container, Select, Button } from '@chakra-ui/react';
import { ThemeContext } from '../../_app';
import fieldLineUp from '../../../utils/fieldLineUp';
import Cookies from "js-cookie";
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LoanCard from './loanCard';

const LoansDeck = ({ loans, key, sortBy, filterBy, setLoanCounts }, ref) => {
	const [loansToRender, setLoansToRender] = useState(loans);
	const router = useRouter();
	// const updateLoan = ({ loan_id, approval_status }) => {
	// 	const baseURL =  '/primary/primaryLenders/loans/update';
	// 	axios.post(baseURL,
	// 		{ loan_id, approval_status },
	// 		{
	// 			headers: {
	// 				pToken: Cookies.get('pToken')
	// 			}
	// 		}
	// 	).then(({ data: { loans } }) => {
	// 		setLoansToRender(loans)
	// 	})
	// }

	useEffect(async() => {
		setLoansToRender(loans)
	}, [loans])

	return (
		<ThemeContext.Consumer>
			{(theme) => {
				return (
					<Box
						w="100%"
						maxHeight={{ md: "100vh", sm: "auto" }}
						overflowY="scroll"
						ml={{ md: "30px", sm: "0px" }}
						mt={{ md: "0px", sm: "30px" }}
					>
						{loansToRender && loansToRender.map((loan, index) => {
							return (
								<div key={Math.random()}>
									<LoanCard
										index={index}
										loan={loan}
										setLoansToRender={setLoansToRender}
										setLoanCounts={setLoanCounts}
									/>
								</div>
							)
						})}
					</Box>
				)
			}}
		</ThemeContext.Consumer>
	)
}

export default LoansDeck;