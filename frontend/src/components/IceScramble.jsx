import React, { useState } from 'react';

const IceScramble = ({ players }) => {
  // State for each player's word input
  const [player1Word, setPlayer1Word] = useState('');
  const [player2Word, setPlayer2Word] = useState('');
  // State for each player's score
  const [scores, setScores] = useState({
    player1: 0,
    player2: 0
  });
  // State for validation messages
  const [messages, setMessages] = useState({
    player1: '',
    player2: ''
  });
  // State for word history
  const [wordHistory, setWordHistory] = useState({
    player1: [],
    player2: []
  });
  // Add new state to track which specific letter instances are used
  const [usedLetterIndices, setUsedLetterIndices] = useState({
    player1: new Set(),
    player2: new Set()
  });

  // Function to check if a word is valid using the dictionary API
  const checkWord = async (word) => {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      return response.ok;
    } catch (error) {
      console.error('Error checking word:', error);
      return false;
    }
  };

  // Function to calculate word score
  const calculateScore = (word) => {
    return word.length * 10;
  };

  // Function to handle word submission
  const handleSubmit = async (player, word, setWord, setMessage) => {
    // Get the player's collected letters
    const playerLetters = players[player].selectedLetters.map(item => item.letter);
    
    // Check if the word uses only collected letters
    const wordLetters = word.split('').map(letter => letter.toUpperCase());
    const isValidLetters = wordLetters.every(letter => 
      playerLetters.includes(letter)
    );

    if (!isValidLetters) {
      setMessage('You can only use your collected letters!');
      return;
    }

    // Check if the word is valid using the dictionary API
    const isValidWord = await checkWord(word);
    
    if (isValidWord) {
      const score = calculateScore(word);
      setScores(prev => ({
        ...prev,
        [player]: prev[player] + score
      }));
      setMessage(`Valid word! +${score} points!`);
      // Add word to history
      setWordHistory(prev => ({
        ...prev,
        [player]: [...prev[player], { word, score }]
      }));
      setWord(''); // Clear input after successful submission
    } else {
      setMessage('Not a valid word!');
    }
  };

  // Function to count available letters
  const getAvailableLetterCount = (letter, selectedLetters, currentWord) => {
    const totalCount = selectedLetters.filter(item => item.letter === letter).length;
    const usedCount = currentWord.split('').filter(l => l === letter).length;
    return totalCount - usedCount;
  };

  // Function to check if a letter is available
  const isLetterAvailable = (letter, selectedLetters, currentWord) => {
    return getAvailableLetterCount(letter, selectedLetters, currentWord) > 0;
  };

  // Function to handle input changes
  const handleInputChange = (e, setWord, currentWord, selectedLetters, player) => {
    const newValue = e.target.value.toUpperCase();
    
    // If the new value is shorter than the current word, it's a deletion
    if (newValue.length < currentWord.length) {
      // Find the removed letter and remove its index from usedLetterIndices
      const removedLetter = currentWord.slice(newValue.length);
      const letterIndices = selectedLetters
        .map((item, index) => ({ letter: item.letter, index }))
        .filter(item => item.letter === removedLetter);
      
      // Remove the last used index for this letter
      const lastUsedIndex = Array.from(usedLetterIndices[player])
        .filter(index => selectedLetters[index].letter === removedLetter)
        .pop();
      
      if (lastUsedIndex !== undefined) {
        setUsedLetterIndices(prev => ({
          ...prev,
          [player]: new Set([...prev[player]].filter(i => i !== lastUsedIndex))
        }));
      }
      
      setWord(newValue);
      return;
    }
    
    // For additions, find an available instance of the letter
    const newLetter = newValue.slice(-1);
    const availableIndices = selectedLetters
      .map((item, index) => ({ letter: item.letter, index }))
      .filter(item => 
        item.letter === newLetter && 
        !usedLetterIndices[player].has(item.index)
      );
    
    if (availableIndices.length > 0) {
      // Use the first available instance
      setUsedLetterIndices(prev => ({
        ...prev,
        [player]: new Set([...prev[player], availableIndices[0].index])
      }));
      setWord(newValue);
    }
  };

  return (
    <div className="flex flex-row justify-between items-start gap-8 w-full px-8">
      {/* Player 1 Section - Left Side */}
      <div className="flex flex-col items-start gap-4 w-1/2">
        <h2 className="text-2xl font-bold text-blue-600">{players.player1.name}</h2>
        
        {/* Player 1 Penguin GIF */}
        <div className="mb-4">
          <img 
            src="https://media1.giphy.com/media/UMBtDBSWNNnbPk915D/giphy.gif" 
            alt="Player 1 Penguin"
            className="w-40 h-28 object-cover rounded-lg"
          />
        </div>

        <div className="text-lg font-bold">Score: {scores.player1}</div>
        
        {/* Container for word history, input, and letters */}
        <div className="w-fit">
          {/* Word History */}
          <div className="bg-blue-50 p-4 rounded-lg h-48 overflow-y-auto mb-4">
            <h3 className="font-semibold mb-2">Word History:</h3>
            <div className="space-y-2">
              {wordHistory.player1.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>{item.word}</span>
                  <span className="text-blue-600">+{item.score}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Input Section */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={player1Word}
              onChange={(e) => handleInputChange(e, setPlayer1Word, player1Word, players.player1.selectedLetters, 'player1')}
              className="flex-1 border p-2 rounded"
              placeholder="Enter a word"
            />
            <button
              onClick={() => handleSubmit('player1', player1Word, setPlayer1Word, 
                (msg) => setMessages(prev => ({ ...prev, player1: msg })))}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
          <div className="text-sm text-gray-600 mb-4">{messages.player1}</div>

          {/* Collected Letters */}
          <div className="flex flex-row gap-2">
            {players.player1.selectedLetters.map((item, index) => (
              <div 
                key={index} 
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold shadow-md
                  ${usedLetterIndices.player1.has(index)
                    ? 'bg-gray-200 text-gray-500' 
                    : 'bg-blue-100'}`}
              >
                {item.letter}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Player 2 Section - Right Side */}
      <div className="flex flex-col items-end gap-4 w-1/2">
        <h2 className="text-2xl font-bold text-pink-600">{players.player2.name}</h2>
        
        {/* Player 2 Penguin GIF */}
        <div className="mb-4">
          <img 
            src="https://i.pinimg.com/originals/d1/cc/b0/d1ccb027cb74358f8c5b5eff0d9c087d.gif" 
            alt="Player 2 Penguin"
            className="w-40 h-28 object-cover rounded-lg"
          />
        </div>

        <div className="text-lg font-bold">Score: {scores.player2}</div>
        
        {/* Container for word history, input, and letters */}
        <div className="w-fit">
          {/* Word History */}
          <div className="bg-pink-50 p-4 rounded-lg h-48 overflow-y-auto mb-4">
            <h3 className="font-semibold mb-2">Word History:</h3>
            <div className="space-y-2">
              {wordHistory.player2.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>{item.word}</span>
                  <span className="text-pink-600">+{item.score}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Input Section */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={player2Word}
              onChange={(e) => handleInputChange(e, setPlayer2Word, player2Word, players.player2.selectedLetters, 'player2')}
              className="flex-1 border p-2 rounded"
              placeholder="Enter a word"
            />
            <button
              onClick={() => handleSubmit('player2', player2Word, setPlayer2Word,
                (msg) => setMessages(prev => ({ ...prev, player2: msg })))}
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
            >
              Submit
            </button>
          </div>
          <div className="text-sm text-gray-600 mb-4">{messages.player2}</div>

          {/* Collected Letters */}
          <div className="flex flex-row gap-2">
            {players.player2.selectedLetters.map((item, index) => (
              <div 
                key={index} 
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold shadow-md
                  ${usedLetterIndices.player2.has(index)
                    ? 'bg-gray-200 text-gray-500' 
                    : 'bg-pink-100'}`}
              >
                {item.letter}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IceScramble; 