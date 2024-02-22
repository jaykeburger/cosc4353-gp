import React from "react";
import {
  Flex,
  Table,
  Thead,
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
} from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";

export default function ClientFuelHistory() {
  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bgColor="green.200"
    >
      <Card bgColor="green.300">
        <VStack>
          <CardHeader bgColor="green.300" textAlign="center" fontWeight="bold">
            Client Fueling History
          </CardHeader>
          <HStack>
            <Tag width={90} height={10}>
              Search by:
            </Tag>
            <Input bgColor="white" placeholder="Name" width={200}></Input>
            <Input
              bgColor="white"
              placeholder="Minimum Price"
              width={200}
            ></Input>
            <Input
              bgColor="white"
              placeholder="Maximum Price"
              width={150}
            ></Input>
            <Input
              bgColor="white"
              placeholder="Before Date"
              width={150}
            ></Input>
            <Input bgColor="white" placeholder="After Date" width={150}></Input>
            <Button bgColor="white">
              <CiSearch />
            </Button>{" "}
          </HStack>
          <TableContainer bgColor="white">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Client Name</Th>
                  <Th isNumeric>Gallons requested</Th>
                  <Th>Delivery Address</Th>
                  <Th>Delivery Date</Th>
                  <Th isNumeric>Suggested Price</Th>
                  <Th isNumeric>Total Amount Due</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>John Adams</Td>
                  <Td>100</Td>
                  <Td>123 Street, 77123, Houston, Texas</Td>
                  <Td>1/1/2012</Td>
                  <Td>$10000</Td>
                  <Td>$15000</Td>
                </Tr>
                <Tr>
                  <Td>Jane Doe</Td>
                  <Td>101</Td>
                  <Td>456 Avenue, 98765, Austin, Texas</Td>
                  <Td>2/15/2015</Td>
                  <Td>$12000</Td>
                  <Td>$8000</Td>
                </Tr>
                <Tr>
                  <Td>Alex Smith</Td>
                  <Td>102</Td>
                  <Td>789 Boulevard, 54321, Dallas, Texas</Td>
                  <Td>7/30/2018</Td>
                  <Td>$8000</Td>
                  <Td>$3000</Td>
                </Tr>
                <Tr>
                  <Td>Emily Johnson</Td>
                  <Td>103</Td>
                  <Td>321 Road, 24680, San Antonio, Texas</Td>
                  <Td>11/20/2019</Td>
                  <Td>$15000</Td>
                  <Td>$5000</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </VStack>
      </Card>
    </Flex>
  );
}
