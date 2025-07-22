# React-Node TodoList with Cypress Tests

A full-stack TodoList application built with React frontend, Node.js backend, and comprehensive testing suite including Cypress tests.

## How to Run

### Backend Setup
1. Clone the repository
2. Run `npm install` to install the Node.js backend dependencies
3. Run `npm start` to start the server

### Frontend Setup
1. Navigate to the frontend directory: `cd todofrontend`
2. Install frontend dependencies: `npm install`
3. Start the development server: `npm run dev`

### Login Credentials
Use these credentials to access the frontend:
- **Username:** `admin`
- **Password:** `password123`

## API Testing

### Running API Tests with Newman
1. Install Newman globally: `npm install -g newman`
2. Run the API collection: `newman run collection.json`

### Alternative: Using Postman
Import the `collection.json` file into Postman and run the tests from the Postman interface.

## Project Structure
- **Backend:** Node.js server
- **Frontend:** React application (located in `todofrontend/` directory)
- **Testing:** Cypress tests and Postman/Newman API collection