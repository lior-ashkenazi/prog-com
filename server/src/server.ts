import express, { Express, Request, Response } from "express";
import connectDB from "./config/db";
import dotenv from "dotenv";
import path from "path";

import { Server } from "socket.io";

// Interfaces
import { IUser } from "./models/userModel";
import { IMessage } from "./models/messageModel";
import { IChat } from "./models/chatModel";

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
  console.log("SOCKET IS IN ACTION");

  // Setup on
  socket.on("setup", (user: IUser) => {
    socket.join(user._id);
    console.log(user.userName, " CONNECTED");
    socket.emit("CONNECTED");
  });

  // Join chat
  socket.on("access chat", (chat: IChat) => {
    socket.join(chat._id);
    console.log(`USER ACCESSED CHAT ${chat._id}`);
  });

  // Send new message
  socket.on("new message", (chat, newMessage) => {
    // newMessage is a IMessage that is populated
    // so newMessage.chat is well defined

    if (!chat.participants) return console.log("chat.participants not defined");

    chat.participants.forEach((user: IUser) => {
      // if (user._id === newMessage.sender._id) return;
      socket.in(user._id).emit("message received", newMessage);
    });
  });

  // Start typing
  socket.on("typing", (chat, user) => {
    socket.in(chat._id).emit("typing", user);
  });

  // Stop typing
  socket.on("stop typing", (chat, user) => {
    socket.in(chat._id).emit("stop typing", user);
  });

  socket.off("setup", (user) => {
    console.log("USER DISCONNECTED");
    socket.leave(user._id);
  });
});
