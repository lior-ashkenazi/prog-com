# ProgCom #
* ***Live Demo***: https://progcom.onrender.com/

![image](https://github.com/lior-ashkenazi/progcom/assets/72506071/cc69932c-b523-44ba-88db-9b95a5e0af27)
![image](https://github.com/lior-ashkenazi/progcom/assets/72506071/de22f93a-4629-4cb8-b1fe-1855b554bfae)
![image](https://github.com/lior-ashkenazi/progcom/assets/72506071/cb034661-98b4-494e-abaf-ff711e9067c7)
![image](https://github.com/lior-ashkenazi/progcom/assets/72506071/a6544a35-602c-48f5-8d6c-d3f1e69d509c)
![image](https://github.com/lior-ashkenazi/progcom/assets/72506071/20011636-4a3c-4658-a6c4-ee5a25559420)
![image](https://github.com/lior-ashkenazi/progcom/assets/72506071/bcd8f48b-45f8-4237-8ff7-be25ffe050c5)
![image](https://github.com/lior-ashkenazi/progcom/assets/72506071/9919e8ae-6f1b-4909-a299-28e682391dc1)

A MERN stack chat app - written in TypeScript using Socket.IO - designed for programmers where users can chat with each other one-on-one and in groups with the built-in features of sharing LaTeX-rendered math expressions and code snippets with syntax highlighting.

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
* React Router for routing
* LaTeX-rendered math expressions in chat implemented with react-mathquill (wrapper for MathQuill)
* Code snippets in chat implemented with @uiw/react-codemirror (wrapper for CodeMirror) giving programming interface with syntax highlighting of 13 programming languages
* Forms done with Zod including validation
* Message dates are rendered with the help of Day.js
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
