# WARNING : THE PROJECT STILL IN DEVELOPMENT SO BUGS AND INCOMPLETE FUNCTIONS STILL THERE 
# Fauna

Fauna is a full-stack web application built with **Vue.js** on the frontend and **Node.js** with **Express** on the backend. This project demonstrates modern full-stack development practices and is a starting point for scalable, production-ready applications.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Setup](#setup)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Overview

Fauna is designed to be a fully functional full-stack application that showcases key features such as user authentication, API integration, and responsive design. It is structured with modern development practices and easily scalable, providing a foundation for creating real-world applications.

## Tech Stack

- **Frontend:**
  - Vue.js
  - Vuex (for state management)
  - Vue Router
  - Axios (for API requests)
  - Toast (For notification)
 
  
- **Backend:**
  - Node.js
  - Express.js
  - MySQL
  - Prisma ORM
  - Bcrypt for Password Hashing
  - Multer and cloudinary for file uploader
  - JWT Authentication for user login
  - Cors 

- **Development Tools:**
  - Webpack
  - Babel
  - ESLint (for linting)
  - Nodemon (for automatic server restarts)
  - Prettier
## Features

- **User Authentication**: Secure login and signup with JWT tokens.
- **CRUD Operations**: Create, Read, Update, and Delete functionalities for managing data.
- **API Integration**: Seamless connection between the frontend and backend via REST APIs.
- **Responsive Design**: Mobile-friendly layout using modern CSS practices.
- **Authentication Middleware**: Ensures only authorized users can access certain API routes.
- **Error Handling**: Comprehensive error management and user-friendly error messages.

## Setup

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/khuongminhhuy1/Fauna.git
   cd fauna
2. Navigate to the frontend directory
3. Install the required dependency
4. Run the frontend Application

### Backend Setup
1. Navigate cd backend
2. npm install
3. Fill up .env (already included env.example file)
4. Run the server
