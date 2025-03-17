const Player = ({ player, isCurrentPlayer }) => {
  const letterCount = player.selectedLetters.length;
  const remainingLetters = 7 - letterCount;

  return (
    <div className={`player ${isCurrentPlayer ? 'current-player' : ''}`}>
      <h2>{player.name}</h2>
      <div className="selected-letters">
        {player.selectedLetters.join(' ')}
      </div>
      <div className="letter-count">
        {remainingLetters > 0 
          ? `Letters remaining: ${remainingLetters}`
          : "Maximum letters reached!"}
      </div>
    </div>
  );
};

export default Player; 