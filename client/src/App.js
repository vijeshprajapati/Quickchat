import { useState } from "react";
import "./App.css";
import Chat from "./Chat.js";
import io from "socket.io-client";

const socket = io.connect("quickchat-production-2c39.up.railway.app");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setshowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setshowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
      <div className="joinChatContainer">
        <h3>Join a chat</h3>
        <input
          type="text"
          placeholder="Username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Room ID"
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        />
        <button onClick={joinRoom}>Join</button>
      </div>
      )
      :(
      <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
