import React, { useState, useEffect } from 'react';
import { Box, Input, Flex, Container, Select } from '@chakra-ui/react';
import axios from 'axios';
import SubNav from '../../components/reUsable/SubNav';
import { ThemeContext } from '../../_app';
import LoanView from '../../components/loanView';
import GraphView from '../../components/graphView';
import Cookies from "js-cookie";

const Loans = () => {
	const navList = [
		'New Loans',
		'Pending Loans',
		'Rejected Loans',
		'Approved Loans',
		'Approved Stats',
		'Completed Loans',
		'Completed Stats',
	];
	const [loans, setLoans] = useState(null);
	const [loanCounts, setLoanCounts] = useState(null);
	const [selectedNav, setSelectedNav] = useState(navList[0]);
	const getLoans = async (index) => {
		if(navList[index].includes("Stats")) return setSelectedNav(navList[index]);
		const baseURL = `primaryLenders/loans/${navList[index].split(" ")[0].toLowerCase()}`;
		const { data: { loans } } = await axios.get(baseURL,
			{
				headers: {
					pToken: Cookies.get('pToken')
				}
			}
		);
		setLoans(loans)
		setSelectedNav(navList[index])
	}

	const getLoanCounts = async () => {
		const baseURL = `primaryLenders/loans/counts`;
		const { data: { ...counts } } = await axios.get(baseURL,
			{
				headers: {
					pToken: Cookies.get('pToken')
				}
			}
		);
		setLoanCounts(counts)
	}

	useEffect(async() => {
		getLoans(0)
		getLoanCounts();
	}, [])

	return (
		<ThemeContext.Consumer>
			{(theme) => {
				if(!loans || !loanCounts) {
					return (
						<Flex
							w="100%"
							height={{ md: "calc(100vh - 80px)", sm: "auto" }}
							overflowY="scroll"
							ml={{ md: "30px", sm: "0px" }}
							mt={{ md: "0px", sm: "30px" }}
							alignItems="center"
							justifyContent="center"
							fontSize="50px"
							color={theme.colors.secondary}
						>
							Loading...
						</Flex>
					)
				}
				return (
					<Container
						display="block"
						padding={{
							md: "0px 50px",
							sm: "0px 30px"
						}}
					>
						<Box
							mt={{ md: "50px", sm: "25px" }}
						>
							<SubNav
								navList={navList}
								onClick={(index) => {
									getLoans(index)
								}}
								loanCounts={loanCounts}
							/>
						</Box>
						{selectedNav.includes("Stats") ? (
							<Box key={Math.random()}>
								<GraphView selectedNav={selectedNav} />
							</Box>
						) : 
							<LoanView
								loans={loans}
								setLoanCounts={setLoanCounts}
							/>
						}
					</Container>
				)
			}}
		</ThemeContext.Consumer>
	)
}

export default Loans;