// Simple in-memory session store for development/testing
// In production, this could be replaced with Redis or database storage

interface Session {
  id: string;
  userId: string;
  createdAt: Date;
  expiresAt: Date;
}

class SessionStore {
  private sessions: Map<string, Session> = new Map();
  
  createSession(userId: string): string {
    const sessionId = this.generateSessionId();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 days
    
    const session: Session = {
      id: sessionId,
      userId,
      createdAt: now,
      expiresAt
    };
    
    this.sessions.set(sessionId, session);
    
    // Clean up expired sessions
    this.cleanupExpiredSessions();
    
    return sessionId;
  }
  
  getSession(sessionId: string): Session | null {
    const session = this.sessions.get(sessionId);
    
    if (!session) {
      return null;
    }
    
    if (session.expiresAt < new Date()) {
      this.sessions.delete(sessionId);
      return null;
    }
    
    return session;
  }
  
  deleteSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }
  
  private generateSessionId(): string {
    return 'admin_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
  
  private cleanupExpiredSessions(): void {
    const now = new Date();
    for (const [sessionId, session] of this.sessions.entries()) {
      if (session.expiresAt < now) {
        this.sessions.delete(sessionId);
      }
    }
  }
}

// Export a singleton instance
export const sessionStore = new SessionStore();