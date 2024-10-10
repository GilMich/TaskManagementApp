import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import ApiService from "../../services/api.service";
import styles from "./Tasks.module.css";
const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState("");
  const [task, setTask] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      const resp = await ApiService.GetTasks();
      setTasks(resp);
    };
    fetchTasks();
  }, []);

  const handleToggleModal = () => {
    setShow(!show);
  };

  const handleCloseUpdateModal = () => {
    handleToggleModal();
    setTask({});
  };

  const handleShowCreateModal = () => {
    setTask({});
    setModalType("create");
    handleToggleModal();
  };

  const handleShowUpdateModal = (id, title, description) => {
    setModalType("update");
    handleToggleModal();
    setTask({ id, title, description });
  };

  const handleCreateTask = async (event) => {
    event.preventDefault(); // Always prevent the default form submission

    // Form is valid, proceed with task creation
    const newTask = await ApiService.CreateTask(task);
    setTasks([...tasks, newTask]);
    setTask({});
    handleToggleModal();
  };

  const handleUpdateTask = async (event) => {
    event.preventDefault(); // Always prevent the default form submission

    await ApiService.UpdateTask(task);
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    //  reset the form after successful submission
    setTask({});
    handleCloseUpdateModal();
  };

  const handleToggleCompleted = async (task) => {
    const updatedTask = { ...task, completed: !task.completed };
    try {
      setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
      await ApiService.UpdateTask(task.id, updatedTask);
    } catch (error) {
      console.error("Error updating task", error);
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    }
  };

  const handleDeleteTask = async (id) => {
    await ApiService.DeleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTaskForm = (field, value) => {
    setTask({ ...task, [field]: value });
  };

  const createModal = () => {
    const { onSubmit, modalTitle, buttonTitle, buttonVariant } = test[modalType];
    return (
      <Form validated={Object.keys(task).length} onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Col} controlId="validationCustom03">
            <Form.Label>Task Title</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Task Title"
              value={task.title}
              onChange={(e) => updateTaskForm("title", e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              please provide a task title!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="validationCustom02">
            <Form.Label>Task description</Form.Label>
            <Form.Control
              as="textarea"
              required
              type="text"
              placeholder="Task description"
              value={task.description}
              onChange={(e) => updateTaskForm("description", e.target.value)}
              rows={3}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              please provide a task description!
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant={buttonVariant}>
            {buttonTitle}
          </Button>
          <Button variant="secondary" onClick={handleToggleModal}>
            Discard
          </Button>
        </Modal.Footer>
      </Form>
    );
  };

  const test = {
    create: {
      onSubmit: handleCreateTask,
      modalTitle: "Create a New Task",
      buttonTitle: "Create Task",
      buttonVariant: "primary",
    },
    update: {
      onSubmit: handleUpdateTask,
      modalTitle: " Update Task",
      buttonTitle: "Update Task",
      buttonVariant: "warning",
    },
  };

  return (
    <div className={styles.tasksPage}>
      {/* Modal for Create Task*/}
      <Modal show={show} onHide={handleToggleModal}>
        {show && createModal()}
      </Modal>

      {/* Tasks Displayed from the server */}
      <div className={styles.createTasksWrapper}>
        <h1>Tasks</h1>
        <Button
          variant="outline-primary"
          className={styles.createButton}
          onClick={handleShowCreateModal}
        >
          Create new Task
        </Button>
        <Accordion className={styles.accordion} flush>
          {tasks.map((task) => (
            <div key={task.id} className={styles.accordionItemWrapper}>
              <div className={styles.checkboxTaskWrapper}>
                <Form.Check
                  aria-label="option 1"
                  checked={task.completed}
                  onChange={() => handleToggleCompleted(task)}
                  className={styles.checkBox}
                />

                <Accordion.Item
                  className={styles.accordionItem}
                  eventKey={task.id}
                >
                  <Accordion.Header className={styles.accordionHeader}>
                    <span
                      style={{
                        textDecoration:
                          task.completed  ? "line-through" : "none",
                      }}
                    >
                      {task.title}
                    </span>
                  </Accordion.Header>
                  <Accordion.Body className={styles.accordionBody}>
                    <h5 className={styles.descriptionHeader}>Description:</h5>
                    {task.description}
                    <div className={styles.buttonsWrapper}>
                      <Button
                        variant="danger"
                        className={styles.actionButton}
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        Delete Task
                      </Button>{" "}
                      <Button
                        variant="warning"
                        className={styles.actionButton}
                        onClick={() =>
                          handleShowUpdateModal(
                            task.id,
                            task.title,
                            task.description
                          )
                        }
                      >
                        Update Task
                      </Button>{" "}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            </div>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Tasks;
