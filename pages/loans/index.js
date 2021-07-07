import React, { useState, useEffect } from 'react';
import { Box, Input, Flex, Container, Select } from '@chakra-ui/react';
import axios from 'axios';
import SubNav from '../components/reUsable/SubNav';
import { ThemeContext } from '../_app';
import fieldLineUp from '../components/utils/fieldLineUp';
import LoanView from '../components/loanView';
import GraphView from '../components/graphView';
import Cookies from "js-cookie";

const Loans = () => {
	const navList = [
		'New Loans',
		'Pending Loans',
		'Rejected Loans',
		'Approved Loans',
		'Approved Graphs',
		'Completed Loans',
		'Completed Graphs',
	];
	const [loans, setLoans] = useState(null);
	const [selectedNav, setSelectedNav] = useState(navList[0]);
	const getLoans = async (index) => {
		if(navList[index].includes("Graph")) return setSelectedNav(navList[index]);
		const { data: { loans } } = await axios.get(`http://localhost:5000/primaryLenders/loans/${navList[index].split(" ")[0].toLowerCase()}`,
			{
				headers: {
					pToken: Cookies.get('pToken')
				}
			}
		);
		await setLoans(loans)
		await setSelectedNav(navList[index])
	}

	useEffect(async() => {
		getLoans(0)
	}, [])
	
	return (
		<ThemeContext.Consumer>
			{(theme) => {
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
							/>
						</Box>
						{selectedNav.includes("Graph") ? (
							<Box key={Math.random()}>
								<GraphView selectedNav={selectedNav} />
							</Box>
						) : 
							<LoanView
								loans={loans}
							/>
						}
					</Container>
				)
			}}
		</ThemeContext.Consumer>
	)
}

export default Loans;