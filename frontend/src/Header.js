import React from "react";
import { VStack, Box, Button, Text, useColorModeValue } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiUser, FiFileText, FiBookOpen, FiLogOut } from 'react-icons/fi';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleRedirect = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const username = new URLSearchParams(location.search).get('username');

  return (
    <Box
      w="190px"
      p="5"
      color="black"
      bg={useColorModeValue('white', 'gray.900')}
      h="95vh"
      position="fixed"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      margin="15px"
      borderBottomLeftRadius="30px"
      paddingRight="0px;"
    >
      <VStack spacing="10" align="stretch">
        <Text>Welcome, {username}</Text>
        <Button
          fontSize="md"
          justifyContent="flex-start"
          bg={isActive('/fuel-quote') ? '#ecede7' : 'white'}
          textColor={isActive('/fuel-quote') ? '#d65e4f' : 'black'}
          leftIcon={<FiFileText />}
          onClick={() => handleRedirect(`/fuel-quote/?username=${username}`)}
          width="full"
          borderRightRadius="0px"
          height="50px"
        >
          Create Quote
        </Button>
        <Button
          fontSize="md"
          justifyContent="flex-start"
          width="full"
          borderRightRadius="0px"
          bg={isActive('/history') ? '#ecede7' : 'white'}
          
          textColor={isActive('/history') ? '#d65e4f' : 'black'}
          leftIcon={<FiBookOpen />}
          onClick={() => handleRedirect(`/history/?username=${username}`)}
          height="50px"
        >
          Fuel History
        </Button>
        <Button
          fontSize="md"
          justifyContent="flex-start"
          width="full"
          bg={isActive('/profile-management') ? '#ecede7' : 'white'}
          textColor={isActive('/profile-management') ? '#d65e4f' : 'black'}
          leftIcon={<FiUser />}
          onClick={() => handleRedirect(`/profile-management/?username=${username}`)}
          borderRightRadius="0px"
          height="50px"
        >
          Profile
        </Button>
        <Button
          fontSize="md"
          justifyContent="flex-start"
          width="full"
          bg={isActive('/') ? '#ecede7' : 'white'}
          textColor={isActive('/') ? '#d65e4f' : 'black'}
          leftIcon={<FiLogOut />}
          onClick={() => handleRedirect('/')}
          borderRightRadius="0px"
          height="50px"
        >
          Logout
        </Button>
      </VStack>
    </Box>
  );
}
