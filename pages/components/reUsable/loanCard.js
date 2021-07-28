import React from 'react';
import { Box, Input, Flex, Container, Select, Button } from '@chakra-ui/react';
import { ThemeContext } from '../../_app';
import fieldLineUp from '../../../utils/fieldLineUp';
import Cookies from "js-cookie";
import axios from 'axios';
import Link from 'next/link';

const LoanCard = ({ loans, key, sortBy, filterBy }, ref) => {
	const updateLoan = ({ loan_id, approval_status }) => {
		const baseURL = process.env.NODE_ENV === 'production' ? '/primary/api/primaryLenders/loans/update' : 'http://localhost:5003/primaryLenders/loans/update';
		axios.post(baseURL,
			{ loan_id, approval_status },
			{
				headers: {
					pToken: Cookies.get('pToken')
				}
			}
		)
	}

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
						{loans && loans.sort((a, b) => {
							if(a[sortBy] < b[sortBy]) { return -1 }
							if(a[sortBy] > b[sortBy]) { return 1 }
							if(a[sortBy] === b[sortBy]) { return 0 }
						}).map((loan, index) => {
							return (
								<div key={loan.loan_id}>
									<Flex
										alignItems="center"
										border={`1px solid ${theme.colors.gray}`}
										borderRadius="3px"
										p="15px"
										mt={index === 0 ? '0px' : `15px`}
										flexDirection="column"
									>
										<Flex
											flexWrap="wrap"
											w="100%"
											justifyContent="space-between"
											alignItems="center"
										>
											{fieldLineUp.slice(0, 6).map((field, index) => {
												return (
													<Box
														w={{sm: "46%", md: "auto" }}
														py="10px"
														ml={{md: index===0 ? "0px" : "10px", sm: "10px"}}
														whiteSpace="wrap"
													>
														<Box>{field.title}</Box>
														<Box>{field.format(loan[field.def])}</Box>
													</Box>
												)
											})}
										</Flex>
										<Box w="100%" mt="10px">
											<Flex
												w="100%"
												justifyContent="flex-end"
												flexWrap="wrap"
											>
												<Button
													width="110px"
													variant="loanCard"
													style={{background: '#179942', color: 'white'}}
													onClick={() => updateLoan({
														loan_id: loan.loan_id,
														approval_status: 'approved'
													})}
													// disabled={loadingState}
												>
													Approve
												</Button>
												<Button
													ml="15px"
													width="110px"
													variant="loanCard"
													style={{background: '#FA1103', color: 'white'}}
													onClick={() => updateLoan({
														loan_id: loan.loan_id,
														approval_status: 'rejected'
													})}
													// disabled={loadingState}
												>
													Reject
												</Button>
												<Button
													mt={{sm: "10px", md: "0px"}}
													ml="15px"
													width="110px"
													variant="loanCard"
													onClick={() => updateData('pending')}
													// disabled={loadingState}
													style={{background: '#19858F', color: 'white'}}
													onClick={() => updateLoan({
														loan_id: loan.loan_id,
														approval_status: 'pending'
													})}
												>
													Decide Later
												</Button>
												<Button
													mt={{sm: "10px", md: "0px"}}
													ml="15px"
													width="110px"
													variant="loanCard"
												>
													<Link href={`/loans/${loan.loan_id}`}>All Details</Link>
												</Button>
											</Flex>
										</Box>
									</Flex>
								</div>
							)
						})}
					</Box>
				)
			}}
		</ThemeContext.Consumer>
	)
}

export default LoanCard;