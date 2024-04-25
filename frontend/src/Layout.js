import React from "react";
import Header from "./Header";
import { Flex } from "@chakra-ui/react";
import Background from "../src/grassfield.jpeg"

function Layout({ children }) {
  return (
    <div style={{ backgroundImage: `url(${Background})`, backgroundRepeat:"no-repeat", backgroundSize:"100%", backgroundColor: "#ecede7", minHeight: "100vh" }}>
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