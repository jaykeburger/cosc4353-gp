import React, { useState } from 'react';
import { Flex, FormControl, FormLabel, Select, Stack, FormHelperText, Input, Card, Button } from '@chakra-ui/react';
import { useFormik } from 'formik';



export default function Profile() {
    const [submitted, setSubmitted] = useState(false);

    const formik = useFormik({
    initialValues: {
      name: '',
      add1: '',
      add2: '',
      city: '',
      state: '',
      zipcode: '',
    },

    validate: values => {
      const errors = {};
      // Zipcode validation: numeric and length check
      if (!/^\d+$/.test(values.zipcode)) { // Checks if only digits
        errors.zipcode = 'Zipcode must be numeric';
      } else if (values.zipcode.length < 5 || values.zipcode.length > 9) {
        errors.zipcode = 'Zipcode must be between 5 and 9 digits';
      }
      return errors;
    },

    onSubmit: (values) => {
      if (values.name === '' || values.name.includes(' ')) {
        setSubmitted(true);
        return;
      }
      if (values.zipcode.length < 5) {
        setSubmitted(true);
        return;
      }
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" bgColor="green.200">
        <Card alignSelf="center" width="40vh" height="75vh" alignItems="center" justifyContent="center" textAlign="center">
            <Stack bg="white">
            <form onSubmit={formik.handleSubmit}>
                <FormControl isRequired>
                    <FormLabel>Full Name</FormLabel>
                        <Input type='text' 
                        name ="name" 
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
              </form>
            </Stack>
        </Card>
    </Flex>
  );
}
