import React, { useState } from 'react';
import { Flex, VStack, Card, CardBody, Input, Button, CardHeader, Heading, Badge, HStack, Spacer } from '@chakra-ui/react';
import { useFormik } from 'formik';

export default function Registration() {
  const [submitted, setSubmitted] = useState(false);
  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)
  const handleClick1 = () => setShow1(!show1)
  const handleClick2 = () => setShow2(!show2)

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      repassword: '',
    },
    onSubmit: (values) => {
      if (values.password !== values.repassword) {
        setSubmitted(true);
        return;
      }
      if (values.username === '' || values.username.includes(' ')) {
        setSubmitted(true);
        return;
      }
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" bgColor="green.200">
      <Card alignSelf="center" width="40vh" height="50vh" alignItems="center" justifyContent="center" textAlign="center">
        <CardHeader>
          <Heading size="md" textAlign="center">Registration</Heading>
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
                    type={show1 ? 'text' : 'password'}
                    name = 'password'
                    placeholder='Enter password'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <Button h='2.0rem' size='sm' onClick={handleClick1}>
                    {show1 ? 'Hide' : 'Show'}
                  </Button>
              </HStack>
              <HStack width={250} spacing={5}>
                  <Input
                    width={200}
                    type={show2 ? 'text' : 'password'}
                    placeholder='Re-Enter password'
                    name = 'repassword'
                    onChange={formik.handleChange}
                    value={formik.values.repassword}
                  />
                  <Button h='2.0rem' size='sm' onClick={handleClick2}>
                    {show2 ? 'Hide' : 'Show'}
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
