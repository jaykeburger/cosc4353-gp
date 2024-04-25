import React from "react";
import Header from "./Header";
import { Flex } from "@chakra-ui/react";
import Background from "../src/grassfield.jpeg"

function Layout({ children }) {
  return (
    <div style={{
      backgroundImage: `url(${Background})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover", // Changed from 100% to cover
      backgroundPosition: "center center", // Center the background image
      backgroundColor: "#ecede7",
      minHeight: "100vh",
      width: "100%" // Ensure it covers the full width of the viewport
    }}>    
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