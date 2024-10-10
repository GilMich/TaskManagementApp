import styles from "./Register.module.css";
import { useState } from "react";
import ApiService from "../../services/api.service";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const displayRegisterSuccessMessage = () => {
        return(
        <ToastContainer position="top-center" className="p-3">
            <Toast className="bg-success" onClose={() => setShow(false)} show={show} delay={2000} animation={true} autohide>
                <Toast.Header>
                <strong className="me-auto">Register Success</strong>
                <small>1 second ago</small>
                </Toast.Header>
                <Toast.Body className="variant-dark text-white" >User Registered Succesfully!</Toast.Body>
        </Toast>
      </ToastContainer>);
    };

    const handleSubmit = async (e) => {
        const resp = await ApiService.Register(username, password);
        console.log(resp);
        if (resp.error) {
            alert(resp.error);
        }
        if (resp?.username) {
            setShow(true);
            setTimeout(() => {
                navigate("/Login");
                }, 3000);
        }
    };
    return (
        <div className={styles.RegisterComponent}>
            {show && displayRegisterSuccessMessage()}
            <h1>Register</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        name="username"
                        value={username}
                        onChange={(event)=>setUsername(event.target.value)}
                        type="text" 
                        placeholder="Enter Username" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(event)=>setPassword(event.target.value)} />
                </Form.Group>
                <Button 
                    variant="outline-primary"
                    type="button"
                    onClick={handleSubmit}>
                    Register
                </Button>
                <br />
                <div className={styles.LoginTextWrapper}>
                    <Form.Text className="text-muted">
                        already have an account?
                    </Form.Text>
                    <Button 
                        variant="outline-info"
                        type="button"
                        style={{marginLeft:"10px"}}
                        onClick={() => navigate("/Login")}>
                        
                        Login Here!
                    </Button>
                </div>
            </Form>
        </div>
    )};

export default Register;