import React, { useState, useEffect } from 'react';
import { Box, Input, Flex, Container, Select } from '@chakra-ui/react';
import axios from 'axios';
import SubNav from './reUsable/SubNav';
import LoansDeck from './reUsable/loansDeck';
import { ThemeContext } from '../_app';
import fieldLineUp from '../../utils/fieldLineUp';

const LoanView = ({ loans }) => {
	const [sortBy, setSortBy] = useState('loan_amnt');
	const [filterBy, setFilterBy] = useState(null);

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
									>
										<div>
											<div style={{ fontWeight: '700' }}>Sort By :</div>
											<Select
												name="loans"
												id="loans"
												onChange={(e) => setSortBy(e.target.value)}
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
										<div style={{ marginTop: '30px'}}>
											<div style={{ fontWeight: '700' }}>Filter By :</div>
											<div>
												<div style={{fontSize: '14px', marginTop: '15px'}}>
													<div style={{ fontWeight: '400' }}>Funded Amount</div>
													<div style={{display: 'flex', marginTop: '7px', justifyContent: 'space-between' }}>
														<Input
															placeholder="min"
															w="48%"
														/>
														<Input
															w="48%"
															placeholder="max"
														/>
													</div>
												</div>
												<div style={{fontSize: '14px', marginTop: '15px'}}>
													<div style={{ fontWeight: '400' }}>Annual Income</div>
													<div style={{display: 'flex', marginTop: '7px', justifyContent: 'space-between' }}>
														<Input
															placeholder="min"
															w="48%"
														/>
														<Input
															w="48%"
															placeholder="max"
														/>
													</div>
												</div>
												<div style={{fontSize: '14px', marginTop: '15px'}}>
													<div style={{ fontWeight: '400' }}>Loan Grade</div>
													<div style={{display: 'flex', marginTop: '7px'}}>
														<Select 
															style={{ marginTop: '0px', fontSize: '14px', border: '1px solid rgba(224,210,210, 0.6)'}}
															onChange={(e) => setFilterBy(e.target.value)}
														>
															<option value="">---</option>
															<option value="A">A</option>
															<option value="B">B</option>
															<option value="C">C</option>
														</Select>
													</div>
												</div>
											</div>
										</div>
									</Box>
								</Box>
								{loans ? (
									<LoansDeck
										loans={loans}
										sortBy={sortBy}
										filterBy={filterBy}
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