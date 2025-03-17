import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import { GameProvider } from './contexts/GameContext';
import GameContainer from './components/GameContainer';
// Temporarily comment out modal imports
/*
import GameModeSelect from './components/modals/GameModeSelect';
import CreateGameModal from './components/modals/CreateGameModal';
import JoinGameModal from './components/modals/JoinGameModal';
*/

const generatePenguinName = () => {
  const adjectives = ['Happy', 'Silly', 'Jumpy', 'Waddles', 'Chilly', 'Frosty', 'Fluffy', 'Snowy'];
  const nouns = ['Penguin', 'Flipper', 'Iceberg', 'Snowball', 'Fish', 'Diver', 'Swimmer'];
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}`;
};

const App = () => {
  // Set showModal to false by default temporarily
  const [showModal, setShowModal] = useState(false);
  const [gameMode, setGameMode] = useState(null);
  const [roomCode, setRoomCode] = useState(null);
  const [players, setPlayers] = useState({
    player1: { 
      name: generatePenguinName(), 
      isCurrentTurn: true,
      selectedLetters: [] 
    },
    player2: { 
      name: generatePenguinName(), 
      isCurrentTurn: false,
      selectedLetters: [] 
    }
  });

  return (
    <GameProvider>
      <div className="App">
        {/* Comment out modal section
        {showModal && (
          <div 
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{
              backgroundImage: "url('https://coolbackgrounds.io/images/backgrounds/blue/blue-trianglify-8e4a0501.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative z-10">
              {!gameMode && <GameModeSelect setGameMode={setGameMode} />}
              {gameMode === 'create' && (
                <CreateGameModal 
                  players={players}
                  setRoomCode={setRoomCode}
                  setShowModal={setShowModal}
                  generatePenguinName={generatePenguinName}
                  roomCode={roomCode}
                />
              )}
              {gameMode === 'join' && (
                <JoinGameModal 
                  players={players}
                  setRoomCode={setRoomCode}
                  setShowModal={setShowModal}
                  generatePenguinName={generatePenguinName}
                />
              )}
            </div>
          </div>
        )}
        */}
        
        <GameContainer 
          initialPlayers={players}
          setPlayers={setPlayers}
        />
      </div>
    </GameProvider>
  );
};

export default App;