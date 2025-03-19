import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { redditAuth } from '../services/redditAuth';

const RedditCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      
      if (code) {
        const success = await redditAuth.handleCallback(code);
        if (success) {
          // Return to the game
          navigate('/');
        } else {
          alert('Failed to authenticate with Reddit');
          navigate('/');
        }
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-xl">Authenticating with Reddit...</p>
    </div>
  );
};

export default RedditCallback; 