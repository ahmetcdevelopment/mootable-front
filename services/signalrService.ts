import * as signalR from '@microsoft/signalr';
import { useAuthStore } from '@/store/auth.store';

/**
 * SignalR Service - Real-time communication with Matrix Hub
 * Matrix theme: All connections are "jacking into the Matrix"
 */
class SignalRService {
  private connection: signalR.HubConnection | null = null;
  private isConnecting = false;
  private currentChannelId: string | null = null;

  /**
   * Initialize SignalR connection
   * Matrix theme: "Jack into the Matrix"
   */
  public async connect(): Promise<void> {
    if (this.connection || this.isConnecting) {
      return;
    }

    this.isConnecting = true;

    try {
      const token = useAuthStore.getState().accessToken;
      if (!token) {
        throw new Error('No access token available');
      }

      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(`${process.env.NEXT_PUBLIC_API_URL}/hubs/matrix`, {
          accessTokenFactory: () => token
        })
        .withAutomaticReconnect({
          nextRetryDelayInMilliseconds: retryContext => {
            if (retryContext.elapsedMilliseconds < 60000) {
              // Retry every 2 seconds for first minute
              return 2000;
            } else {
              // Then every 10 seconds
              return 10000;
            }
          }
        })
        .configureLogging(signalR.LogLevel.Information)
        .build();

      // Connection event handlers
      this.connection.onreconnecting(() => {
        console.log('Reconnecting to the Matrix...');
      });

      this.connection.onreconnected(() => {
        console.log('Reconnected to the Matrix');
        // Rejoin channel if was in one
        if (this.currentChannelId) {
          this.joinChannel(this.currentChannelId);
        }
      });

      this.connection.onclose(() => {
        console.log('Disconnected from the Matrix');
        this.connection = null;
        this.currentChannelId = null;
      });

      // Start connection
      await this.connection.start();
      console.log('Successfully jacked into the Matrix');

    } catch (error) {
      console.error('Failed to connect to the Matrix:', error);
      this.connection = null;
      throw error;
    } finally {
      this.isConnecting = false;
    }
  }

  /**
   * Disconnect from SignalR
   * Matrix theme: "Unplug from the Matrix"
   */
  public async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.stop();
      this.connection = null;
      this.currentChannelId = null;
      console.log('Unplugged from the Matrix');
    }
  }

  /**
   * Join a channel (MootTable)
   */
  public async joinChannel(channelId: string): Promise<void> {
    if (!this.connection) {
      throw new Error('Not connected to the Matrix');
    }

    try {
      await this.connection.invoke('JoinChannel', channelId);
      this.currentChannelId = channelId;
      console.log(`Connected to transmission deck: ${channelId}`);
    } catch (error) {
      console.error('Failed to join channel:', error);
      throw error;
    }
  }

  /**
   * Leave current channel
   */
  public async leaveChannel(): Promise<void> {
    if (!this.connection || !this.currentChannelId) {
      return;
    }

    try {
      await this.connection.invoke('LeaveChannel');
      console.log(`Disconnected from transmission deck: ${this.currentChannelId}`);
      this.currentChannelId = null;
    } catch (error) {
      console.error('Failed to leave channel:', error);
    }
  }

  /**
   * Send a message to current channel
   */
  public async sendMessage(content: string, replyToId?: string): Promise<void> {
    if (!this.connection) {
      throw new Error('Not connected to the Matrix');
    }

    if (!this.currentChannelId) {
      throw new Error('Not connected to any transmission deck');
    }

    try {
      await this.connection.invoke('SendMessage', content, replyToId);
    } catch (error) {
      console.error('Failed to transmit message:', error);
      throw error;
    }
  }

  /**
   * Edit a message
   */
  public async editMessage(messageId: string, newContent: string): Promise<void> {
    if (!this.connection) {
      throw new Error('Not connected to the Matrix');
    }

    try {
      await this.connection.invoke('EditMessage', messageId, newContent);
    } catch (error) {
      console.error('Failed to alter transmission:', error);
      throw error;
    }
  }

  /**
   * Delete a message
   */
  public async deleteMessage(messageId: string): Promise<void> {
    if (!this.connection) {
      throw new Error('Not connected to the Matrix');
    }

    try {
      await this.connection.invoke('DeleteMessage', messageId);
    } catch (error) {
      console.error('Failed to erase transmission:', error);
      throw error;
    }
  }

  /**
   * Send typing indicator
   */
  public async startTyping(): Promise<void> {
    if (!this.connection || !this.currentChannelId) {
      return;
    }

    try {
      await this.connection.invoke('StartTyping');
    } catch (error) {
      console.error('Failed to send typing indicator:', error);
    }
  }

  /**
   * Stop typing indicator
   */
  public async stopTyping(): Promise<void> {
    if (!this.connection || !this.currentChannelId) {
      return;
    }

    try {
      await this.connection.invoke('StopTyping');
    } catch (error) {
      console.error('Failed to stop typing indicator:', error);
    }
  }

  /**
   * React to a message
   */
  public async reactToMessage(messageId: string, reactionType: string): Promise<void> {
    if (!this.connection) {
      throw new Error('Not connected to the Matrix');
    }

    try {
      await this.connection.invoke('ReactToMessage', messageId, reactionType);
    } catch (error) {
      console.error('Failed to react to transmission:', error);
      throw error;
    }
  }

  /**
   * Get online users in channel
   */
  public async getChannelUsers(channelId: string): Promise<any[]> {
    if (!this.connection) {
      throw new Error('Not connected to the Matrix');
    }

    try {
      return await this.connection.invoke('GetChannelUsers', channelId);
    } catch (error) {
      console.error('Failed to get channel users:', error);
      throw error;
    }
  }

  // Event listeners
  public on(eventName: string, callback: (...args: any[]) => void): void {
    if (!this.connection) {
      console.warn('Cannot register event - not connected to the Matrix');
      return;
    }

    this.connection.on(eventName, callback);
  }

  public off(eventName: string, callback?: (...args: any[]) => void): void {
    if (!this.connection) {
      return;
    }

    if (callback) {
      this.connection.off(eventName, callback);
    } else {
      this.connection.off(eventName);
    }
  }

  // Connection state
  public get isConnected(): boolean {
    return this.connection?.state === signalR.HubConnectionState.Connected;
  }

  public get connectionState(): signalR.HubConnectionState | null {
    return this.connection?.state ?? null;
  }

  public get channelId(): string | null {
    return this.currentChannelId;
  }
}

// Singleton instance
const signalRService = new SignalRService();

// Auto-connect when user logs in
useAuthStore.subscribe((state) => {
  if (state.isAuthenticated && !signalRService.isConnected) {
    signalRService.connect().catch(console.error);
  } else if (!state.isAuthenticated && signalRService.isConnected) {
    signalRService.disconnect().catch(console.error);
  }
});

export default signalRService;