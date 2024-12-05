import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1 className="text-center mb-4">Sobre Nosotros</h1>
          <p>
            Bienvenido a nuestra aplicación de lista de tareas. Este proyecto fue creado con el objetivo de proporcionar una herramienta sencilla y eficiente para gestionar las tareas diarias de manera organizada.
          </p>
          <p>
            Nuestra aplicación permite a los usuarios agregar, editar y eliminar tareas, así como marcarlas como completadas cuando estén terminadas. Con una interfaz limpia y fácil de usar, esta aplicación está diseñada para ser intuitiva, incluso para aquellos que no están familiarizados con aplicaciones complejas.
          </p>
          <p>
            Además, ofrecemos un modo de alto contraste para mejorar la accesibilidad, asegurando que todos los usuarios, independientemente de sus necesidades visuales, puedan utilizar la aplicación de manera efectiva.
          </p>
          <p>
            Esperamos que esta herramienta te ayude a mejorar tu productividad y mantener un registro claro de todas tus tareas pendientes. ¡Gracias por utilizar nuestra aplicación!
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
