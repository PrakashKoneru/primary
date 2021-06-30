import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
	IconButton,
	useDisclosure
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import {Link as NextLink} from 'next';
import { useRouter } from 'next/router';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import Cookies from 'js-cookie';

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

export default function Simple() {
	const isLoggedIn = Cookies.get('pToken');
	const [disableScroll, setScroll] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { pathname } = useRouter();
	const borderBottom='#19858F'
	const targetRef = React.createRef();
	
	useEffect(() => {
		if(disableScroll) {
			let targetElement = targetRef.current;
			disableBodyScroll(targetElement);
		} else {
			clearAllBodyScrollLocks();
		}
	}, [isOpen])
  return (
    <>
      <Box
				position="sticky"
				top="0"
				left="0"
				right="0"
				zIndex="1000"
				background="white"
				borderBottom="1px solid #BFBFBF"
				color="#495FBF"
				overflowY="hidden"
				maxHeight="100vh"
			>
        <Flex
					maxHeight="90px"
					alignItems={'center'}
					justifyContent={{
						md: 'space-between',
						sm: 'flex-start'
					}}
					position="relative"
					px={{
						sm: "25px",
						md: "48px"
					}}
					minHeight="80px"
					maxWidth="1300px"
					margin="auto"
				>
          <IconButton
						size={'xs'}
						bg="none"
						color="#9AA5D9"
            icon={isOpen ? <CloseIcon height="17px" width="17px" /> : <HamburgerIcon height="25px" width="25px"/>}
            aria-label={'Open Menu'}
            display={{ md: !isOpen ? 'none' : 'inherit' }}
						onClick={isOpen ? () => {
							setScroll(false)
							onClose()
						} : () => {
							setScroll(true)
							onOpen()
						}}
						position="absolute"
						left="13px"
          />
          <HStack
						spacing={8}
						alignItems={{
							sm: 'center',
							md: 'flex-start'
						}}
						width={{
							sm: "calc(100% - 22px)",
							base: "auto"
						}}
					>
						<Flex
							width="100%"
							justifyContent={{
								sm: 'center',
								md: 'flex-start'
							}}
						>
							<Link
								as={NextLink}
								href='/'
							>
								<img
									cursor='pointer'
									src="/HeaderLogo.png"
									height="54px"
									width="150px"
								/>
							</Link>
						</Flex>
          </HStack>
					<HStack
						spacing={4}
						display={{
							sm: "none",
							md: "block"
						}}
					>
						<Flex
							display="flex"
							width="auto"
							whiteSpace="nowrap"
							fontSize="1.25rem"
							cursor='pointer'
							alignItems="center"
							h="9vh"
							maxHeight="90px"
							py="1px"
						>
							{isLoggedIn && (<Link
								onClick={() => Cookies.remove('pToken')}
								as={NextLink}
								maxHeight="90px"
								variant="navLink"
								href='/'
								mr="5px"
								bg={pathname === '/' ? 'white' : ''}
								borderRadius="5px"
								boxShadow={pathname === '/' ? '2px 2px 10px rgba(0, 0, 0, 0.5)' : ''}
								// borderBottom={pathname === '/' ? `3px solid ${borderBottom}` : ''}
							>
								Log Out
							</Link>)}
						</Flex>
					</HStack>
        </Flex>

        {isOpen ? (
					<Box
						onClick={(e) => {e.stopPropagation()}}
						position="relative"
						zIndex="10"
						bg="#DBF6F8"
						color="#495FBF"
						overflowY="hidden"
						maxHeight="100vh"
						ref={targetRef}
					>
						<Flex
							display="flex"
							whiteSpace="nowrap"
							cursor='pointer'
							alignItems="center"
							width="100%"
							h="100vh"
							flexDirection="column"
							justifyContent="flex-start"
							fontSize="25px"
						>
							<Link
								onClick={() => Cookies.remove('pToken')}
								as={NextLink}
								maxHeight="90px"
								variant="navLink"
								href='/'
								mr="5px"
								bg={pathname === '/' ? 'white' : ''}
								borderRadius="5px"
								boxShadow={pathname === '/' ? '2px 2px 10px rgba(0, 0, 0, 0.5)' : ''}
								// borderBottom={pathname === '/' ? `3px solid ${borderBottom}` : ''}
							>
								Log Out
							</Link>
						</Flex>
          </Box>
        ) : null}
      </Box>
    </>
  );
}