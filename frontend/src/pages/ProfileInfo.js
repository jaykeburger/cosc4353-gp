import React, { useState } from 'react';
import { Flex, FormControl, FormLabel, Select, Stack, FormHelperText, Input, Card, Button, Spacer, Badge } from '@chakra-ui/react';
import { useFormik } from 'formik';
import axios from "axios";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";



export default function Profile() {
    //const [submitted, setSubmitted] = useState(false);
    const [message, setMessage] = React.useState("");
    const [errMessage, setErrMessage] = React.useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const username = new URLSearchParams(location.search).get('username');

    const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname:'',
      add1: '',
      add2: '',
      city: '',
      state: '',
      zipcode: '',
    },

    validate: values => {
      const errors = {};
      if (!/^\d+$/.test(values.zipcode)) { 
        errors.zipcode = 'Zipcode must be numeric';
      } else if (values.zipcode.length < 5 || values.zipcode.length > 9) {
        errors.zipcode = 'Zipcode must be between 5 and 9 digits';
      }
      if (!/[A-Za-z]/.test(values.city)) {
        errors.city = 'City must only contain letters';
      }
      return errors;
    },

    onSubmit: (values) => {
      console.log("Frontend Username: ", username);
      console.log("Values: ", values);
      axios
        .post(`http://localhost:3000/profileInfo?username=${username}`, values, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          console.log("Response.Data:", response.data);
          if (response.status === 200) {
            navigate(`/`);
            console.log("User Info Successful");
          }
          setMessage(response.data);
          setErrMessage('');
        })
        .catch((error) => {
          if (error.response && error.response.data) {
    console.log("Error message:", error.response.data);
    // Handle the error message as needed
    setErrMessage(error.response.data)
  } else {
    console.log("Error:", error.message);
    // Handle other types of errors
  }
        });
    },
  });

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" bgColor="#203354">
        <Card alignSelf="center" width="40vh" height="80vh" alignItems="center" justifyContent="center" textAlign="center">
            <Stack bg="white">
            <form onSubmit={formik.handleSubmit}>
                <FormControl isRequired>
                    <FormLabel>First Name</FormLabel>
                        <Input type='text' 
                        name ="firstname" 
                        maxLength="50" 
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Last Name</FormLabel>
                        <Input type='text' 
                        name ="lastname" 
                        maxLength="50" 
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Address 1</FormLabel>
                        <Input 
                        type='text' 
                        name="add1" 
                        maxLength="100"
                        onChange={formik.handleChange}
                        value={formik.values.add1}
                        />
                </FormControl>
                <FormControl>
                    <FormLabel>Address 2</FormLabel>
                        <Input 
                        type='text' 
                        name="add2"
                        maxLength={100}
                        onChange={formik.handleChange}
                        value={formik.values.add2}/>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>City</FormLabel>
                        <Input 
                        type='text' 
                        name="city"
                        maxLength={100}
                        onChange={formik.handleChange}
                        value={formik.values.city}
                        />
                         {formik.errors.city && formik.touched.city && (
                            <FormHelperText 
                            color="red.500">{
                              formik.errors.city}
                              </FormHelperText>
                          )}
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>State</FormLabel>
                        <Select 
                        placeholder='Select state'
                        name="state"
                        onChange={formik.handleChange}
                        value={formik.values.state}>
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
                <FormControl isRequired>
                    <FormLabel>Zipcode</FormLabel>
                        <Input 
                        type='text' 
                        name = "zipcode" 
                        onChange={formik.handleChange}
                        value={formik.values.zipcode}
                        onBlur={formik.handleBlur}
                        />
                        {formik.errors.zipcode && formik.touched.zipcode && (
                          <FormHelperText 
                          color="red.500">
                            {formik.errors.zipcode}
                            </FormHelperText>
                          )}
                </FormControl>
              <Button type="submit">Submit</Button>
              <Spacer>
              {errMessage && <Badge colorScheme='red' mt={4}>{"Error."}</Badge>}
              </Spacer>
              </form>
            </Stack>
        </Card>
    </Flex>
  );
}
