import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Función para obtener las tareas desde el backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tareas');
      setTasks(response.data);
    } catch (err) {
      console.error('Error al obtener las tareas', err);
    }
  };

  // Función para agregar una tarea
  const addTask = async () => {
    if (newTitle.trim() && newDescription.trim()) {
      try {
        const newTask = { title: newTitle, description: newDescription };
        await axios.post('http://localhost:5000/tareas', newTask);
        setNewTitle('');
        setNewDescription('');
        fetchTasks(); // Refrescar la lista de tareas
      } catch (err) {
        console.error('Error al agregar la tarea', err);
      }
    }
  };

  // Función para eliminar una tarea
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tareas/${id}`);
      fetchTasks(); // Refrescar la lista de tareas
    } catch (err) {
      console.error('Error al eliminar la tarea', err);
    }
  };

  // Función para actualizar una tarea
  const saveEdit = async () => {
    try {
      const updatedTask = {
        title: editingTask.title,
        description: editingTask.description,
        completed: editingTask.completed,
      };
      await axios.put(`http://localhost:5000/tareas/${editingTask._id}`, updatedTask);
      setShowModal(false);
      setEditingTask(null);
      fetchTasks(); // Refrescar la lista de tareas
    } catch (err) {
      console.error('Error al editar la tarea', err);
    }
  };

  // Función para manejar el cambio de estado (completada/no completada)
  const toggleComplete = async (id, completed) => {
    try {
      await axios.put(`http://localhost:5000/tareas/${id}`, { completed: !completed });
      fetchTasks(); // Refrescar la lista de tareas
    } catch (err) {
      console.error('Error al cambiar el estado de la tarea', err);
    }
  };

  // Cargar las tareas cuando el componente se monta
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 cursive fs-3">Lista de Tareas</h1>
      {/* Formulario para agregar tareas */}
      <Form className="mb-3 d-flex flex-column align-items-center">
        <Form.Control
          type="text"
          placeholder="Título de la tarea"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="mb-2"
        />
        <Form.Control
          type="text"
          placeholder="Descripción de la tarea"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          className="mb-2"
        />
        <Button variant="primary" onClick={addTask} className="mt-2">
          Agregar
        </Button>
      </Form>

      {/* Tabla de tareas */}
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task._id}>
              <td>{index + 1}</td>
              <td style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.title}
              </td>
              <td>{task.description}</td>
              <td>{task.completed ? 'Completada' : 'Pendiente'}</td>
              <td>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => toggleComplete(task._id, task.completed)}
                  className="me-2"
                >
                  {task.completed ? 'Desmarcar' : 'Completar'}
                </Button>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => {
                    setEditingTask(task);
                    setShowModal(true);
                  }}
                  className="me-2"
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteTask(task._id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para editar tareas */}
      {editingTask && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Tarea</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              type="text"
              value={editingTask.title}
              onChange={(e) =>
                setEditingTask({ ...editingTask, title: e.target.value })
              }
              className="mb-2"
            />
            <Form.Control
              type="text"
              value={editingTask.description}
              onChange={(e) =>
                setEditingTask({ ...editingTask, description: e.target.value })
              }
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={saveEdit}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Home;
