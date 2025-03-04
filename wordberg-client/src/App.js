import React from "react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Button } from "./components/ui/button";

const socket = io("http://localhost:3000");

export default function WordbergGame() {
  const [gameId, setGameId] = useState("");
  const [board, setBoard] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socket.on("connect", () => setConnected(true));
    socket.on("startGame", (gameData) => {
      setBoard(gameData.board);
    });
    socket.on("updateBoard", (updatedBoard) => {
      setBoard(updatedBoard);
    });
    return () => {
      socket.off("connect");
      socket.off("startGame");
      socket.off("updateBoard");
    };
  }, []);

  const createGame = () => {
    const newGameId = Math.random().toString(36).substr(2, 5);
    setGameId(newGameId);
    socket.emit("createGame", newGameId);
  };

  const joinGame = () => {
    if (gameId) {
      socket.emit("joinGame", gameId);
    }
  };

  const removeHexagon = (hexId) => {
    socket.emit("removeHexagon", { gameId, hexId });
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold">Wordberg</h1>
      {!connected && <p>Connecting to server...</p>}
      <div className="mt-4">
        <Button onClick={createGame}>Create Game</Button>
        <input
          className="border p-2 mx-2"
          type="text"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
          placeholder="Enter Game ID"
        />
        <Button onClick={joinGame}>Join Game</Button>
      </div>
      <div className="grid grid-cols-6 gap-2 mt-6">
        {board.map((hex) => (
          <div
            key={hex.id}
            className="w-12 h-12 bg-blue-300 flex items-center justify-center cursor-pointer"
            onClick={() => removeHexagon(hex.id)}
          >
            {hex.letter}
          </div>
        ))}
      </div>
    </div>
  );
}
