import React from 'react';
import NameInput from './NameInput.jsx';

const CreateGameModal = ({ players, setRoomCode, setShowModal, generatePenguinName, roomCode }) => (
  <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
    <h2 className="text-xl font-bold mb-4">Create New Game</h2>
    <NameInput 
      defaultName={players.player1.name}
      onSubmit={(name) => {
        const newRoomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        setRoomCode(newRoomCode);
        setShowModal(false);
      }}
      onGenerateNew={generatePenguinName}
    />
    {roomCode && (
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <p className="text-center">Share this code with player 2:</p>
        <p className="text-2xl font-bold text-center">{roomCode}</p>
      </div>
    )}
  </div>
);

export default CreateGameModal;