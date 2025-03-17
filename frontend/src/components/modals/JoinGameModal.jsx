import React from 'react';
import NameInput from './NameInput.jsx';

const JoinGameModal = ({ players, setRoomCode, setShowModal, generatePenguinName }) => (
  <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
    <h2 className="text-xl font-bold mb-4">Join Game</h2>
    <input
      type="text"
      placeholder="Enter Room Code"
      className="w-full border p-2 rounded mb-4"
      onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
    />
    <NameInput 
      defaultName={players.player2.name}
      onSubmit={(name) => {
        setShowModal(false);
      }}
      onGenerateNew={generatePenguinName}
    />
  </div>
);

export default JoinGameModal;