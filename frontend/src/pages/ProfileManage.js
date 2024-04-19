import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Heading,
  useToast
} from '@chakra-ui/react';
import Layout from "../Layout";
import { useLocation } from "react-router-dom";


export default function ProfileManagement() {

 const location = useLocation();
  const username = new URLSearchParams(location.search).get('username');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: ''
  });
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    console.log("Submitted Data", formData);
    // Additional API call logic here
  };

  return (
    <Layout>
      <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md" maxWidth="400px" margin="auto" mt={5}>
        <VStack spacing={4} as="form" onSubmit={handleSubmit}>
          <Heading size="lg">Manage Your Profile</Heading>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input type="text" name="username" value={formData.username} onChange={handleChange} placeholder={username} />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} />
          </FormControl>
          <FormControl id="firstName">
            <FormLabel>First Name</FormLabel>
            <Input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
          </FormControl>
          <FormControl id="lastName">
            <FormLabel>Last Name</FormLabel>
            <Input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
          </FormControl>
          <Button mt={4} colorScheme="teal" type="submit">Update Profile</Button>
        </VStack>
      </Box>
    </Layout>
  );
}

