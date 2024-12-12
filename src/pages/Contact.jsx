import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import emailjs from 'emailjs-com';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: '' // Limpiar errores al modificar los campos
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email no es válido.';
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es requerido.';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess(false);
    } else {
      emailjs
        .send(
          'service_xsqd62y',
          'template_o808wql',
          formData,
          'D2xR32hVJVh4gdHZh'
        )
        .then(
          (response) => {
            console.log('Mensaje enviado:', response.text);
            setSuccess(true);
            setFormData({ nombre: '', email: '', mensaje: '' });
          },
          (error) => {
            console.error('Error:', error);
            setErrors({ general: 'Hubo un problema al enviar el mensaje. Inténtelo más tarde.' });
          }
        );
    }
  };

  return (
    <Container className="my-5">
      <p className="text-center cursive">Dejanos tu mensaje</p>

      {success && <Alert variant="success">Mensaje Enviado Correctamente</Alert>}
      {errors.general && <Alert variant="danger">{errors.general}</Alert>}

      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group controlId="formNombre" className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            isInvalid={!!errors.nombre}
          />
          <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingrese su email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formMensaje" className="mb-3">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Escriba su mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            isInvalid={!!errors.mensaje}
          />
          <Form.Control.Feedback type="invalid">{errors.mensaje}</Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Enviar
        </Button>
      </Form>
    </Container>
  );
};

export default Contacto;
