import React, { useState } from 'react';
import { ThemeContext } from '../../_app';
import { Box, Input, Flex, Button } from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function Login() {
	const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [submissionError, setSubmissionError] = useState(false);

  const postSignInData = ({email, password}) => {
    setSubmissionError(false);
		axios.post('http://localhost:5000/primaryLenders/auth/login', { email, password })
		.then(({ data }) => {
			Cookies.set('pToken', data.pToken);
			router.push('/loans');
		}).catch((error) => {
      error.response && setSubmissionError(error.response.data)
    });
  }
  
  return (
    <ThemeContext.Consumer>
      {(theme) => {
        return (
          <Flex
            id="loanFlex"
            key={Math.random()}
            bg={theme.colors.bgBlue}
            h="calc(100vh - 100px)"
            w="100%"
            alignItems="center"
            justifyContent="center"
          >
            <form onSubmit={handleSubmit(postSignInData)}>
              <Box
                id="box"
                bg="white"
                border={`0.3px solid ${theme.colors.secondary}`}
                borderRadius="3px"
                minWidth={{ sm: "325px", md: "600px"}}
                maxW="600px"
                minHeight={{ sm: "400px", md: "350px", lg: "400px" }}
                w={{ sm: "100%", md: "auto" }}
                py="10px"
                px="20px"
                my="15px"
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <Box fontSize="40px">
                  Lender Login
                </Box>
                {submissionError && (
                  <Box
                    color={theme.colors.red}
                  >
                    {submissionError === 'Password not reset' ? (
                      <span>
                        Password not reset.
                        Please click
                        <a href="/resetPassword" style={{ color: `${theme.colors.primary} !important`}}> here </a>
                        to reset.
                      </span>
                    ) : submissionError}
                  </Box>
                )}
                <Box
                  mt="25px"
                  fontWeight="500"
                >
                  Email
                </Box>
                <Input
                  type="text"
                  mt="5px"
                  placeholder="Email"
                  {...register("email", { 
                    required: true
                  })}
                />
                {errors.lender_name && (
                  <Box color={theme.colors.red}>
                    Please enter a valid Name.
                  </Box>
                )}
                <Box
                  fontWeight="500"
                  mt="25px"
                >
                  Password
                </Box>
                <Input
                  type="password"
                  mt="5px"
                  placeholder="Password"
                  {...register("password", { 
                    required: true
                  })}
                />
                {errors.lender_name && (
                  <Box color={theme.colors.red}>
                    Please enter a valid Name.
                  </Box>
                )}
                <Flex
                  mt="25px"
                  justifyContent="flex-end"
                >
                  <Button
                    w="150px"
                    type="submit"
                  >
                    Login
                  </Button>
                </Flex>
              </Box>
            </form>
          </Flex>
        )
      }}
    </ThemeContext.Consumer>
  );
}
