import React, { useState, useEffect } from "react";
import {
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Card,
  CardHeader,
  VStack,
  HStack,
  Input,
  Button,
  Tag,
  CardFooter,
} from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";
import Layout from "../Layout.js";
import axios from "axios";
import { useFormik } from "formik";
import { useLocation } from "react-router-dom";

export default function ClientFuelHistory() {
  const [history, setHistory] = useState([]);
  const [errMessage, setErrMessage] = React.useState("");
  const location = useLocation();
  const username = new URLSearchParams(location.search).get('username');
  console.log('usernameSearch:',username);
  const validateGallons = (values) => {
    var errors = false;
    if (
      values.mingallons !== "" &&
      values.maxgallons !== "" &&
      values.mingallons > values.maxgallons
    ) {
      setErrMessage("Max gallons must be greater than or equal to min gallons");
      errors = true;
    }
    return errors;
  };
  const validatePrice = (values) => {
    var errors = false;
    if (
      values.minprice !== "" &&
      values.maxprice !== "" &&
      values.minprice > values.maxprice
    ) {
      setErrMessage("Max Price must be greater than or equal to min price");
      errors = true;
    }
    return errors;
  };
  const validateDates = (values) => {
    var errors = {};
    errors = false;
    if (
      values.startdate !== "" &&
      values.enddate !== "" &&
      values.startdate > values.enddate
    ) {
      setErrMessage("End Date must be after the Start date");
      errors = true;
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      // name: "",
      mingallons: "",
      maxgallons: "",
      minprice: "",
      maxprice: "",
      startdate: "",
      enddate: "",
    },
    onSubmit: (values) => {
      console.log("Sending: ", values);
      const errors = {
        gallons: validateGallons(values),
        dates: validateDates(values),
        price: validatePrice(values),
      };

      // Check if there are any errors
      if (errors.gallons || errors.dates || errors.price) {
        // Handle errors, maybe show an alert or set an error state
        return;
      }
      setErrMessage("");
      axios
        .get("http://localhost:3000/history/search", {
          params: values,
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          console.log("Recieved:", response.data);
          setHistory(response.data);
        })
        .catch((error) => {
          console.log("Error: ", error);
          setErrMessage(error.response.data);
        });
    },
  });

  useEffect(() => {
    axios
      //CHANGE the 1 in clientid=
      .get(`http://localhost:3000/history/?username=${username}`)
      .then((response) => {
        console.log("My response:", response.data);
        setHistory(response.data);
      })
      .catch((error) => {
        console.log("wuh oh", error);
      });
  }, []);

  return (
    <Layout >
      <Card bgColor="gray" justify-content="flex-end" width = "80%">
        <VStack>
          <CardHeader bgColor="gray" textAlign="center" fontWeight="bold">
            Client Fueling History for {username}
          </CardHeader>
          {errMessage && (
            <Card textColor="red" alignSelf="center">
              <CardFooter>{errMessage}</CardFooter>
            </Card>
          )}
          {/* <HStack spacing={20}>
            <Tag width={90} height={10}>
              Search by:
            </Tag>
            <form onSubmit={formik.handleSubmit}>
              <Input
                bgColor="white"
                name="mingallons"
                placeholder="Min Gallons"
                width={100}
                fontSize="10px"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.mingallons}
              ></Input>
              <Input
                bgColor="white"
                name="maxgallons"
                placeholder="Max Gallons"
                width={100}
                fontSize="10px"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.maxgallons}
              ></Input>
              <Input
                bgColor="white"
                name="minprice"
                placeholder="Min Price"
                width={100}
                fontSize="10px"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.minprice}
              ></Input>
              <Input
                bgColor="white"
                placeholder="Max Price"
                width={100}
                name="maxprice"
                fontSize="10px"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.maxprice}
              ></Input>
              <HStack>
                <Tag size="sm">Start Date</Tag>
                <Input
                  placeholder="Start Date"
                  size="md"
                  type="date"
                  bgColor="white"
                  width={180}
                  name="startdate"
                  onChange={formik.handleChange}
                  value={formik.values.startdate}
                />
                <Tag size="sm">End Date</Tag>
                <Input
                  placeholder="End Date"
                  size="md"
                  type="date"
                  bgColor="white"
                  // fontSize="1px"
                  width={180}
                  name="enddate"
                  onChange={formik.handleChange}
                  value={formik.values.enddate}
                />
                <Button size="lg" bgColor="white" type="submit">
                  <CiSearch />
                </Button>
              </HStack>
            </form>
          </HStack> */}

          <TableContainer bgColor="white">
            <Table variant="simple">
              <Tbody>
                <Tr>
                  {/* <Th>Client Name</Th> */}
                  <Th isNumeric>Gallons requested</Th>
                  <Th>Delivery Address</Th>
                  <Th>Delivery Date</Th>
                  <Th isNumeric>Suggested Price</Th>
                  <Th isNumeric>Total Amount Due</Th>
                </Tr>
                {history.length > 0 ? (
                  history.map((value, index) => (
                    <Tr key={index}>
                      {/* <Td>{value.clientname}</Td> */}
                      <Td>{value.gallonsRequested}</Td>
                      <Td>{value.deliveryAddress}</Td>
                      <Td>
                        {new Date(value.deliveryDate).toLocaleDateString()}
                      </Td>
                      <Td>{value.suggestPrice}</Td>
                      <Td>{value.totalDue}</Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={5}>No past orders</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </VStack>
      </Card>
    </Layout>
  );
}
