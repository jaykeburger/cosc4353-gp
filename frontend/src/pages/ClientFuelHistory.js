import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Card,
  Box,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import Layout from "../Layout";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function ClientFuelHistory() {
  const [history, setHistory] = useState([]);
  const toast = useToast();
  const location = useLocation();
  const username = new URLSearchParams(location.search).get('username');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/history/?username=${username}`);
        setHistory(response.data);
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

    fetchHistory();
  }, [username, toast]);

  return (
    <Layout>
      <VStack
        ml="200px"
        p="4"
        w="full"
        maxW="calc(100% - 200px)"
      >
        <Box bgColor="white" width="100%" p="4" boxShadow="base">
          <Text fontSize="xl" fontWeight="bold" textAlign="center">
            Client Fueling History for {username}
          </Text>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th isNumeric>Gallons Requested</Th>
                  <Th>Delivery Address</Th>
                  <Th>Delivery Date</Th>
                  <Th isNumeric>Suggested Price</Th>
                  <Th isNumeric>Total Amount Due</Th>
                </Tr>
              </Thead>
              <Tbody>
                {history.map((item, index) => (
                  <Tr key={index}>
                    <Td isNumeric>{item.gallonsRequested}</Td>
                    <Td>{item.deliveryAddress}</Td>
                    <Td>{new Date(item.deliveryDate).toLocaleDateString()}</Td>
                    <Td isNumeric>${item.suggestPrice}</Td>
                    <Td isNumeric>${item.totalDue}</Td>
                  </Tr>
                ))}
                {history.length === 0 && (
                  <Tr>
                    <Td colSpan={5} textAlign="center">No past orders</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </VStack>
    </Layout>
  );
}
