import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Registration from './pages/Registration';
import ClientFuelHistory from './pages/ClientFuelHistory';
import ProfileInfo from './pages/ProfileInfo';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import FuelQuote from './pages/FuelQuote';
import ProfileManage from './pages/ProfileManage.js';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/history" element={<ClientFuelHistory />} />
          <Route path="/profileInfo" element={<ProfileInfo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/fuel-quote" element={<FuelQuote />} />
          <Route path="/profile-management" element={<ProfileManage />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
