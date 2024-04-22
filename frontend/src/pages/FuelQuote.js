import React, { useState } from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Stack,
  FormHelperText,
  Input,
  Card,
  Button,
  VStack,
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import Layout from "../Layout.js";
import "react-datepicker/dist/react-datepicker.css";

export default function FuelQuote() {
  const [submitted, setSubmitted] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const formik = useFormik({
    initialValues: {
      gallons: "",
      address: "324 Almeda Drive, Houston, TX 77004",
      date: "",
      suggested_price: 2.79,
      total_due: "",
    },

    validate: (values) => {
      const errors = {};
      if (!/^\d+$/.test(values.gallons)) {
        errors.gallons = "Gallons must be numeric";
      }
      if (!/^\d+$/.test(values.suggested_price)) {
        errors.suggested_price = "Suggested Price must be numeric";
      }
      if (!/^\d+$/.test(values.total_due)) {
        errors.total_due = "Total price due must be numeric";
      }
      if (!/[A-Za-z]/.test(values.address)) {
        errors.city = "Address must only contain letters";
      }
      return errors;
    },

    onSubmit: (values) => {
      if (values.name === "" || values.name.includes(" ")) {
        setSubmitted(true);
        return;
      }
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Layout>
      <Flex
        height="100vh"
        alignItems="center"
        justifyContent="center"
        bgColor="green.200"
      >
        <VStack>
          <Card
            alignSelf="center"
            width="70vh"
            height="65vh"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <Stack bg="white">
              <form onSubmit={formik.handleSubmit}>
                <FormControl isRequired>
                  <FormLabel>Gallons Requested</FormLabel>
                  <Input
                    width={"50vh"}
                    type="text"
                    name="gallons"
                    maxLength="100"
                    onChange={formik.handleChange}
                    value={formik.values.gallons}
                  />
                </FormControl>
                <FormControl isReadOnly>
                  <FormLabel>Delivery Address</FormLabel>
                  <Input
                    type="text"
                    name="address"
                    maxLength={100}
                    onChange={formik.handleChange}
                    value={formik.values.address}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Delivery Date</FormLabel>
                  <DatePicker
                    selected={startDate}
                    customInput={<Input width={"50vh"} />}
                    onChange={(date) => setStartDate(date)}
                  />
                </FormControl>
                <FormControl isReadOnly>
                  <FormLabel>Suggested Price</FormLabel>
                  <Input
                    type="text"
                    name="city"
                    maxLength={100}
                    onChange={formik.handleChange}
                    value={"$" + formik.values.suggested_price}
                  />
                </FormControl>
                <FormControl isReadOnly>
                  <FormLabel>Total Amount Due</FormLabel>
                  <Input
                    type="text"
                    name="zipcode"
                    onChange={formik.handleChange}
                    value={
                      "$" +
                      formik.values.suggested_price * formik.values.gallons
                    }
                    onBlur={formik.handleBlur}
                  />
                </FormControl>
                <Button margin={2} type="submit">
                  Get Price
                </Button>
              </form>
            </Stack>
          </Card>
          <Card
          // alignSelf="center"
          // width="70vh"
          // height="65vh"
          // alignItems="center"
          // justifyContent="center"
          // textAlign="center"
          ></Card>
        </VStack>
      </Flex>
    </Layout>
  );
}
