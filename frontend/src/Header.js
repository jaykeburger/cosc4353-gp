import {
  HStack,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Header() {

  const navigate = useNavigate();

  const handleRedirect = (path) =>{
    navigate(path);
  }

  return (
    <HStack
      bg="green.200"
      height="8vh"
      width="100vw"
      px="3"
      alignItems="center"
    >
      <Menu>
        <MenuButton as={Button}>
          <FaBars />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => handleRedirect('/profile-info')}>Profile Management</MenuItem>
          <MenuItem onClick={() => handleRedirect('/fuel-quote')}>Create Quote</MenuItem>
          <MenuItem onClick={() => handleRedirect('/history')}>Fuel History</MenuItem>
          <MenuItem onClick={() => handleRedirect('/')}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
}
