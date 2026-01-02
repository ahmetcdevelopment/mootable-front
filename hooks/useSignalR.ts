import { useEffect, useCallback, useState } from 'react';
import signalRService from '@/services/signalrService';

interface UseSignalROptions {
  autoConnect?: boolean;
  channelId?: string;
}

interface SignalRMessage {
  id: string;
  content: string;
  authorId: string;
  authorUsername: string;
  authorAvatarUrl?: string;
  channelId: string;
  replyToId?: string;
  createdAt: Date;
  type?: string;
}

export function useSignalR(options: UseSignalROptions = {}) {
  const { autoConnect = true, channelId } = options;
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [typingUsers, setTypingUsers] = useState<Map<string, string>>(new Map());

  // Connect to SignalR
  useEffect(() => {
    let mounted = true;

    if (autoConnect && !signalRService.isConnected) {
      setIsConnecting(true);
      signalRService.connect()
        .then(() => {
          if (mounted) {
            setIsConnected(true);
            setIsConnecting(false);
          }
        })
        .catch((error) => {
          console.error('Failed to connect:', error);
          if (mounted) {
            setIsConnecting(false);
          }
        });
    } else if (signalRService.isConnected) {
      setIsConnected(true);
    }

    return () => {
      mounted = false;
    };
  }, [autoConnect]);

  // Join channel if provided
  useEffect(() => {
    if (isConnected && channelId) {
      signalRService.joinChannel(channelId)
        .catch((error) => {
          console.error('Failed to join channel:', error);
        });

      return () => {
        signalRService.leaveChannel()
          .catch((error) => {
            console.error('Failed to leave channel:', error);
          });
      };
    }
  }, [isConnected, channelId]);

  // Message handlers
  const sendMessage = useCallback(async (content: string, replyToId?: string) => {
    try {
      await signalRService.sendMessage(content, replyToId);
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  }, []);

  const editMessage = useCallback(async (messageId: string, newContent: string) => {
    try {
      await signalRService.editMessage(messageId, newContent);
    } catch (error) {
      console.error('Failed to edit message:', error);
      throw error;
    }
  }, []);

  const deleteMessage = useCallback(async (messageId: string) => {
    try {
      await signalRService.deleteMessage(messageId);
    } catch (error) {
      console.error('Failed to delete message:', error);
      throw error;
    }
  }, []);

  const reactToMessage = useCallback(async (messageId: string, reactionType: string) => {
    try {
      await signalRService.reactToMessage(messageId, reactionType);
    } catch (error) {
      console.error('Failed to react to message:', error);
      throw error;
    }
  }, []);

  // Typing indicators
  const startTyping = useCallback(async () => {
    try {
      await signalRService.startTyping();
    } catch (error) {
      console.error('Failed to send typing indicator:', error);
    }
  }, []);

  const stopTyping = useCallback(async () => {
    try {
      await signalRService.stopTyping();
    } catch (error) {
      console.error('Failed to stop typing indicator:', error);
    }
  }, []);

  // Event handler registration
  const onMessage = useCallback((handler: (message: SignalRMessage) => void) => {
    signalRService.on('ReceiveMessage', handler);
    return () => signalRService.off('ReceiveMessage', handler);
  }, []);

  const onMessageEdited = useCallback((handler: (data: any) => void) => {
    signalRService.on('MessageEdited', handler);
    return () => signalRService.off('MessageEdited', handler);
  }, []);

  const onMessageDeleted = useCallback((handler: (data: any) => void) => {
    signalRService.on('MessageDeleted', handler);
    return () => signalRService.off('MessageDeleted', handler);
  }, []);

  const onUserJoined = useCallback((handler: (data: any) => void) => {
    signalRService.on('UserJoinedChannel', handler);
    return () => signalRService.off('UserJoinedChannel', handler);
  }, []);

  const onUserLeft = useCallback((handler: (data: any) => void) => {
    signalRService.on('UserLeftChannel', handler);
    return () => signalRService.off('UserLeftChannel', handler);
  }, []);

  const onUserTyping = useCallback((handler: (data: any) => void) => {
    const wrappedHandler = (data: any) => {
      setTypingUsers(prev => {
        const newMap = new Map(prev);
        if (data.isTyping) {
          newMap.set(data.userId, data.username);
        } else {
          newMap.delete(data.userId);
        }
        return newMap;
      });
      handler(data);
    };

    signalRService.on('UserTyping', wrappedHandler);
    return () => signalRService.off('UserTyping', wrappedHandler);
  }, []);

  const onReactionAdded = useCallback((handler: (data: any) => void) => {
    signalRService.on('ReactionAdded', handler);
    return () => signalRService.off('ReactionAdded', handler);
  }, []);

  const onReactionRemoved = useCallback((handler: (data: any) => void) => {
    signalRService.on('ReactionRemoved', handler);
    return () => signalRService.off('ReactionRemoved', handler);
  }, []);

  const onError = useCallback((handler: (error: any) => void) => {
    signalRService.on('Error', handler);
    return () => signalRService.off('Error', handler);
  }, []);

  return {
    isConnected,
    isConnecting,
    typingUsers: Array.from(typingUsers.values()),
    sendMessage,
    editMessage,
    deleteMessage,
    reactToMessage,
    startTyping,
    stopTyping,
    onMessage,
    onMessageEdited,
    onMessageDeleted,
    onUserJoined,
    onUserLeft,
    onUserTyping,
    onReactionAdded,
    onReactionRemoved,
    onError
  };
}