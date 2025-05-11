import { Server as HTTPServer } from "http";
import { Server } from "socket.io";

export function initSocketIO(server: HTTPServer) {
  const io = new Server(server, {
    cors: {
      origin: "*", // Adjust the CORS settings for production
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 New Socket.IO connection");

    // Listen for messages from clients
    socket.on("message", (message) => {
      console.log("📨 Received:", message);

      // Broadcast the message to all clients except the sender
      socket.broadcast.emit("message", {
        id: Date.now().toString(),
        content: message.content,
        sender: message.sender === "user" ? "admin" : "user",
        timestamp: new Date(),
      });
    });

    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected");
    });
  });

  console.log("✅ Socket.IO server initialized");
}
