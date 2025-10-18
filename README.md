# Task Management REST API

**Developer:** Krishna Naicker (@KrishnaNaicker)  
**Date:** October 18, 2025  

## 📋 Project Overview

A RESTful API for managing tasks built with Node.js, Express.js, and MongoDB. This API provides full CRUD (Create, Read, Update, Delete) operations with input validation, error handling, pagination, and sorting capabilities.

---

## ✨ Features

✅ **Create** new tasks with title, description, and status  
✅ **Read** all tasks or get a specific task by ID  
✅ **Update** task status or description  
✅ **Delete** tasks  
✅ **Input Validation** - Required fields and status enum validation  
✅ **Error Handling** - Invalid IDs, missing fields, not found errors  
✅ **Pagination** - Query parameters for page and limit  
✅ **Sorting** - Automatic sorting by creation date (newest first)  

---

## 🛠️ Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **dotenv** - Environment variables management
- **cors** - Cross-origin resource sharing

---

## 📁 Project Structure

```
task-management-api/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   └── taskController.js    # Business logic
├── models/
│   └── Task.js              # Task schema
├── routes/
│   └── taskRoutes.js        # API routes
├── .env                     # Environment variables
├── .gitignore               # Git ignore file
├── server.js                # Entry point
├── package.json             # Dependencies
└── README.md                # Documentation
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- Postman (for testing)

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/KrishnaNaicker/task-management-api.git
cd task-management-api
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file in root directory**
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
```

4. **Start the server**
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

5. **Server should be running**
```
🚀 Server running on port 5000
📍 API Base URL: http://localhost:5000
✅ MongoDB Connected Successfully
```

---

## 📡 API Endpoints

### Base URL
```
http://localhost:5000
```

### Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information |
| POST | `/tasks` | Create a new task |
| GET | `/tasks` | Get all tasks (with pagination) |
| GET | `/tasks/:id` | Get task by ID |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

---

### 1. Create a Task

**Request:**
```http
POST /tasks
Content-Type: application/json

{
  "title": "Complete API Assessment",
  "description": "Build Task Management REST API",
  "status": "in-progress"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "_id": "67xxxxxxxxxxxxx",
    "title": "Complete API Assessment",
    "description": "Build Task Management REST API",
    "status": "in-progress",
    "createdAt": "2025-10-18T07:00:00.000Z",
    "__v": 0
  }
}
```

---

### 2. Get All Tasks

**Request:**
```http
GET /tasks
```

**With Pagination:**
```http
GET /tasks?page=1&limit=5
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 5,
  "total": 10,
  "totalPages": 2,
  "currentPage": 1,
  "data": [
    {
      "_id": "67xxxxx",
      "title": "Complete API Assessment",
      "description": "Build Task Management REST API",
      "status": "in-progress",
      "createdAt": "2025-10-18T07:00:00.000Z",
      "__v": 0
    }
    // ... more tasks
  ]
}
```

**Note:** Tasks are automatically sorted by creation date (newest first).

---

### 3. Get Task by ID

**Request:**
```http
GET /tasks/67xxxxxxxxxxxxx
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "67xxxxxxxxxxxxx",
    "title": "Complete API Assessment",
    "description": "Build Task Management REST API",
    "status": "in-progress",
    "createdAt": "2025-10-18T07:00:00.000Z",
    "__v": 0
  }
}
```

---

### 4. Update a Task

**Request:**
```http
PUT /tasks/67xxxxxxxxxxxxx
Content-Type: application/json

{
  "status": "completed",
  "description": "Successfully completed the API!"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "67xxxxxxxxxxxxx",
    "title": "Complete API Assessment",
    "description": "Successfully completed the API!",
    "status": "completed",
    "createdAt": "2025-10-18T07:00:00.000Z",
    "__v": 0
  }
}
```

---

### 5. Delete a Task

**Request:**
```http
DELETE /tasks/67xxxxxxxxxxxxx
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": {
    "_id": "67xxxxxxxxxxxxx",
    "title": "Complete API Assessment",
    "description": "Successfully completed the API!",
    "status": "completed",
    "createdAt": "2025-10-18T07:00:00.000Z",
    "__v": 0
  }
}
```

---

## 🔍 Task Schema

```javascript
{
  title: String (required, max 100 characters),
  description: String (optional, max 500 characters),
  status: String (enum: ['pending', 'in-progress', 'completed'], default: 'pending'),
  createdAt: Date (default: current date)
}
```

---

## ⚠️ Error Handling

### Invalid Task ID
```json
{
  "error": "Invalid task ID format"
}
```

### Task Not Found
```json
{
  "error": "Task not found"
}
```

### Missing Required Field
```json
{
  "error": "Title is required"
}
```

### Invalid Status Value
```json
{
  "error": "Status must be pending, in-progress, or completed"
}
```

---

## 🧪 Testing with Postman

1. Import the collection or create requests manually
2. Test all endpoints with valid and invalid data
3. Verify error handling works correctly
4. Test pagination with different page and limit values
5. Verify sorting by creation date

---

## 📦 Dependencies

```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.0",
  "dotenv": "^16.3.1",
  "cors": "^2.8.5"
}
```

**Dev Dependencies:**
```json
{
  "nodemon": "^3.0.1"
}
```

---

## 🎯 Assessment Requirements Completed

✅ MongoDB database named `taskmanager`  
✅ Task model with all required fields  
✅ All 5 API routes implemented (POST, GET, GET by ID, PUT, DELETE)  
✅ Input validation (title required, status enum)  
✅ Error handling (invalid IDs, missing fields, not found)  
✅ Tested in Postman with screenshots  
✅ **BONUS:** Pagination implemented  
✅ **BONUS:** Sorting by creation date  

---

## 👨‍💻 Author

**Krishna Naicker**  
GitHub: [@KrishnaNaicker](https://github.com/KrishnaNaicker)

---

## 📄 License

This project is for assessment purposes.

---
**I am truly grateful for the opportunity to be considered for the next round and look forward to the possibility of contributing to the innovative work at **Spydarr Web Technologies**.

Thank you once again for this wonderful opportunity! 🙏**
