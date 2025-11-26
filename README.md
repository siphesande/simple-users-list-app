Readme · MD
Copy

# simple-users-list-app

A full-stack demo application consisting of:

**Express.js backend** (simple-users-list-backend)

- Provides a simple REST API to create, list, and delete users
- Supports both in-memory storage and MongoDB repository

**Vue.js frontend** (frontend-simple-users)

- Simple UI to add, list, and delete users

This project demonstrates how to build a clean, modular REST API where the data source can be swapped out without modifying the route handlers or business logic.

## Features

### Backend (Express.js)

- Create a new user
- Delete an existing user
- List all registered users
- Switch between **InMemoryUserRepo** and **MongoUserRepo**
- CORS enabled
- Simple, easy-to-understand file structure

### Frontend (Vue 3 + Vite)

- Displays a list of users
- Add a user (name + email)
- Delete individual users
- Shows a message if no users exist
- Centered UI for clean layout

## Project Structure

```
simple-users-list-app/
 ┣ frontend-simple-users/        # Vue.js frontend
 ┗ simple-users-list-backend/    # Express.js backend
```

## Installation & Setup

### Clone the Repository

```bash
git clone https://github.com/siphesande/simple-users-list-app.git
cd simple-users-list-app
docker-compose up --build
```

### Backend Setup (Express.js)

The backend runs at: **http://localhost:3000**

#### Optional: Use MongoDB Instead of In-Memory Storage

If you added **MongoUserRepo.js**, open:

```
routes/users.js
```

**Switch this line:**

```javascript
const UserRepo = require("./repo/InMemoryUserRepo");
```

**To:**

```javascript
const UserRepo = require("./repo/MongoUserRepo");
```



The frontend runs at: **http://localhost:5173**

## Connecting Frontend + Backend

The frontend communicates with: **http://localhost:3000/users**

CORS is enabled in the backend, so everything works together out of the box.

## API Endpoints

### GET /users

Returns all users.

### POST /users

**Example request body:**

```json
{
  "name": "",
  "email": ""
}
```

Creates a new user.

### DELETE /users/:id

Deletes a user by **ID**.
