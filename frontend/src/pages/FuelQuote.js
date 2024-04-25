import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from "axios";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Heading,
  useToast
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import { useFormik } from "formik";
import Layout from "../Layout";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";

export default function FuelQuote() {
  const location = useLocation();
  const [gallons,setGallons] = useState();
  const username = new URLSearchParams(location.search).get('username');
  const [startDate, setStartDate] = useState(new Date());
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const [addressData, setAddressData] = useState({});
  const [prices, setPrices] = useState({
    newRate: 0,
    newPrice: 0
  });
  const navigate = useNavigate();
  const toast = useToast();


  useEffect(() => {
    const getAddress = async () => {
      console.log(username);

      try {
        const response = await axios.get(`http://localhost:3000/profile-management/?username=${username}`);
        console.log(response.data);
        setAddressData(response.data);
        formik.setValues({
        ...formik.values,
        add1: response.data.add1,
        city: response.data.city,
        state: response.data.state,
        zipcode: response.data.zipcode,
      });
      } catch (error) {
        toast({
          title: "Error fetching history",
          description: error.response?.data || "Failed to fetch data",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "bottom-left"
        });
      }
    };

    getAddress();
  }, [username, toast]);

  const getPrice = () => {
  console.log('gallons:', gallons)
    axios.get(`http://localhost:3000/priceAdjuster/?username=${username}&gallons=${gallons}`)
      .then(response => {
        console.log("Fetched data:", response.data);
        if (response.data && gallons) {
          // console.log("Data was gotten");
          const totalDue = response.data.newRate * gallons;
          setPrices({
            newRate: response.data.newRate,
            newPrice: totalDue,
          });
          formik.setValues({
        ...formik.values,
        suggested_price: response.data.newRate,
        total_due: totalDue,
      });
          //this makes repsonse.data = formData
        }
      })
      .catch(error => {
        toast({
          title: "Error get price",
          description: "Failed to fetch user data.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
};

const formik = useFormik({
    initialValues: {
      gallons: gallons,
      add1: addressData.add1,
      city: addressData.city,
      state: addressData.state,
      zipcode: addressData.zipcode,
      delivery_date : "",
      suggested_price: 0,
      total_due: 0,
    },
    // validate: (values) => {
    //   const errors = {};
    //   if (!/^\d+$/.test(values.gallons)) {
    //     errors.gallons = "Gallons must be numeric";
    //   }
    //   return errors;
    // },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      console.log("Values: ", values);
      axios.post(`http://localhost:3000/quoteCreation?username=${username}`, values, {
        headers: { "Content-Type": "application/json" },
      })
      .then(response => {
        console.log("Response.data", response.data);
        if (response.status === 200){
          navigate(`/history?username=${username}`);
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

  // return (
  //   <Layout>
  //     <Box
  //       ml="200px"
  //       p="4"
  //       maxW="calc(100% - 250px)"
  //       justifyContent="center"
  //       bgColor="white"
  //       borderRadius="5px"
  //       width="500px"
  //     >
  //       <VStack spacing={4} as="form" onSubmit={formik.handleSubmit}>
  //         <Heading size="md">Fuel Quote Form</Heading>
  //         <FormControl isRequired>
  //           <FormLabel>Gallons Requested</FormLabel>
  //           <Input
  //             type="text"
  //             name="gallons"
  //             onChange={formik.handleChange}
  //             value={formik.values.gallons}
  //           />
  //         </FormControl>

  //         <FormControl isReadOnly>
  //           <FormLabel>Delivery Address</FormLabel>
  //           <Input
  //             type="text"
  //             name="address"
  //             value={formik.values.address}
  //             readOnly
  //           />
  //         </FormControl>


  //         <FormControl isReadOnly>
  //           <FormLabel>Suggested Price</FormLabel>
  //           <Input
  //             type="text"
  //             name="suggested_price"
  //             value={`$${formik.values.suggested_price.toFixed(2)}`}
  //             readOnly
  //           />
  //         </FormControl>

  //         <FormControl isReadOnly>
  //           <FormLabel>Total Amount Due</FormLabel>
  //           <Input
  //             type="text"
  //             name="total_due"
  //             value={`$${(formik.values.gallons * formik.values.suggested_price).toFixed(2)}`}
  //             readOnly
  //           />
  //         </FormControl>

  //         <FormControl isRequired>
  //           <FormLabel>Delivery Date</FormLabel>
  //           <DatePicker
  //             selected={startDate}
  //             onChange={(date) => setStartDate(date)}
  //             customInput={<Input />}
  //           />
  //         </FormControl>

  //         <Button mt={4} colorScheme="teal" type="submit">Submit Quote</Button>
  //       </VStack>
  //     </Box>
  //   </Layout>
  // );
  return (
    <Layout>
      <Box
              ml="200px"
              p="4"
              maxW="calc(100% - 250px)"
              justifyContent="center"
              bgColor="white"
              borderRadius="5px"
              width="500px"
      >
        <VStack spacing={1} as="form" onSubmit={formik.handleSubmit}>
          <Heading size="md">Fuel Quote Form</Heading>
          <FormControl display="flex" alignItems="center" justifyContent="space-between"  isRequired>
            <FormLabel width="40%" >Gallons Requested</FormLabel>
            {/* <Input
              type="text"
              name="gallons"
              onChange={formik.handleChange}
              value={formik.values.gallons}
            /> */}
            <Input
              type="number"
              name="gallons"
              onChange={(e) => {
              setGallons(e.target.value);
              formik.setFieldValue('gallons', e.target.value);

            }}
            value={gallons}
          />
          </FormControl>

          <FormControl display="flex" alignItems="center" justifyContent="space-between"  isReadOnly>
            <FormLabel width="40%">Delivery Address</FormLabel>
            <Input
              type="text"
              name="address"
              value={addressData.add1}
              readOnly
            />
          </FormControl>

          <FormControl display="flex" alignItems="center" justifyContent="space-between"  isReadOnly>
            <FormLabel width="40%">City</FormLabel>
            <Input
              type="text"
              name="address"
              value={addressData.city}
              readOnly
            />
          </FormControl>

          <FormControl display="flex" alignItems="center" justifyContent="space-between" isReadOnly>
            <FormLabel width="40%">State</FormLabel>
            <Input
              type="text"
              name="address"
              value={addressData.state}
              readOnly
            />
          </FormControl>

          <FormControl display="flex" alignItems="center" justifyContent="space-between"  isReadOnly>
            <FormLabel width="40%">Zip Code</FormLabel>
            <Input
              type="text"
              name="address"
              value={addressData.zipcode}
              readOnly
            />
          </FormControl>

          <VStack >
          <FormControl display="flex" alignItems="center" justifyContent="space-between"  isRequired>
            <FormLabel >Delivery Date</FormLabel>
            <DatePicker wrapperClassName="datepicker"
              selected={startDate}nom 
              // onChange={handleDateChange}
              customInput={<Input />}
            />
          </FormControl>

          <Button mt={1} colorScheme="teal" onClick={getPrice}>Get Prices</Button>

          </VStack>

          <FormControl display="flex" alignItems="center" justifyContent="space-between"  isReadOnly>
            <FormLabel width="40%">Suggested Price</FormLabel>
            <Input
              type="text"
              name="suggested_price"
              onChange={formik.handleChange}
              value={prices.newRate}
              readOnly
              sx={{
                _readOnly: {
                  bg: 'gray.50', 
                  color: 'gray.600',
                  cursor: 'not-allowed'
                }
              }}
            />
          </FormControl>

          <FormControl display="flex" alignItems="center" justifyContent="space-between"  isReadOnly>
            <FormLabel width="40%">Total Amount Due</FormLabel>
            <Input
              type="text"
              name="total_due"
              onChange={formik.handleChange}
              value={prices.newPrice}
              readOnly
              sx={{
                _readOnly: {
                  bg: 'gray.50', 
                  color: 'gray.600',
                  cursor: 'not-allowed'
                }
              }}
            />
          </FormControl>


          <Button mt={1} colorScheme="teal" type="submit">Submit Quote</Button>
        </VStack>
      </Box>
    </Layout>
  );
}
