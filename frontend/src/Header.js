import {
  HStack,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";

export default function Header() {
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
          <MenuItem>Profile Management</MenuItem>
          <MenuItem>Create Quote</MenuItem>
          <MenuItem>Fuel History</MenuItem>
          <MenuItem>Logout</MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
}
