import React, { useState, useEffect } from 'react';
import { Box, FormControl, FormLabel, Input, Button, VStack, Heading, useToast, Text, Select } from '@chakra-ui/react';
import Layout from "../Layout";
import { useFormik } from 'formik';
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
      <Box 
              ml="200px"
              p="4"
              maxW="calc(100% - 250px)"
              justifyContent="center"
              bgColor="white"
              borderRadius="5px"
              >
        <VStack spacing={3} as="form" onSubmit={handleSubmit}>
          <Heading size="md" justify-content="flex-end">My Profile</Heading>
          <FormControl display="flex" alignItems="center" justifyContent="space-between" >
            <FormLabel width="40%">Username</FormLabel>
            <Input  type="text" name="username" value={username} readOnly              
            sx={{
                _readOnly: {
                  bg: 'gray.100', 
                  color: 'gray.600',
                  cursor: 'not-allowed'
                }
              }}/>
          </FormControl>

          <FormControl id="firstName" display = "flex" alignItems="center" >
            <FormLabel width="40%">First Name</FormLabel>
            <Input type="text" name="firstName" value={formData.firstname || ''} onChange={handleChange} readOnly            sx={{
                _readOnly: {
                  bg: 'gray.100', 
                  color: 'gray.600',
                  cursor: 'not-allowed'
                }
              }}/>
          </FormControl>

          <FormControl id="lastName" display = "flex" alignItems="center">
            <FormLabel width="40%">Last Name</FormLabel>
            <Input type="text" name="lastName" value={formData.lastname || ''} onChange={handleChange} readOnly             sx={{
                _readOnly: {
                  bg: 'gray.100', 
                  color: 'gray.600',
                  cursor: 'not-allowed'
                }
              }}/>
          </FormControl>
          <FormControl id="email" display = "flex" alignItems="center">
            <FormLabel width="40%">Email</FormLabel>
            <Input type="email" name="email" value={formData.email || ''} onChange={handleChange} />
          </FormControl>
          <FormControl id="add1" display = "flex" alignItems="center">
            <FormLabel width="40%">Address 1</FormLabel>
            <Input type="text" name="add1" value={formData.add1 || ''} onChange={handleChange} />
          </FormControl>
          <FormControl id="add2" display = "flex" alignItems="center">
            <FormLabel width="40%">Address 2</FormLabel>
            <Input type="text" name="add2" value={formData.add2 || ''} onChange={handleChange} />
          </FormControl>
          <FormControl id="city" display = "flex" alignItems="center">
            <FormLabel width="40%">City</FormLabel>
            <Input type="text" name="city" value={formData.city || '' } onChange={handleChange} />
          </FormControl>
          <FormControl id="state" display = "flex" alignItems="center">
            <FormLabel width="40%">State</FormLabel>
            <Select 
                        placeholder='Select state'
                        name="state"
                        onChange={handleChange}
                        value={formData.state|| ''}>
                            <option> AL </option>
                            <option> AK </option>
                            <option> AZ </option>
                            <option> AR </option>
                            <option> CA </option>
                            <option> CO </option>
                            <option> CT </option>
                            <option> DE </option>
                            <option> FL </option>
                            <option> GA </option>
                            <option> HI </option>
                            <option> ID </option>
                            <option> IL </option>
                            <option> IN</option>
                            <option> IA </option>
                            <option> KS </option>
                            <option> KY </option>
                            <option> LA </option>
                            <option> ME </option>
                            <option> MD </option>
                            <option> MA </option>
                            <option> MI </option>
                            <option> MN </option>
                            <option> MS </option>
                            <option> MO </option>
                            <option> MT </option>
                            <option> NE </option>
                            <option> NE </option>
                            <option> NH </option>
                            <option> NJ </option>
                            <option> NM </option>
                            <option> NY </option>
                            <option> NC </option>
                            <option> ND </option>
                            <option> OH </option>
                            <option> OK </option>
                            <option> OR </option>
                            <option> PA </option>
                            <option> RI </option>
                            <option> SC </option>
                            <option> SD </option>
                            <option> TN </option>
                            <option> TX </option>
                            <option> UT </option>
                            <option> VT </option>
                            <option> VA </option>
                            <option> WA </option>
                            <option> WV </option>
                            <option> WI </option>
                            <option> WY </option>
                        </Select>         
          </FormControl>
          <FormControl id="zipcode" display = "flex" alignItems="center">
            <FormLabel width="40%">Zipcode</FormLabel>
            <Input type="" name="zipcode" value={formData.zipcode || ''} onChange={handleChange} />
          </FormControl>

          <Button mt={4} colorScheme="teal" type="submit">Update Profile</Button>
        </VStack>
      </Box>
    </Layout>
  );
}
