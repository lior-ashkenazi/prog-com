import express, { Express, Request, Response } from "express";
import connectDB from "./config/db";
import dotenv from "dotenv";
import path from "path";

import { Server } from "socket.io";

// Interfaces
import { IUser } from "./models/userModel";

// Error handling
import { errorHandler, notFound } from "./middleware/errorMiddleware";

// Routes
import usersRouter from "./routes/usersRoutes";
import chatsRouter from "./routes/chatsRoutes";
import messagesRouter from "./routes/messagesRoutes";

dotenv.config();

const app: Express = express();

connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use("/api/users", usersRouter);
app.use("/api/chats", chatsRouter);
app.use("/api/messages", messagesRouter);

const __dirname$ = path.resolve();
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname$, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname$, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.status(200).json({
      message: "ProgCom server has been rolled up",
    });
  });
}

const PORT = process.env.PORT || 5000;

app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Socket is in action");

  // Setup on
  socket.on("setup", (user: IUser) => {
    socket.join(user._id);
    console.log(user.userName, "USER CONNECTED");
    socket.emit("connected");
  });

  // Join chat
  socket.on("access chat", (chat) => {
    socket.join(chat);
    console.log(`User accessed chat ${chat}`);
  });

  // Send new message
  socket.on("send message", (newMessage) => {
    // chatId after population in route
    // is an OBJECT rather than ObjectId!
    let chat = newMessage.chatId;
    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user: IUser) => {
      if (user._id === newMessage.sender) return;
      socket.in(user._id).emit("message received", newMessage);
    });

    // Start typing
    socket.on("start typing", (chat) => {
      socket.in(chat).emit("start typing");
    });

    // Stop typing
    socket.on("stop typing", (chat) => {
      socket.in(chat).emit("stop typing");
    });
  });

  socket.off("setup", (user: IUser) => {
    console.log("USER DISCONNECTED");
    socket.leave(user._id);
  });
});
