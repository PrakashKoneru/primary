import React, { useState } from 'react';
import { Box, Input, Flex } from '@chakra-ui/react';
import { ThemeContext } from '../../_app';

const SubNav = ({ navList = [], onClick, ...rest }) => {
	const [activeIndex, setActiveIndex] = useState(0)
	return (
		<ThemeContext.Consumer>
			{(theme) => {
				return (
					<Flex
						flexWrap="wrap"
						justifyContent={{ sm: "space-between", md: "flex-start" }}
					>
						{navList.map((each, index) => {
							return (
								<Flex
									justifyContent="center"
									alignItems="center"
									mr={{ md: "10px", sm: "0px" }}
									ml={{ md: "0px", sm: index%2 != 0 ? '6px' : "0px" }}
									mb={{ md: index=== navList.length ? "0px" : "10px", sm: "5px" }}
									w={{
										sm: "49%",
										md: "auto"
									}}
									minHeight={{
										sm: "40px"
									}}
									mt={{ sm: "10px", md:"0px" }}
									padding="5px 25px"
									border={activeIndex === index ? `1px solid ${theme.colors.primary}` : `1px solid ${theme.colors.gray}`}
									borderRadius="3px"
									bg={activeIndex === index ? theme.colors.primary : 'white'}
									color={activeIndex === index ? 'white' : 'black'}
									key={index}
									onClick={() => {
										setActiveIndex(index)
										onClick(index)
									}}
									cursor="pointer"
								>
									{each}
								</Flex>
							)
						})}	
					</Flex>
				)
			}}	
		</ThemeContext.Consumer>
	);
};

export default SubNav;