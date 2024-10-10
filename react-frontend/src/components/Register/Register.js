import styles from "./Register.module.css";
import { useState } from "react";
import ApiService from "../../services/api.service";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        const resp = await ApiService.Register(username, password);
        console.log(resp);
        if (resp.error) {
            alert(resp.error);
        }
        if (resp?.username) {
            navigate("/Login");
        }
        // todo - handle error and handle no response
    };
    return (
        <div>
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
                <Form.Text className="text-muted">
                    already have an account?
                </Form.Text>
                <Button 
                    variant="outline-info"
                    type="button"
                    onClick={() => navigate("/Login")}>
                    Login Here!
                </Button>
            </Form>
        </div>
    )};

export default Register;