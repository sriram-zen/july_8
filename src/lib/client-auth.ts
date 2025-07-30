// Client-side authentication helpers

export const clientAuth = {
  async signIn(username: string, password: string) {
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Client signin error:', error);
      return { success: false, error: 'Network error occurred' };
    }
  },
  
  async signOut() {
    try {
      const response = await fetch('/api/auth/signout', {
        method: 'POST',
      });
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Client signout error:', error);
      return { success: false, error: 'Network error occurred' };
    }
  },
  
  async checkAuth() {
    try {
      const response = await fetch('/api/check-simple-auth');
      const result = await response.json();
      return result.authenticated;
    } catch (error) {
      console.error('Client auth check error:', error);
      return false;
    }
  }
};