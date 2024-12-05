import React, { useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const addTask = () => {
    if (newTitle.trim() && newDescription.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), title: newTitle, description: newDescription, completed: false },
      ]);
      setNewTitle('');
      setNewDescription('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const saveEdit = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editingTask.id
          ? { ...task, title: editingTask.title, description: editingTask.description }
          : task
      )
    );
    setShowModal(false);
    setEditingTask(null);
  };

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
            <tr key={task.id}>
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
                  onClick={() => toggleComplete(task.id)}
                  className="me-2"
                >
                  {task.completed ? 'Desmarcar' : 'Completar'}
                </Button>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => openEditModal(task)}
                  className="me-2"
                >
                  Editar
                </Button>
                <Button variant="danger" size="sm" onClick={() => deleteTask(task.id)}>
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
