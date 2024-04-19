import React, { useState, useEffect } from 'react';
import { Box, FormControl, FormLabel, Input, Button, VStack, Heading, useToast, Text } from '@chakra-ui/react';
import Layout from "../Layout";
import axios from 'axios'; // Make sure to install axios if not already done
import { useLocation } from "react-router-dom";

export default function ProfileManagement() {
  const location = useLocation();
  const username = new URLSearchParams(location.search).get('username');
  const [formData, setFormData] = useState({
    username: username,
    email: '',
    firstName: '',
    lastName: '',
    add1: '',
    add2: '',
    city: '',
    state: '',
    zipcode: ''
  });
  const toast = useToast();

  useEffect(() => {
    // Fetch the user data when the component mounts
    if (username) {
      axios.get(`http://localhost:3000/profile-management/?username=${username}`)
        .then(response => {
          console.log("Fetched data:", response.data);
          if (response.data){
            console.log("Data was gotten");
          setFormData(response.data);
          console.log("Name: ", formData.firstname, "State: ", formData.state);
          console.log("Data set");
        }

        })
        .catch(error => {
          toast({
            title: "Error",
            description: "Failed to fetch user data.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    }
  }, [username, toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:3000/profile-management/?username=${username}`, formData)
      .then(() => {
        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Failed to update profile.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Layout>
      <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md" maxWidth="400px" margin="auto" mt={5}>
        <VStack spacing={4} as="form" onSubmit={handleSubmit}>
          <Heading size="lg">Manage Your Profile</Heading>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input type="text" name="username" value={username} onChange={handleChange} readOnly/>
          </FormControl>
          <FormControl id="firstName">
            <FormLabel>First Name</FormLabel>
            <Input type="text" name="firstName" value={formData.firstname || ''} onChange={handleChange} />
          </FormControl>
          <FormControl id="lastName">
            <FormLabel>Last Name</FormLabel>
            <Input type="text" name="lastName" value={formData.lastname || ''} onChange={handleChange} />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" value={formData.email || ''} onChange={handleChange} />
          </FormControl>
          <FormControl id="add1">
            <FormLabel>Address 1</FormLabel>
            <Input type="text" name="add1" value={formData.add1 || ''} onChange={handleChange} />
          </FormControl>
          <FormControl id="add2">
            <FormLabel>Email</FormLabel>
            <Input type="text" name="add2" value={formData.add2 || ''} onChange={handleChange} />
          </FormControl>
          <FormControl id="city">
            <FormLabel>City</FormLabel>
            <Input type="text" name="city" value={formData.city || '' } onChange={handleChange} />
          </FormControl>
          <FormControl id="state">
            <FormLabel>City</FormLabel>
            <Input type="text" name="state" value={formData.state|| ''} onChange={handleChange} />
          </FormControl>
          <FormControl id="zipcode">
            <FormLabel>City</FormLabel>
            <Input type="" name="zipcode" value={formData.zipcode || ''} onChange={handleChange} />
          </FormControl>

          {/* Additional fields for address etc. */}
          <Button mt={4} colorScheme="teal" type="submit">Update Profile</Button>
        </VStack>
      </Box>
    </Layout>
  );
}
