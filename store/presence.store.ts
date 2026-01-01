import { create } from "zustand";

/**
 * Presence (online/offline) state yönetimi.
 * 
 * NEDEN AYRI STORE:
 * Presence data yüksek frekanslı güncellenir.
 * Auth store ile birleştirmek = gereksiz re-render.
 * 
 * PRODUCTION DENEYİMİ:
 * Discord benzeri sistemde presence updates:
 * - 1000 user online = saniyede 10-20 update
 * - Global store = tüm component re-render
 * - Ayrı store + selective subscription = sadece ilgili component re-render
 * 
 * TYPING INDICATOR:
 * 3 saniye timeout sonra otomatik temizlenir.
 * User yazmayı bıraktığında explicit olarak da temizlenir.
 */

export type UserStatus = "online" | "away" | "dnd" | "offline";

export interface PresenceUser {
  userId: string;
  username: string;
  avatarUrl?: string;
  status: UserStatus;
  lastSeen?: Date;
}

export interface TypingUser {
  userId: string;
  username: string;
  channelId: string;
  startedAt: Date;
}

interface PresenceState {
  onlineUsers: Map<string, PresenceUser>;
  typingUsers: Map<string, TypingUser>;
  
  setUserOnline: (user: PresenceUser) => void;
  setUserOffline: (userId: string) => void;
  updateUserStatus: (userId: string, status: UserStatus) => void;
  setTyping: (user: TypingUser) => void;
  clearTyping: (userId: string, channelId: string) => void;
  clearAllTypingInChannel: (channelId: string) => void;
  getOnlineUsersInServer: (serverMemberIds: string[]) => PresenceUser[];
  getTypingUsersInChannel: (channelId: string) => TypingUser[];
}

export const usePresenceStore = create<PresenceState>((set, get) => ({
  onlineUsers: new Map(),
  typingUsers: new Map(),

  setUserOnline: (user) =>
    set((state) => {
      const newMap = new Map(state.onlineUsers);
      newMap.set(user.userId, user);
      return { onlineUsers: newMap };
    }),

  setUserOffline: (userId) =>
    set((state) => {
      const newMap = new Map(state.onlineUsers);
      newMap.delete(userId);
      return { onlineUsers: newMap };
    }),

  updateUserStatus: (userId, status) =>
    set((state) => {
      const newMap = new Map(state.onlineUsers);
      const user = newMap.get(userId);
      if (user) {
        newMap.set(userId, { ...user, status });
      }
      return { onlineUsers: newMap };
    }),

  setTyping: (user) =>
    set((state) => {
      const key = `${user.userId}:${user.channelId}`;
      const newMap = new Map(state.typingUsers);
      newMap.set(key, user);
      return { typingUsers: newMap };
    }),

  clearTyping: (userId, channelId) =>
    set((state) => {
      const key = `${userId}:${channelId}`;
      const newMap = new Map(state.typingUsers);
      newMap.delete(key);
      return { typingUsers: newMap };
    }),

  clearAllTypingInChannel: (channelId) =>
    set((state) => {
      const newMap = new Map(state.typingUsers);
      for (const [key] of newMap) {
        if (key.endsWith(`:${channelId}`)) {
          newMap.delete(key);
        }
      }
      return { typingUsers: newMap };
    }),

  getOnlineUsersInServer: (serverMemberIds) => {
    const { onlineUsers } = get();
    return serverMemberIds
      .map((id) => onlineUsers.get(id))
      .filter((user): user is PresenceUser => user !== undefined);
  },

  getTypingUsersInChannel: (channelId) => {
    const { typingUsers } = get();
    return Array.from(typingUsers.values()).filter(
      (user) => user.channelId === channelId
    );
  },
}));
