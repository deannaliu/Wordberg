import React from 'react';

// Define the custom post type for our game
Devvit.addCustomPostType({
  name: 'IceBerg Game Results',
  description: 'Share your IceBerg word game results!',
  render: ({ players, scores, gameResult }) => {
    return (
      <blocks height="regular">
        <vstack alignment="center middle">
          <text style="heading" size="xxlarge">
            🧊 IceBerg Game Results 🧊
          </text>
          
          <text style="heading" size="xlarge">
            {gameResult}
          </text>
          
          <vstack padding="medium" gap="small">
            <text style="body" size="large" color="blue">
              {players.player1.name}: {scores.player1} points
            </text>
            <text style="body" size="large" color="pink">
              {players.player2.name}: {scores.player2} points
            </text>
          </vstack>
          
          <button 
            icon="game_controller" 
            appearance="primary"
            onPress={() => {
              // Add link to play the game
              window.location.href = "YOUR_GAME_URL";
            }}
          >
            Play IceBerg
          </button>
        </vstack>
      </blocks>
    );
  },
}); 