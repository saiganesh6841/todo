import { Button, Card, Form, ListGroup, Modal } from "react-bootstrap"
import "./todo.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, updateTask } from "../redux/action";




const TodoApp = () => {

    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const [editingTask, setEditingTask] = useState(null);
    const [filter, setFilter] = useState('all');
    const tasks = useSelector(state => state.tasks);
    const dispatch = useDispatch();

    

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks) {
            savedTasks.forEach(task => {
                dispatch(addTask(task));
            });
        }
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleClose = () =>{
        setShow(false)
        setTitle('');
        setStatus('');
        setEditingTask(null);
    } 
    const handleShow = () => setShow(true)

    const handleAddTask = () => {
        const currentDateTime = new Date().toLocaleString();
        dispatch(addTask({ title, status, time: currentDateTime }));
        handleClose()
    };
    const handleDeleteTask = (index) => {
        dispatch(deleteTask(index));
    };


    const handleEdit = (id) => {
        const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
        const taskToEdit = tasks[index];
        setTitle(taskToEdit.title || '');
        setStatus(taskToEdit.status || '');
        setEditingTask(index);
        handleShow();
    } else {
        console.error('Task not found');
    }
    };
    
    const handleUpdateTask = () => {
        dispatch(updateTask(editingTask, { title, status })); 
        handleClose();
    };

    const handleToggleStatus = (id) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, status: task.status === 'Complete' ? 'Incomplete' : 'Complete' } : task
        );
        dispatch(updateTask(id, updatedTasks.find(task => task.id === id)));
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true;
        return filter === 'complete' ? task.status === 'Complete' : task.status === 'Incomplete';
    });

   

    return (
        <>
            <div>
                <h1 style={{ color: "rgb(129, 142, 199)" }}> TODO LIST</h1>
                <br />
                <div className="disFlex">

                    <div>
                        <Button className="btnAdd" onClick={handleShow}>Add Task</Button>
                    </div>
                    <div>
                        <select className="selectTodo" defaultValue="all" value={filter} onChange={(e) => setFilter(e.target.value)}>
                            <option value="all">All</option>
                            <option value="incomplete">Incomplete</option>
                            <option value="complete">Complete</option>
                        </select>
                    </div>
                </div>

                <br/>
                {/* Display tasks */}

                <div className="task-container">
                {filteredTasks.length === 0 ? (
                        <h4>No todos</h4>
                    ) : (
                        filteredTasks.map((task, index) => (
                        <Card key={index} className="mb-2" >
                            <Card.Body className="d-flex justify-content-between align-items-center">
                                <div className="task-info-container">
                                    <Form.Check
                                        type="checkbox"
                                        checked={task.status === 'Complete'}
                                        onChange={() => handleToggleStatus(task.id)}
                                        className="me-2"
                                        style={{fontSize:"24px"}}
                                    />
                                   <div>
                                            <div style={{ textDecoration: task.status === 'Complete' ? 'line-through' : 'none', fontSize: "20px" }}>
                                                {task.title}
                                            </div>
                                            <div className="text-muted" style={{ fontSize: '0.8em' }}>{task.time}</div>
                                        </div>
                                </div>
                                <div>
                                    <Button variant="outline-light" size="sm" className="me-2" onClick={() => handleDeleteTask(task.id)}>
                                        <img src="https://img.icons8.com/?size=24&id=99971&format=png" />
                                    </Button>
                                    <Button variant="outline-light" size="sm"  onClick={() => handleEdit(task.id)}>
                                        <img src="https://img.icons8.com/?size=30&id=71201&format=png" />
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                        ))
                    )}
                </div>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{editingTask !== null ? "UPDATE TODO" :"ADD TODO" }</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formTaskTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter task title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formTaskStatus">
                                <Form.Label>Status</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option>Incomplete</option>
                                    <option>Complete</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={editingTask !== null ? handleUpdateTask : handleAddTask}>
                        {editingTask !== null ? 'Update Task' : 'Add Task'}
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </>
    )
}

export default TodoApp
