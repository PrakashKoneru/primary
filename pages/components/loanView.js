import React, { useState, useEffect } from 'react';
import { Box, Input, Flex, Container, Select, Button } from '@chakra-ui/react';
import axios from 'axios';
import SubNav from './reUsable/SubNav';
import LoansDeck from './reUsable/loansDeck';
import { ThemeContext } from '../_app';
import fieldLineUp from '../../utils/fieldLineUp';
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";

function removeEmptyFields(data) {
  Object.keys(data).forEach(key => {
    if (data[key] === '' || data[key] == null) {
      delete data[key];
    }
  });
}

const LoanView = ({ loans, setLoansToRender, setLoanCounts, selectedNav }) => {
	const [loading, setLoading] = useState(false);
	const [filterBy, setFilterBy] = useState(null);
	const { register, handleSubmit, watch, formState: { errors } } = useForm();

	const sortLoans = (sortBy) => {
		const baseURL =  '/primary/primaryLenders/loans/sort';
		axios.post(baseURL,
			{ sortBy, selectedNav },
			{
				headers: {
					pToken: Cookies.get('pToken')
				}
			}
		).then(({ data: { loans } }) => {
			setLoansToRender(loans)
			setLoading(false)
		})
	}

	const filterLoans = ({ fundedAmountMin, fundedAmountMax, annualIncomeMin, annualIncomeMax, loanGrade }) => {
		const baseURL =  '/primary/primaryLenders/loans/filter';
		if (fundedAmountMin === '') fundedAmountMin = '0';
		if (fundedAmountMax === '') fundedAmountMax = '75000';
		if (annualIncomeMin === '') annualIncomeMin = '0';
		if (annualIncomeMax === '') annualIncomeMax = '10000000000000000';

		axios.post(baseURL,
			{ fundedAmountMin, fundedAmountMax, annualIncomeMin, annualIncomeMax, loanGrade, selectedNav },
			{
				headers: {
					pToken: Cookies.get('pToken')
				}
			}
		).then(({ data: { loans } }) => {
			setLoansToRender(loans)
			setLoading(false)
		})
	}

    return (
			<ThemeContext.Consumer>
				{(theme) => {
					return (
						<Flex
							mt="30px"
							flexDirection={{ sm: "column", md: "row" }}
						>
							<Box
								w={{ md: "300px", sm: "100%" }}
								minWidth={{ md: "300px", sm: "100%" }}
							>
								<Box
									px="15px"
									py="25px"
									border={`1px solid ${theme.colors.gray}`}
									borderRadius="3px"
									key={selectedNav}
								>
									<div>
										<div style={{ fontWeight: '700' }}>Sort By :</div>
										<Select
											name="loans"
											id="loans"
											onChange={(e) => {
												setLoading(true)
												sortLoans(e.target.value)
											}}
											style = {{border: `1px solid ${theme.colors.gray}`}}
										>
											{fieldLineUp.map((item) => {
												return(
													<option
														key={item.title}
														value={item.def}
														border={`1px solid ${theme.colors.gray}`}
													>
														{item.title}
													</option>
												)
											})}
										</Select>
									</div>
									<form onSubmit={handleSubmit(filterLoans)}>
										<div style={{ marginTop: '30px'}}>
											<div style={{ fontWeight: '700' }}>Filter By :</div>
											<div>
												<div style={{fontSize: '14px', marginTop: '15px'}}>
													<div style={{ fontWeight: '400' }}>Funded Amount</div>
													<div style={{display: 'flex', marginTop: '7px', justifyContent: 'space-between' }}>
														<Input
															placeholder="min"
															w="48%"
															type="number"
															{...register("fundedAmountMin")}
														/>
														<Input
															w="48%"
															placeholder="max"
															type="number"
															{...register("fundedAmountMax")}
														/>
													</div>
												</div>
												<div style={{fontSize: '14px', marginTop: '15px'}}>
													<div style={{ fontWeight: '400' }}>Annual Income</div>
													<div style={{display: 'flex', marginTop: '7px', justifyContent: 'space-between' }}>
														<Input
															placeholder="min"
															w="48%"
															type="number"
															{...register("annualIncomeMin")}
														/>
														{/* {
																validate: value => value
															} */}
														<Input
															w="48%"
															placeholder="max"
															type="number"
															{...register("annualIncomeMax")}
														/>
													</div>
												</div>
												<div style={{fontSize: '14px', marginTop: '15px'}}>
													<div style={{ fontWeight: '400' }}>Loan Grade</div>
													<div style={{display: 'flex', marginTop: '7px'}}>
														<Select 
															style={{ marginTop: '0px', fontSize: '14px', border: '1px solid rgba(224,210,210, 0.6)'}}
															// onChange={(e) => {
															// 	setFilterBy(e.target.value)
															// }}
															{...register("loanGrade")}
														>
															<option value="%">All Grades</option>
															<option value="A">A</option>
															<option value="B">B</option>
															<option value="C">C</option>
															<option value="D">D</option>
														</Select>
													</div>
												</div>
												<Flex
													justifyContent="flex-end"
												>
													<Button
														mt="20px"
														type="submit"
													>
														Apply Filters
													</Button>
												</Flex>
											</div>
										</div>
									</form>
								</Box>
							</Box>
							{loans && !loading ? (
								<LoansDeck
									loans={loans}
									filterBy={filterBy}
									setLoanCounts={setLoanCounts}
								/>
							) : (
								<Flex
									w="100%"
									maxHeight={{ md: "100vh", sm: "auto" }}
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
							)}
						</Flex>
					)
				}}
			</ThemeContext.Consumer>
    )
}

export default LoanView;