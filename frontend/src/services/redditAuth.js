const REDDIT_CLIENT_ID = 'YOUR_CLIENT_ID';
const REDIRECT_URI = 'http://localhost:3000/reddit-callback';
const SCOPES = ['submit', 'identity'];

export const redditAuth = {
  login() {
    const authUrl = `https://www.reddit.com/api/v1/authorize?client_id=${REDDIT_CLIENT_ID}&response_type=code&state=random_string&redirect_uri=${REDIRECT_URI}&duration=temporary&scope=${SCOPES.join(' ')}`;
    window.location.href = authUrl;
  },

  async handleCallback(code) {
    try {
      const response = await fetch('https://www.reddit.com/api/v1/access_token', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(`${REDDIT_CLIENT_ID}:`)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: REDIRECT_URI,
        })
      });

      const data = await response.json();
      if (data.access_token) {
        localStorage.setItem('reddit_access_token', data.access_token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error getting access token:', error);
      return false;
    }
  },

  isAuthenticated() {
    return !!localStorage.getItem('reddit_access_token');
  },

  logout() {
    localStorage.removeItem('reddit_access_token');
  }
}; 