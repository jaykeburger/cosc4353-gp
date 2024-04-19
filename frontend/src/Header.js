import { VStack, Box, Button, Text, useColorModeValue, useDisclosure, Drawer, DrawerContent, DrawerOverlay } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiUser, FiFileText, FiBookOpen, FiLogOut } from 'react-icons/fi';

export default function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleRedirect = (path) => {
    navigate(path);
    onClose(); // Close the drawer when a link is clicked
  }

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal" size="lg" variant="ghost" position="fixed" top="10px" left="10px">
        <FiMenu />
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent
          w="150px"
          bg={useColorModeValue('white', 'gray.900')}
          borderRight="1px"
          borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        >
          <VStack p="5" spacing="10" align="stretch">
            <Text fontSize="lg" p="5">FUEL</Text>
            <Button fontSize="md" justifyContent="flex-start" fontWeight="light" leftIcon={<FiFileText />} onClick={() => handleRedirect('/fuel-quote')}>
              Create Quote
            </Button>
            <Button fontSize="md" justifyContent="flex-start" fontWeight="light" leftIcon={<FiBookOpen />} onClick={() => handleRedirect('/history')}>
              Fuel History
            </Button>
            <Button fontSize="md" justifyContent="flex-start" fontWeight="light" leftIcon={<FiUser />} onClick={() => handleRedirect('/profileInfo')}>
              Profile
            </Button>
            <Button fontSize="md" justifyContent="flex-start" fontWeight="light" leftIcon={<FiLogOut />} onClick={() => handleRedirect('/')}>
              Logout
            </Button>
          </VStack>
        </DrawerContent>
      </Drawer>
    </>
  );
}
