import React, { useState } from 'react';
import { Flex, VStack, Card, CardBody, Input, Button, CardHeader, Heading, Badge, HStack, Spacer } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Login() {
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword(!showPassword)

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log("Values: ", values);
      if (values.username === '' || values.password === '') {
        setSubmitted(true);
        return;
      }
      axios.post('http://localhost:3000/login', values, {
        headers: { "Content-Type": "application/json" },
      })
      .then(response => {
        console.log("Response.data", response.data);
        if (response.status === 200){
          console.log("Succesfully logged in!");
          navigate(`/history?username=${values.username}`);
          console.log("Login Successful")
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
  console.log("Error message:", error.response.data);
  // Handle the error message as needed
  setErrorMessage(error.response.data)
}   
else {
  console.log("Error:", error.message);
  // Handle other types of errors
}
      });
  },
  });

  
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" bgColor="green.200">
      <Flex position="absolute" top={0} right={0} p={4} justifyContent="flex-end">
        <Button as={RouterLink} to="/" colorScheme="white">
          Home
        </Button>
        <Button as={RouterLink} to="/register" colorScheme="white" mr={4}>
          Register
        </Button>
      </Flex>
      <Card alignSelf="center" width="40vh" height="35vh" alignItems="center" justifyContent="center" textAlign="center">
        <CardHeader>
          <Heading size="md" textAlign="center">Login</Heading>
        </CardHeader>
        <CardBody>
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={5}>
              <VStack>
                <Input
                  width={250}
                  type="text"
                  name="username"
                  placeholder="Username"
                  isRequired
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  autoComplete="username"
                />
              </VStack>
              <HStack width={250} spacing={5}>
                  <Input
                    width={200}
                    isRequired
                    type={showPassword ? 'text' : 'password'}
                    name = 'password'
                    placeholder='Enter password'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <Button h='2.0rem' size='sm' onClick={setShowPassword}>
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
              </HStack>
              <Button type="submit">Submit</Button>
            </VStack>
            <Spacer>
            {errorMessage && <Badge colorScheme='red' mt={4}>{errorMessage}</Badge>}
              </Spacer>
          </form>
        </CardBody>
      </Card>
    </Flex>
  );
}
