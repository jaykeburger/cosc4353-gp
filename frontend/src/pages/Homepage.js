import React from 'react';
import { Stack, Flex, Text, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom'; // Make sure to import RouterLink for navigation
import '@fontsource/roboto';
import Typewriter from "typewriter-effect";

export default function Homepage() {

  return (
    <Flex direction="column" minHeight="100vh" justifyContent="space-between" bgColor="#347937">
      <Flex justifyContent="flex-end" p={4}>
        <Button as={RouterLink} to="/login" colorScheme="white">
          Login
        </Button>
        <Button as={RouterLink} to="/register" colorScheme="white">
          Registration
        </Button>
      </Flex>
      
      <Flex flexGrow={1} alignItems="center" justifyContent="center" bgColor="#347937">
        <Stack spacing={0}>
          <Text textAlign={'center'} fontSize='90px' color="white" fontFamily="roboto">
          <Typewriter
            options={{
                autoStart: true,
                loop: false,
                delay: 150
                }}
            onInit={(typewriter) => {
                typewriter
                .typeString("Fueling Your Journey <br/>")
                .pauseFor(100)
                .typeString("Empowering Your Choices")
                .start();
            }}
            />
            </Text>
        </Stack>
      </Flex>
    </Flex>
  );
}