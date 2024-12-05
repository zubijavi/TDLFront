// src/components/Footer.jsx
import React from 'react';
import { Navbar } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
    <Navbar 
      className="footer justify-content-center p-3 mt-4 bg-warning"
    >
      <Navbar.Text>
        ToDo List - Zubillaga Javier
      </Navbar.Text>
    </Navbar>
    </footer>
  );
};

export default Footer;
