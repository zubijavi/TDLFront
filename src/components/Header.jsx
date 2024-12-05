import React, { useState, useEffect } from 'react';
import { Navbar, Button, Nav, Container, Row, Col } from 'react-bootstrap';

const Header = () => {
  const [highContrast, setHighContrast] = useState(() => {
    const savedContrast = localStorage.getItem('highContrast');
    return savedContrast ? JSON.parse(savedContrast) : false;
  });

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }

    localStorage.setItem('highContrast', JSON.stringify(highContrast));
  }, [highContrast]);

  const toggleContrast = () => {
    setHighContrast(!highContrast);
  };

  return (
    <>
      <Navbar 
        bg={highContrast ? "dark" : "warning"} 
        variant={highContrast ? "dark" : "warning"} 
        expand="lg" 
        className="p-3 mb-4"
      >
        <Container className="d-flex flex-column justify-content-center align-items-center w-100">
          
          {/* Fila 1: Título y Logo a la derecha */}
          <Row className="w-100 d-flex justify-content-between align-items-center mb-3">
            <Col xs="auto" className="text-center d-flex gap-3 align-items-center justify-content-center">
               <img src="/logo.png" alt="Logo" width="50" height="50" /> 
              <Navbar.Brand>
                <Nav.Link href="/" className="text-center modak fs-1 text-primary">
              To Do List
              </Nav.Link>
              </Navbar.Brand>
            </Col>
            <Col xs="auto" className="text-center">
              <Button 
                variant={highContrast ? "light" : "secondary"} 
                onClick={toggleContrast} 
                className="btn-sm px-2 py-1"
              >
                {highContrast ? 'Modo Normal' : 'Alto Contraste'}
              </Button>
            </Col>
          </Row>

          {/* Fila 2: Menú de navegación */}
          <Row className="d-flex w-100 justify-content-center">
            <Navbar.Collapse id="navbar-nav" className="w-100 cursive">
              <Nav className="text-center w-100 justify-content-around">
                <Nav.Link href="/">Tareas</Nav.Link>
                <Nav.Link href="/contact">Contacto</Nav.Link>
                <Nav.Link href="/about">Documentación</Nav.Link>
              </Nav>
            </Navbar.Collapse>

            {/* Botón de hamburguesa en pantallas pequeñas */}
            <Navbar.Toggle aria-controls="navbar-nav" />
          </Row>

        </Container>
      </Navbar>
    </>
  );
};

export default Header;
