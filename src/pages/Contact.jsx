import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario, como enviar los datos a una API o base de datos
    console.log('Formulario enviado:', formData);
  };

  return (
    <Container className="my-5">
      <p className="text-center cursive">Dejanos tu mensaje</p>
      <Form onSubmit={handleSubmit}>
        {/* Campo Nombre */}
        <Form.Group controlId="formNombre" className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Campo Email */}
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingrese su email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Campo Mensaje */}
        <Form.Group controlId="formMensaje" className="mb-3">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Escriba su mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Botón Enviar */}
        <Button variant="primary" type="submit" className="w-100">
          Enviar
        </Button>
      </Form>
    </Container>
  );
};

export default Contacto;
