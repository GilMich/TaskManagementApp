import styles from "./Login.module.css";
import { useState } from "react";
import ApiService from "../../services/api.service";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        const resp = await ApiService.Login(username, password);
        console.log(resp);
        if (resp.error) {
            alert(resp.error);
        }
        if (resp?.access_token) {
            navigate("/Tasks");
        }
        // todo - handle error and handle no response
    };
    return (
        <div className={styles.LoginComponent}>
            <h1>Login</h1>
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
                    Login
                </Button>
                <br />
                <div className={styles.RegisterTextWrapper}>
                    <Form.Text className="text-muted">
                        Don't have an account?
                    </Form.Text>
                    <Button 
                        variant="outline-info"
                        type="button"
                        style={{marginLeft:"10px"}}
                        onClick={() => navigate("/Register")}>
                        Register Here!
                    </Button>
                </div>
            </Form>
        </div>
    )};

export default Login;