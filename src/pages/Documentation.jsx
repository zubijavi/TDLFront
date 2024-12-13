import React from 'react';

const About = () => {
  return (
    
    
    <div className="container mt-5">
      <h1 className="text-center mb-4 modak">Documentación del Proyecto</h1>
      <h1 className="text-center mb-4">To-Do List</h1>
      <p>
        <strong>To-Do List</strong> es una aplicación web diseñada para gestionar tareas. Permite a los usuarios agregar, editar, marcar como completadas y eliminar tareas de una lista. Además, incluye un formulario de contacto mediante el cual los usuarios pueden enviar mensajes.
      </p>
      <p>
        La interfaz de usuario es simple, accesible y cuenta con una versión de alto contraste para garantizar la inclusión de usuarios con distintas necesidades visuales.
      </p>

      <div className="mb-4">
        <h2>Frontend</h2>
        <p>El frontend de la aplicación está desarrollado con React y Bootstrap.</p>
        <ul>
          <li>Interactividad: Los usuarios pueden agregar, editar, completar y eliminar tareas.</li>
          <li>Navegación: Se utiliza React Router para manejar la navegación entre las vistas de la aplicación.</li>
          <li>
            Interfaz responsiva: Utiliza Bootstrap para garantizar una experiencia fluida en diferentes tamaños de pantalla.
          </li>
          <li>
            Validaciones: Los formularios de la aplicación incluyen validaciones para garantizar la entrada de datos correctos y evitar errores.
          </li>
          <li>
            Accesibilidad mejorada:
            <ul>
              <li>
                Los componentes están optimizados para la navegación mediante teclado, asegurando que los usuarios puedan interactuar con la aplicación sin necesidad de un mouse.
              </li>
              <li>
                Se han implementado etiquetas <strong>ARIA (aria-label)</strong> para garantizar una correcta navegación y comprensión de la interfaz con lectores de pantalla.
              </li>
            </ul>
          </li>
          <li>Despliegue en la nube: El frontend fue desplegado en <strong>Vercel</strong>.</li>
        </ul>
      </div>

      <div className="mb-4">
        <h2>Backend</h2>
        <p>
          El backend está construido con Node.js utilizando Express como framework para manejar las solicitudes HTTP, y
          MongoDB para el almacenamiento de las tareas.
        </p>
        <ul>
          <li>Operaciones CRUD: Permite la creación, lectura, actualización y eliminación de tareas.</li>
          <li>API RESTful: Las rutas de la API permiten la comunicación con el frontend para gestionar las tareas.</li>
          <li>Despliegue en la nube: El backend fue desplegado en <strong>Railway</strong>.</li>
        </ul>
      </div>

      <div className="mb-4">
        <h2>Base de Datos (MongoDB)</h2>
        <p>
          La base de datos utiliza <strong>MongoDB Atlas</strong>, un servicio de bases de datos en la nube que permite gestionar datos de forma segura y escalable.
        </p>
      </div>

      <div className="mb-4">
        <h2>Control de Versiones con Git y GitHub</h2>
        <p>
          El desarrollo del proyecto fue gestionado mediante <strong>Git</strong> como sistema de control de versiones, permitiendo:
        </p>
        <ul>
          <li>Realizar un seguimiento detallado de los cambios realizados en el código.</li>
          <li>Trabajar de manera colaborativa con ramas para evitar conflictos en el desarrollo.</li>
          <li>Mantener un historial claro y accesible de las versiones del proyecto.</li>
        </ul>
        <p>
          Además, se utilizó <strong>GitHub</strong> como plataforma para alojar el repositorio remoto, facilitando:
        </p>
        <ul>
          <li>La integración con herramientas de despliegue continuo.</li>
          <li>El acceso centralizado al código fuente desde cualquier lugar.</li>
        </ul>
      </div>

      <div>
        <h2>Despliegue en la Nube</h2>
        <p>
          Todo el proyecto está completamente desplegado en la nube, utilizando servicios modernos y escalables:
        </p>
        <ul>
          <li><strong>Frontend:</strong> Desplegado en Vercel para un acceso rápido y global.</li>
          <li><strong>Backend:</strong> Desplegado en Railway para garantizar un rendimiento óptimo de la API.</li>
          <li><strong>Base de datos:</strong> Almacenada en MongoDB Atlas, un servicio confiable y seguro para bases de datos en la nube.</li>
        </ul>
        <p>
          Esta arquitectura asegura que los usuarios puedan acceder a la aplicación desde cualquier lugar, con alta disponibilidad y rendimiento.
        </p>
      </div>
    </div>
  );
};

export default About;
