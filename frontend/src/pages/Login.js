import React, { useState } from 'react';
import { Flex, VStack, Card, CardBody, Input, Button, CardHeader, Heading, Badge, HStack, Spacer } from '@chakra-ui/react';
import { useFormik } from 'formik';

export default function Login() {
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      if (values.username === '' || values.password === '') {
        setSubmitted(true);
        return;
      }
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" bgColor="green.200">
      <Card alignSelf="center" width="40vh" height="35vh" alignItems="center" justifyContent="center" textAlign="center">
        <CardHeader>
          <Heading size="md" textAlign="center">Login</Heading>
        </CardHeader>
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
                  {submitted && !formik.values.username && <Badge colorScheme='red'>Invalid Username</Badge>}
                </Spacer>
              </VStack>
              <HStack width={250} spacing={5}>
                  <Input
                    width={200}
                    isRequired
                    type={showPassword ? 'text' : 'password'}
                    name = 'password'
                    placeholder='Enter password'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <Button h='2.0rem' size='sm' onClick={setShowPassword}>
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
              </HStack>
              <Spacer>
                {submitted && ((!formik.values.password || !formik.values.repassword) || (formik.values.password !== formik.values.repassword)) && <Badge colorScheme='red'>Passwords do not match</Badge>}
              </Spacer>
              <Button type="submit">Submit</Button>
            </VStack>
          </form>
        </CardBody>
      </Card>
    </Flex>
  );
}
