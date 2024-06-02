# MERN Backend for task-management-app

## About

This repository contains the backend code for a MERN stack application. The backend is built using Node.js, Express.js, and MongoDB. It provides a RESTful API for todo list data and interacting with the frontend of the application.

## Demo

  <div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/203a0ec9aaf04ea0a2165c213f0f7657?sid=0c490aa1-42b9-42e1-abee-c005b0804d3b" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

### Live Link

[Backend github URL](https://github.com/Shahriar-Shakil/task-management-backend)
[Frontend github URL](https://github.com/Shahriar-Shakil/mern-task-management-app)

## Features

- RESTful API for CRUD operations

- User authentication and authorization

- Data validation and error handling

- Integration with MongoDB for data persistence

## Technologies

- Node.js

- Express.js

- MongoDB

- Mongoose

- JSON Web Tokens (JWT) for authentication

- bcrypt for password hashing

## Getting Started

These instructions will help you set up the backend project on your local machine for development and testing purposes.

### Prerequisites

- Node.js (version 20.13.1)

- npm (version 10.5.2) or pnpm (version 9.1.1)

### Installation

1. Clone the repository:

```sh

git clone https://github.com/Shahriar-Shakil/task-management-backend.git
cd task-management-backend
npm install > npm start
```

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```sh
URI //mongodb uri
ACCESS_TOKEN_SECRET //jwt token secret
COOKIE_EXPIRATION_DAYS = 1d
```

### API documentation

[Postman API Documentation](https://www.postman.com/sstechnology/workspace/mern-api-doc/collection/8195730-9e07f2f4-60b3-4597-8d61-1f4c7398d1c3?action=share&creator=8195730)
