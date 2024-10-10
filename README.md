
# Task Management App

## Overview

This is a full-stack **Task Management App** built with:
- **Flask** for the backend (API, authentication, task management).
- **React** for the frontend (user interface to interact with tasks).

This app allows users to register, log in, and manage their tasks. Tasks can be created, updated, marked as completed, and deleted. JWT (JSON Web Tokens) are used for authentication and task access control.

---

## Project Structure

- **Backend**: `flask-backend/` (Flask API)
- **Frontend**: `react-frontend/` (React UI)

---

## Prerequisites

Before setting up the project, ensure you have the following tools installed:

- **Python 3.6+**
- **SQLite 3**
- **Git** (to clone the repository)

---

## Setup Instructions

### Step 1: Clone the Repository

1. Open your terminal or command prompt.
2. Run the following command to clone the repository:

```bash
git clone https://github.com/your-username/TaskManagementApp.git
cd TaskManagementApp
```

---

### Step 2: Set Up the Backend (Flask)

1. **Navigate to the backend directory**:

   ```bash
   cd flask-backend
   ```

2. **Create a virtual environment**:

   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment**:
   - On **Windows**:
     ```bash
     venv\Scripts\activate
     ```
   - On **macOS/Linux**:
     ```bash
     source venv/bin/activate
     ```

4. **Install the required dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

5. **Initialize the SQLite database**:
   The database supposed to automatically deploy when the app starts based on the config.py file.
   sometimes the db has trouble deplying and you need to run flask run twice when inside the venv.
   
   ```bash
   flask run
   ```

   This will create a `task_management.db` file in the instance folder with the necessary tables.

7. **Run the backend**:
   Once everything is set up, run the Flask development server:

   ```bash
   flask run
   ```

   The API will be available at `http://127.0.0.1:5000/`.

---

### Step 3: Set Up the Frontend (React)

1. **Navigate to the frontend directory**:

   ```bash
   cd react-frontend
   ```

2. **Install the required dependencies**:

   ```bash
   npm install
   ```

3. **Run the React frontend**:

   ```bash
   npm start
   ```

   The frontend will be available at `http://localhost:3000/`.

---

## Testing the Application

Once both the Flask backend and React frontend are running, you can interact with the application:

- **Backend**: API endpoints can be tested via Postman or directly from the React frontend.
- **Frontend**: Use the UI to register, log in, create, update, complete, or delete tasks.

---

## Additional Information

### Database
- The app uses **SQLite** as the database, which will be created automatically in the `instance` folder.
  
### API Authentication
- JWT (JSON Web Token) is used for securing the API. Ensure to pass the token in the `Authorization` header when making API requests.

---
