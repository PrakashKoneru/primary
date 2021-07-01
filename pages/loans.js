import React, { useState, useEffect } from 'react';
import { Box, Input, Flex, Container, Select } from '@chakra-ui/react';
import axios from 'axios';
import SubNav from './components/reUsable/SubNav';
import { ThemeContext } from './_app';
import fieldLineUp from './components/utils/fieldLineUp';
import LoanView from './components/loanView';
import GraphView from './components/graphView';
import Cookies from "js-cookie";

const Loans = () => {
	const navList = [
		'New Loans',
		'Pending Loans',
		'Rejected Loans',
		'Approved Loans',
		'Graph View'
	];
	const [newLoans, setNewLoans] = useState(null);
	const [selectedNav, setSelectedNav] = useState(navList[0]);
	useEffect(async() => {
		const { data: { newLoans } } = await axios.get('http://localhost:5000/primaryLenders/loans/new', 
			 {
				headers: {
					pToken: Cookies.get('pToken')
				}
			}
		);
		setNewLoans(newLoans)
	}, [])
	
	return (
		<ThemeContext.Consumer>
			{(theme) => {
				return (
					<Container
						id="container"
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
								onClick={(index) => setSelectedNav(navList[index])}
							/>
						</Box>
						{selectedNav === navList[0] && (
							<LoanView
								loans={newLoans}
							/>
						)}
						{selectedNav === navList[navList.length - 1] && (
							<GraphView />
						)}
					</Container>
				)
			}}
		</ThemeContext.Consumer>
	)
}

export default Loans;