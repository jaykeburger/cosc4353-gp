import React from "react";
import Header from "./Header";
import { Flex } from "@chakra-ui/react";

function Layout({ children }) {
  return (
    <div style={{ backgroundColor: "#ecede7", minHeight: "100vh" }}>
      <Header />
      <Flex
        height="92vh"
        alignItems="center"
        justifyContent="center"
      >
      {children}
      </Flex>
    </div>
  );
}

export default Layout;