import React, { useState } from 'react';
import {
	Box,
	Input,
	Flex,
	Container,
	Select,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
} from '@chakra-ui/react';
import { ThemeContext } from '../../_app';
import fieldLineUp from '../../../utils/fieldLineUp';
import Cookies from "js-cookie";
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LoanDetails from './loanDetails';

const LoanCard = ({ loan, setLoansToRender, index, setLoanCounts }, ref) => {
	const [showModal, setShowModal] = useState(false)
	const [showActionNotification, setActionNotification] = useState(false)
	const router = useRouter();
	const updateLoan = ({ loan_id, approval_status }) => {
		console.log(approval_status);
		setActionNotification(approval_status)
		const baseURL =  '/primary/primaryLenders/loans/update';
		axios.post(baseURL,
			{ loan_id, approval_status },
			{
				headers: {
					pToken: Cookies.get('pToken')
				}
			}
		).then(({ data: { loans, loanCount } }) => {
			setLoansToRender(loans)
			setLoanCounts({ ...loanCount })
		})
	}

	return (
		<ThemeContext.Consumer>
			{(theme) => {
				const colorHelper = {
					approved: '#179942',
					rejected: '#FA1103',
					pending: '#19858F',
				}
				if(showActionNotification) return (
					<Flex
						alignItems="center"
						border={`1px solid ${theme.colors.gray}`}
						borderRadius="3px"
						p="15px"
						mt={index === 0 ? '0px' : `15px`}
						flexDirection="column"
					>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								width: '100%',
								color: colorHelper[showActionNotification],
								fontSize: '25px',
								height: '75px',
								alignItems: 'center'
							}}
						>
							{
								`Adding to ${showActionNotification.charAt(0).toUpperCase() + showActionNotification.slice(1)} Loans`
							}
						</div>
					</Flex>
				)
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
							<Box w="100%">
								<Flex
									w="100%"
									justifyContent="flex-end"
									flexWrap="wrap"
								>
									{(loan.approval_status === "new" || loan.approval_status === "pending") ? (
										<Button
											width="110px"
											variant="loanCard"
											style={{background: '#179942', color: 'white'}}
											onClick={() => updateLoan({
												loan_id: loan.loan_id,
												approval_status: 'approved'
											})}
											mt="10px"
											// disabled={loadingState}
										>
											Approve
										</Button>
									) : null}
									{(loan.approval_status === "new" || loan.approval_status === "pending") ? (
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
											mt="10px"
										>
											Reject
										</Button>
									) : null}
									{(loan.approval_status === "new") ? (
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
											mt="10px"
										>
											Decide Later
										</Button>
									) : null}
									<Button
										mt={{sm: "10px", md: "0px"}}
										ml="15px"
										width="110px"
										variant="loanCard"
										onClick={() => {
											setShowModal(true)
										}}
										mt="10px"
									>
										All Details
									</Button>
								</Flex>
							</Box>
						</Flex>
						<Modal
							isOpen={showModal}
							onClose={() => setShowModal(false)}
							// size="full"
						>
							<ModalOverlay />
							<ModalContent maxW="56rem">
								<ModalHeader>Loan Details</ModalHeader>
								<ModalCloseButton />
								<ModalBody>
									<LoanDetails
										loan={loan}
									/>
								</ModalBody>
							</ModalContent>
						</Modal>
					</div>
				)
			}}
		</ThemeContext.Consumer>
	)
}

export default LoanCard;