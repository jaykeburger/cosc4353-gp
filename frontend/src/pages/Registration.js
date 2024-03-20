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
  Badge,
  HStack,
  Spacer,
  CardFooter,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Registration() {
  const [submitted, setSubmitted] = useState(false);
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
      if (values.password !== values.password_confirm) {
        setSubmitted(true);
        return;
      }
      if (values.username === "" || values.username.includes(" ")) {
        setSubmitted(true);
        return;
      }
      console.log("Values: ", values);
      axios
        .post("http://localhost:3000/registration", values, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          console.log("Response.Data:", response.data);
          if (response.data === "User registered successfully") {
            navigate("/profile-info");
          }
          setMessage(response.data);
          setErrMessage("");
        })
        .catch((error) => {
          console.log("Error.Data: ", error);
          setErrMessage("There was an error");
          setMessage("");
        });
    },
  });

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bgColor="green.200"
    >
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
                  {submitted && !formik.values.username && (
                    <Badge colorScheme="red">Invalid Username</Badge>
                  )}
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
                {submitted &&
                  (!formik.values.password ||
                    !formik.values.password_confirm ||
                    formik.values.password !==
                      formik.values.password_confirm) && (
                    <Badge colorScheme="red">Passwords do not match</Badge>
                  )}
              </Spacer>
              <Button type="submit">Submit</Button>
            </VStack>
          </form>
        </CardBody>
      </Card>
    </Flex>
  );
}
