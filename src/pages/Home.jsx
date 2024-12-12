import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Alert } from 'react-bootstrap';
import axios from 'axios';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');  // Estado para el error

  // Función para obtener las tareas desde el backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://tdlbackend-production.up.railway.app/api/tareas');
      setTasks(response.data);
    } catch (err) {
      console.error('Error al obtener las tareas', err);
    }
  };

  // Función para agregar una tarea
  const addTask = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) {
      setError('El título y la descripcion de la tare son campos obligatorios');  // Mostrar error si el título está vacío
      return;
    }
 
    if (newTitle.trim() && newDescription.trim()) {
      try {
        const newTask = { title: newTitle, description: newDescription };
        await axios.post('https://tdlbackend-production.up.railway.app/api/tareas', newTask);
        setNewTitle('');
        setNewDescription('');
        setError('');  // Limpiar el error después de agregar la tarea
        fetchTasks(); // Refrescar la lista de tareas
      } catch (err) {
        console.error('Error al agregar la tarea', err);
      }
    }
  };

  // Función para eliminar una tarea
  const deleteTask = async (id) => {
    try {
      await axios.delete(`https://tdlbackend-production.up.railway.app/api/tareas/${id}`);
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
      await axios.put(`https://tdlbackend-production.up.railway.app/api/tareas/${editingTask._id}`, updatedTask);
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
      await axios.put(`https://tdlbackend-production.up.railway.app/api/tareas/${id}`, { completed: !completed });
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
      <Form onSubmit={addTask} className="mb-3 d-flex flex-column align-items-center" aria-label="Formulario para agregar tareas">
        <Form.Control
          type="text"
          placeholder="Título de la tarea"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="mb-2"
          aria-label="Ingresar el título de la tarea"
        />

        <Form.Control
          type="text"
          placeholder="Descripción de la tarea"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          className="mb-2"
          aria-label="Ingresar la descripción de la tarea"
          />
          {/* Mostrar el error si no hay título o descripcion */}
          {error && <Alert variant="danger" className="w-100">{error}</Alert>}
        <Button variant="primary" type="submit" className="mt-2" aria-label="Agregar tarea">
          Agregar Tarea
        </Button>
      </Form>

      {/* Tabla de tareas */}
      <Table striped bordered hover className="text-center" aria-label="Tabla de tareas">
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
                  aria-label={`Marcar como ${task.completed ? 'pendiente' : 'completada'}`}
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
                  aria-label="Editar tarea"
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteTask(task._id)}
                  aria-label="Eliminar tarea"
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
        <Modal show={showModal} onHide={() => setShowModal(false)} aria-labelledby="editar-tarea">
          <Modal.Header closeButton>
            <Modal.Title id="editar-tarea">Editar Tarea</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              type="text"
              value={editingTask.title}
              onChange={(e) =>
                setEditingTask({ ...editingTask, title: e.target.value })
              }
              className="mb-2"
              aria-label="Editar título de la tarea"
            />
            <Form.Control
              type="text"
              value={editingTask.description}
              onChange={(e) =>
                setEditingTask({ ...editingTask, description: e.target.value })
              }
              aria-label="Editar descripción de la tarea"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)} aria-label="Cancelar edición">
              Cancelar
            </Button>
            <Button variant="primary" onClick={saveEdit} aria-label="Guardar cambios">
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Home;
