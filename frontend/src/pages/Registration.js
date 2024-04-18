import React, { useState } from "react";
import {
  Flex,
  VStack,
  Card,
  CardBody,
  Input,
  Button,
  CardHeader,
  Heading,
  HStack,
  Spacer,
  CardFooter,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom';
import axios from "axios";

export default function Registration() {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleClick1 = () => setShow1(!show1);
  const handleClick2 = () => setShow2(!show2);
  const [message, setMessage] = React.useState("");
  const [errMessage, setErrMessage] = React.useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      password_confirm: "",
    },
    onSubmit: (values) => {
      console.log("Values: ", values);
      axios
        .post("http://localhost:3000/registration", values, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          console.log("Response.Data:", response.data);
          if (response.status === 200) {
            navigate(`/profileInfo?username=${values.username}`);
            console.log("Registration Successful");
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

    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bgColor="#449C48"
    >
      <Flex position="absolute" top={0} right={0} p={4}justifyContent="flex-end">
        <Button as={RouterLink} to="/" colorScheme="white">
          Home
        </Button>
        <Button as={RouterLink} to="/login" colorScheme="white" mr={4}>
          Login
        </Button>
      </Flex>
      <Card
        alignSelf="center"
        width="40vh"
        height="50vh"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <CardHeader>
          <Heading size="md" textAlign="center">
            Registration
          </Heading>
        </CardHeader>
        {errMessage && (
          <Card textColor="red" alignSelf="center">
            <CardFooter>{errMessage}</CardFooter>
          </Card>
        )}
        {message && (
          <Card textColor="red" alignSelf="center">
            <CardFooter>{message}</CardFooter>
          </Card>
        )}
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
                />
                <Spacer>
                </Spacer>
              </VStack>
              <HStack width={250} spacing={5}>
                <Input
                  width={200}
                  isRequired
                  type={show1 ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <Button h="2.0rem" size="sm" onClick={handleClick1}>
                  {show1 ? "Hide" : "Show"}
                </Button>
              </HStack>
              <HStack width={250} spacing={5}>
                <Input
                  width={200}
                  type={show2 ? "text" : "password"}
                  placeholder="Re-Enter password"
                  name="password_confirm"
                  isRequired
                  onChange={formik.handleChange}
                  value={formik.values.password_confirm}
                />
                <Button h="2.0rem" size="sm" onClick={handleClick2}>
                  {show2 ? "Hide" : "Show"}
                </Button>
              </HStack>
              <Spacer>
              </Spacer>
              <Button type="submit">Submit</Button>
            </VStack>
          </form>
        </CardBody>
      </Card>
    </Flex>
  );
}
