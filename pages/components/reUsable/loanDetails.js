import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { Box, Flex, Container } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from "js-cookie";
import loanFieldGroups from '../../../utils/loanFieldGroups';
import { ThemeContext } from '../../_app';

const LoanDetails = ({ loan }) => {
	// Figure a better way to extract loan ID than from route. try to avoid using loan_id in route name.
	const router = useRouter()
  const id = loan.loan_id;
	const [loanDetails, setLoanDetails] = useState();
	const [selectedGroup, setSelectedGroup] = useState(null);

	useEffect(async () => {
		if(id) {
			const baseURL = '/primary/primaryLenders/loans/details';
			const { data: { loan }} = await axios.post(baseURL,
				{ loan_id: id },
				{
					headers: {
						pToken: Cookies.get('pToken')
					}
				}
			)
			setLoanDetails(loan)
		}
	}, [id])
	
	if(!loanDetails) return null;
	if(!id) return (<Flex alignItems="center" justifyContent="center">Loading...</Flex>)
	return (
		<ThemeContext.Consumer>
			{(theme) => {
				return (
					<Container
						padding={{
							md: "0px 70px",
							sm: "0px 30px"
						}}
						mb="80px"
					>
						{Object.keys(loanFieldGroups).map((loanFieldGroup, index) => {
							return (
								<Box
									mt="40px"
									border={`1px solid ${theme.colors.gray}`}
									borderRadius="3px"
									py="10px"
								>
									<Flex
										fontWeight="600"
										px="20px"
										py="15px"
									>
										<Box w="80%">
											{loanFieldGroup}
										</Box>
										{index > 0 && (
											<Flex
												w="15%"
												flexWrap="wrap"
												justifyContent="space-between"
												mr={{ sm: "0px", md: "45px" }}
											>
												<Box
													cursor="pointer"
													onClick={() => setSelectedGroup(index)}
													whiteSpace={{ md: "nowrap", sm: "wrap" }}
												>
													Show
												</Box>
												<Box
													cursor="pointer"
													onClick={() => index === selectedGroup && setSelectedGroup(null)}
													whiteSpace="nowrap"
													mt={{ md: "0px", sm: "15px"}}
												>
													Hide
												</Box>
											</Flex>
										)}
									</Flex>
									<Box>
										{index > 0 ? (
											index === selectedGroup ? (
												<Box>
													{Object.keys(loanFieldGroups[loanFieldGroup]).map((each, index) => {
														return (
															<Flex
																px="20px"
																py="15px"
																bg={index % 2 === 0 ? `${theme.colors.grayLight}`: `${theme.colors.white}`}
															>
																<Box w="80%">{loanFieldGroups[loanFieldGroup][each]['title']}</Box>
																<Box w="20%">{loanDetails[each]}</Box>
															</Flex>
														)
													})}
												</Box>
											) : null
										) : (
											<Box>
												<Box px="20px">
													<Box>{`${parseInt(loanDetails['default_probability_percent_at_issue'])}%`}</Box>
												</Box>
											</Box>
										)}
									</Box>
								</Box>
							)
						})}
					</Container>
				)
			}}
		</ThemeContext.Consumer>
	)
}

export default LoanDetails;