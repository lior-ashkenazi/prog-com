"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const socket_io_1 = require("socket.io");
// Error handling
const errorMiddleware_1 = require("./middleware/errorMiddleware");
// Routes
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const chatsRoutes_1 = __importDefault(require("./routes/chatsRoutes"));
const messagesRoutes_1 = __importDefault(require("./routes/messagesRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, db_1.default)();
// Init Middleware
app.use(express_1.default.json());
// Define Routes
app.use("/api/users", usersRoutes_1.default);
app.use("/api/chats", chatsRoutes_1.default);
app.use("/api/messages", messagesRoutes_1.default);
const __dirname$ = path_1.default.resolve();
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express_1.default.static(path_1.default.join(__dirname$, "/client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname$, "client", "build", "index.html"));
    });
}
const PORT = process.env.PORT || 5000;
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
});
io.on("connection", (socket) => {
    console.log("Socket are in action");
    // Setup on
    socket.on("setup", (user) => {
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
        if (!chat.users)
            return console.log("chat.users not defined");
        chat.users.forEach((user) => {
            if (user._id === newMessage.sender)
                return;
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
    socket.off("setup", (user) => {
        console.log("USER DISCONNECTED");
        socket.leave(user);
    });
});
