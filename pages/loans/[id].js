import React, { useEffect } from 'react';
import { useRouter } from 'next/router'
import { Box, Flex, Container } from '@chakra-ui/react';

const LoanDetails = () => {
	const router = useRouter()
  const { id } = router.query

	useEffect(() => {
		
	})

	if(!id) return (<Flex alignItems="center" justifyContent="center">Loading...</Flex>)
	return (
		<Container>
			Coming up
		</Container>
	)
}

export default LoanDetails;