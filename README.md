### To-Do Manager

- A full-stack To-Do Manager application with user authentication and task management. Users can sign up, log in, manage their tasks, and perform CRUD operations on their tasks. Built with React for the frontend and Node.js with Express.js for the backend, utilizing MongoDB for data storage.

##### Features

- User authentication (sign up and login)
- Task management (create, read, update, delete)
- User-specific task access
- Responsive and user-friendly UI with Material-UI
- JWT-based authentication

##### Technologies

- Frontend: React, Material-UI, Axios, React Router, Context API
- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, Express-Validator
- Database: MongoDB

##### Setup and Installation

- Backend: cd backend -> npm install
- Create a .env file in the backend directory and add the following environment variables:
  - MONGO_URI=mongodburl
  - JWT_SECRET=your_jwt_secret
- npm start

- Frontend: cd client -> npm install -> npm run dev

##### API Endpoints

- User Authentication:
  - Register User: POST /api/v1/auth/register
  - Login User: POST /api/v1/auth/login
  - Get User Info: GET /api/v1/auth/info

- Task Management:
  - Get User tasks: GET /api/v1/tasks
  - Add Task: POST /api/v1/tasks
  - Update Task: PUT /api/v1/tasks/:id
  - Delete task: DELETE /api/v1/tasks/:id
