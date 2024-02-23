import React from 'react';
import { Stack, Flex, Text, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom'; // Make sure to import RouterLink for navigation
import '@fontsource/roboto';

export default function Homepage() {

  return (
    <Flex direction="column" minHeight="100vh" justifyContent="space-between" bgColor="green.300">
      <Flex justifyContent="flex-end" p={4}>
        <Button as={RouterLink} to="/login" colorScheme="white" mr={4}>
          Log In
        </Button>
        <Button as={RouterLink} to="/register" colorScheme="white">
          Registration
        </Button>
      </Flex>
      
      <Flex flexGrow={1} alignItems="center" justifyContent="center" bgColor="green.300">
        <Stack spacing={0}>
          <Text fontSize='100px' color="white" fontFamily="roboto">Fueling Your Journey,</Text>
          <Text fontSize='100px' color="white" fontFamily="roboto">Empowering Your Choices.</Text>
        </Stack>
      </Flex>
    </Flex>
  );
}
