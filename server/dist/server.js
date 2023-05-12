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
// Routers
const usersRouter_1 = __importDefault(require("./routers/api/usersRouter"));
const chatsRouter_1 = __importDefault(require("./routers/chatsRouter"));
const messagesRouter_1 = __importDefault(require("./routers/api/messagesRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, db_1.default)();
// Init Middleware
app.use(express_1.default.json());
// Define Routes
app.use("/api/users", usersRouter_1.default);
app.use("/api/chats", chatsRouter_1.default);
app.use("/api/messages", messagesRouter_1.default);
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express_1.default.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, "client", "build", "index.html"));
    });
}
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
});
io.on("connection", (socket) => {
    console.log("Socket are in action");
    socket.on("setup");
});
