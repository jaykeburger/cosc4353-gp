import React from "react";
import Header from "./Header";
import { Flex } from "@chakra-ui/react";

function Layout({ children }) {
  return (
    <div>
      <Header />
      <Flex
        height="92vh"
        alignItems="center"
        justifyContent="center"
        bgColor="green.200"
      >
      {children}
      </Flex>
    </div>
  );
}

export default Layout;