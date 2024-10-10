import Login from "../components/Login/Login";
import axios from "axios";
const baseUrl = "http://localhost:5000";
const ApiService = {
    Login: async (username, password) => {
        try {
            const resp = await axios.post(`${baseUrl}/login`, { username, password });
            if (resp.data.access_token) {
                localStorage.setItem("access_token", resp.data.access_token);
            }
            return resp.data;

        }catch (error) {
            return error.response.data;
        }
    },
    Register: async (username, password) => {
        try {
            const resp = await axios.post(`${baseUrl}/register`, { username, password });
            return resp.data;
        }
        catch (error) {
            return error.response.data;
        }
    },
    GetTasks: async () => {
        try {
            const headers = {"Authorization": `Bearer ${localStorage.getItem("access_token")}`};
            const resp = await axios.get(`${baseUrl}/tasks`, { headers: headers });
            return resp.data;
        } catch (error) {
            return { error: "An error occurred" };
        }
    },
    CreateTask: async (task) => {
        try {
            const headers = {"Authorization": `Bearer ${localStorage.getItem("access_token")}`};
            const resp = await axios.post(`${baseUrl}/tasks`,task, { headers: headers });
            return resp.data;
        } catch (error) {
            return { error: "An error occurred" };
        }
    },
    UpdateTask: async ({id,...task}) => {
        try {
            const headers = {"Authorization": `Bearer ${localStorage.getItem("access_token")}`};
            const resp = await axios.put(`${baseUrl}/tasks/${id}`,task, { headers: headers });
            return resp.data;
        } catch (error) {
            return { error: "An error occurred" };
        }
    },      
    DeleteTask: async (taskId) => {
        try {
            const headers = {"Authorization": `Bearer ${localStorage.getItem("access_token")}`};
            const resp = await axios.delete(`${baseUrl}/tasks/${taskId}`, { headers: headers });
            return resp.data;
        } catch (error) {
            return { error: "An error occurred" };
        }
    }
}

export default ApiService;