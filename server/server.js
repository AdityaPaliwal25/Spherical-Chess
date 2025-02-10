import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import cors from 'cors'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }));


const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Vite's default port
    methods: ["GET", "POST"]
  }
});

// Serve static files from the dist directory after building
app.use(express.static(path.join(__dirname, '../dist')));


let connection_count=0;
let player_id_list=[]
//=============================================================================================
// The connection handler (remains the same)
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  player_id_list.push(socket.id);

  if(player_id_list.length==2){
    let My_Side=Math.floor(Math.random()*2 );
    io.to(player_id_list[0]).emit("Change_Camera", My_Side);
    if(My_Side==0){
      io.to(player_id_list[1]).emit("Change_Camera", 1);
    }else{
      io.to(player_id_list[1]).emit("Change_Camera", 0);
    }
  }
  

  socket.on("Player_Move", (moveinfo)=>{
    socket.broadcast.emit("Movement_info", (moveinfo));
  });

  
  //io.to(socket.id).emit("event", data);
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    io.emit('playerDisconnected', socket.id);

    let indx=player_id_list.indexOf(socket.id);
    player_id_list.splice(indx, 1);
  });
});
//=============================================================================================

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});