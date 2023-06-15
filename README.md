# ProgCom #
* ***Live Demo***: https://progcom.onrender.com/

![image](https://github.com/lior-ashkenazi/progcom/assets/72506071/cc69932c-b523-44ba-88db-9b95a5e0af27)

A MERN stack chat app - written in TypeScript using Socket.IO - designed for programmers where users can chat with each other and in groups with the built-in features of sharing LaTeX-rendered math expressions and code snippets with syntax highlighting.

## Features ##
### Server ###
* MongoDB database for CRUD operations done with Mongoose
* RESTful API server with Express
* Socket.IO server that sets up several event handlers for WebSocket connections
* JWT Authentication for private routing with jsonwebtoken
* Secure password hashing with bcrypt
* Validating HTTP requests to server with express-validator
* Handling errors with error middleware using express-async-handler
* Google 0Auth support with google-auth-library

### Client ###
* Deployment with Vite
* Redux Toolkit and Redux Toolkit Query for managing global states and communicating with server
* Socket.IO for establishing socket connections in order to trigger and handle events for real-time chats and nofitications
* LaTeX-rendered math expressions in chat implemented with react-mathquill (wrapper for MathQuill)
* Code snippets in chat implemeneted with @uiw/react-codemirror (wrapper for CodeMirror) giving programming interface with syntax highlighting of 13 programming langugaes
* Forms done with Zod including validation
* Google 0Auth support with react-oauth
* CSS done with Tailwind CSS

## Usage ## 
First, create a MongoDB database and obtain a `MongoDB URI`. Also, for 0Auth support, reach Google Cloud Platform for the necessary credentials (not mandatory).
### Environment Variables ###
* Create `.env` file in the root folder and add the following:
```NODE_ENV=development
MONGO_URI=`your_mongo_uri`
PORT=5000
JWT_SECRET=`your_jwt_secret`
GOOGLE_CLIENT_ID=`your_google_client_id`
GOOGLE_CLIENT_SECRET=`your_google_client_secret`
  ```
* Create `.env` file in the client's root folder and add the following:
```VITE_NODE_ENV=development
VITE_ENDPOINT=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=`your_google_client_id`
VITE_GOOGLE_CLIENT_SECRET=`your_google_client_secret`
  ```
### Install Dependencies ###
```
# Run client (:3000) & server (:5000)
npm run dev
```
### Build & Deploy ###
```
cd .\client
npm run build
```
