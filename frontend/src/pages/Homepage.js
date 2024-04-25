import React from 'react';
import { Stack, Flex, Text, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import '@fontsource/plus-jakarta-sans'
import Typewriter from "typewriter-effect";
import wallpaper from '../images/wallpaper.jpeg'; // Ensure this path is correct

export default function Homepage() {
  return (
    <Flex
      direction="column"
      minHeight="100vh"
      justifyContent="space-between"
      alignItems="center"
      bgImage={`url(${wallpaper})`}
      bgSize="cover"
      bgPosition="center"
      bgAttachment="fixed" // This ensures the background image is static
    >
      <Flex width="full" justifyContent="flex-end" p={4}>
        <Button as={RouterLink} to="/login" colorScheme="white">
          Login
        </Button>
        <Button as={RouterLink} to="/register" colorScheme="white">
          Registration
        </Button>
      </Flex>

      <Stack flexGrow={1} spacing={0} alignItems="center" justifyContent="center">
        <Text textAlign={'center'} fontSize='90px' color="white" fontFamily="plus jakarta sans">
          <Typewriter
            options={{
              autoStart: true,
              loop: false,
              delay: 150
            }}
            onInit={(typewriter) => {
              typewriter
              .typeString("Fueling Your Journey, <br/>")
              .pauseFor(100)
              .typeString("Empowering Your Choices.")
              .start();
            }}
          />
        </Text>
      </Stack>

      {/* Additional content or footer can go here */}
    </Flex>
  );
}