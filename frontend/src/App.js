import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import Registration from './pages/Registration';
import ClientFuelHistory from './pages/ClientFuelHistory';

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
      <BrowserRouter>
      <Routes>
        <Route exact path="/register" element={<Registration />}/>
      </Routes>
      <Routes>
        <Route exact path="/history" element={<ClientFuelHistory />}/>
      </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App;
