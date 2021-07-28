import React, { useState } from 'react';
import { ThemeContext } from './_app';
import { Box, Input, Flex, Button } from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Home() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [submissionError, setSubmissionError] = useState(false);

  const postPasswordResetData = ({email, oldPassword, newPassword}) => {
    const baseURL = process.env.NODE_ENV === 'production' ? '/primary/api/primaryLenders/auth/resetPassword' : 'http://localhost:5003/primaryLenders/auth/resetPassword';
    setSubmissionError(false);
		axios.post(baseURL, { email, oldPassword, newPassword })
		.then(({ data }) => {
			cookies.set('pToken', data.pToken);
		}).catch((error) => {
      setSubmissionError(error.response.data)
    });
  }
  
  return (
    <ThemeContext.Consumer>
      {(theme) => {
        return (
          <Flex
            bg={theme.colors.bgBlue}
            h="calc(100vh - 100px)"
            w="100%"
            alignItems="center"
            justifyContent="center"
          >
            <form onSubmit={handleSubmit(postPasswordResetData)}>
              <Box
                id="box"
                bg="white"
                border={`0.3px solid ${theme.colors.secondary}`}
                borderRadius="3px"
                minWidth={{ sm: "325px", md: "600px"}}
                maxW="600px"
                minHeight={{ sm: "400px", md: "350px", lg: "400px" }}
                w={{ sm: "100%", md: "auto" }}
                py="50px"
                px="20px"
                my="15px"
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <Box fontSize="40px">
                  Reset Password
                </Box>
                {submissionError && (
                  <Box
                    color={theme.colors.red}
                  >
                    {submissionError}
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
                {errors.email && (
                  <Box color={theme.colors.red}>
                    Please enter a valid email.
                  </Box>
                )}
                <Box
                  mt="25px"
                  fontWeight="500"
                >
                  Password From Email
                </Box>
                <Input
                  type="password"
                  mt="5px"
                  placeholder="Password From Email"
                  {...register("oldPassword", { 
                    required: true
                  })}
                />
                {errors.oldPassword && (
                  <Box color={theme.colors.red}>
                    Please enter a valid password.
                  </Box>
                )}
                <Box
                  fontWeight="500"
                  mt="25px"
                >
                  New Password
                </Box>
                <Input
                  type="password"
                  mt="5px"
                  placeholder="New Password"
                  {...register("newPassword", { 
										required: true,
										validate: value => value !== watch('oldPassword')
                  })}
                />
								{errors.newPassword && (
                  <Box color={theme.colors.red}>
                    Can not match old password.
                  </Box>
                )}
								<Box
                  fontWeight="500"
                  mt="25px"
                >
                  New Password
                </Box>
                <Input
                  type="password"
                  mt="5px"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", { 
										required: true,
										validate: value => value === watch('newPassword')
                  })}
                />
								{errors.confirmPassword && (
                  <Box color={theme.colors.red}>
                    Passwords donot match.
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
                    Reset Password
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
