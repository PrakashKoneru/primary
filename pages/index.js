import React from 'react';
import { ThemeContext } from './_app';
import { Box, Input, Flex } from '@chakra-ui/react';

export default function Home() {
  return (
    <ThemeContext.Consumer>
      {() => {
        return (
          <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            h="calc(100vh - 90px)"
          >
            <Box>Example Box component</Box>
            <Input
              mt="10px"
              w="350px"
              placeholder="example input element"
            />
          </Flex>
        )
      }}
    </ThemeContext.Consumer>
  );
}
