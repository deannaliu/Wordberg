import React from 'react';

const ShareToRedditButton = ({ gameResult, players, scores }) => {
  const handleShare = async (context) => {
    try {
      const currentSubreddit = await context.reddit.getCurrentSubreddit();
      
      // Submit the interactive post
      await context.reddit.submitPost({
        title: `IceBerg Game Result: ${gameResult}`,
        subredditName: currentSubreddit.name,
        preview: (
          <vstack>
            <text>Loading game results...</text>
          </vstack>
        ),
        // Pass the game data
        postData: {
          players,
          scores,
          gameResult
        }
      });

      context.ui.showToast('Successfully shared to Reddit!');
    } catch (error) {
      console.error('Error sharing to Reddit:', error);
      context.ui.showToast('Failed to share. Please try again.');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="bg-orange-500 text-white px-6 py-3 rounded-lg text-xl font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 min-w-[200px]"
    >
      <img 
        src="/reddit-logo.svg"
        alt="Reddit Logo" 
        width="16" 
        height="16" 
        className="inline-block object-contain"
      />
      Share to Reddit
    </button>
  );
};

export default ShareToRedditButton; 