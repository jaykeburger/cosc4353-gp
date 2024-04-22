import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Heading,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import { useFormik } from "formik";
import Layout from "../Layout";
import "react-datepicker/dist/react-datepicker.css";

export default function FuelQuote() {
  const [startDate, setStartDate] = useState(new Date());

  const formik = useFormik({
    initialValues: {
      gallons: "",
      address: "324 Almeda Drive, Houston, TX 77004",
      suggested_price: 2.79,
      total_due: "",
    },
    validate: (values) => {
      const errors = {};
      if (!/^\d+$/.test(values.gallons)) {
        errors.gallons = "Gallons must be numeric";
      }
      return errors;
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

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
        <VStack spacing={4} as="form" onSubmit={formik.handleSubmit}>
          <Heading size="md">Fuel Quote Form</Heading>
          <FormControl isRequired>
            <FormLabel>Gallons Requested</FormLabel>
            <Input
              type="text"
              name="gallons"
              onChange={formik.handleChange}
              value={formik.values.gallons}
            />
          </FormControl>

          <FormControl isReadOnly>
            <FormLabel>Delivery Address</FormLabel>
            <Input
              type="text"
              name="address"
              value={formik.values.address}
              readOnly
            />
          </FormControl>


          <FormControl isReadOnly>
            <FormLabel>Suggested Price</FormLabel>
            <Input
              type="text"
              name="suggested_price"
              value={`$${formik.values.suggested_price.toFixed(2)}`}
              readOnly
            />
          </FormControl>

          <FormControl isReadOnly>
            <FormLabel>Total Amount Due</FormLabel>
            <Input
              type="text"
              name="total_due"
              value={`$${(formik.values.gallons * formik.values.suggested_price).toFixed(2)}`}
              readOnly
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Delivery Date</FormLabel>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              customInput={<Input />}
            />
          </FormControl>

          <Button mt={4} colorScheme="teal" type="submit">Submit Quote</Button>
        </VStack>
      </Box>
    </Layout>
  );
}
