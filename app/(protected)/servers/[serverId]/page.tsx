'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useServerStore } from '@/store/serverStore';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import {
  Hash,
  Volume2,
  Settings,
  Plus,
  Send,
  Users,
  ChevronRight,
  Terminal,
  Radio,
  Megaphone,
  LogOut,
  Copy,
  Zap
} from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import { MootTableType } from '@/types/server.types';

// Mock message type until we create proper types
interface Message {
  id: string;
  content: string;
  authorId: string;
  authorUsername: string;
  authorAvatarUrl?: string;
  createdAt: string;
  isEdited: boolean;
  isPinned: boolean;
  reactionCount: number;
  replyToId?: string;
}

export default function ServerDetailPage() {
  const params = useParams();
  const serverId = params.serverId as string;

  const {
    currentServer,
    currentChannels,
    currentMembers,
    fetchServerById,
    createChannel,
    leaveServer
  } = useServerStore();

  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');
  const [newChannelType, setNewChannelType] = useState<MootTableType>(MootTableType.Text);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (serverId) {
      fetchServerById(serverId);
    }
  }, [serverId, fetchServerById]);

  useEffect(() => {
    // Select first channel when channels load
    if (currentChannels.length > 0 && !selectedChannelId) {
      setSelectedChannelId(currentChannels[0].id);
    }
  }, [currentChannels, selectedChannelId]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChannelId) return;

    // Mock message send - will be replaced with real API
    const mockMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      authorId: 'current-user',
      authorUsername: 'Neo',
      createdAt: new Date().toISOString(),
      isEdited: false,
      isPinned: false,
      reactionCount: 0
    };

    setMessages([...messages, mockMessage]);
    setNewMessage('');
  };

  const handleCreateChannel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChannelName.trim()) return;

    const success = await createChannel(serverId, {
      name: newChannelName.toLowerCase().replace(/\s+/g, '-'),
      type: newChannelType
    });

    if (success) {
      setShowCreateChannel(false);
      setNewChannelName('');
    }
  };

  const handleLeaveServer = async () => {
    if (confirm('Are you sure you want to abandon this ship?')) {
      const success = await leaveServer(serverId);
      if (success) {
        window.location.href = '/servers';
      }
    }
  };

  const getChannelIcon = (type: MootTableType) => {
    switch (type) {
      case MootTableType.Voice:
        return <Volume2 className="w-4 h-4" />;
      case MootTableType.Announcement:
        return <Megaphone className="w-4 h-4" />;
      default:
        return <Hash className="w-4 h-4" />;
    }
  };

  if (!currentServer) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-green-600 font-mono">Loading ship systems...</p>
        </div>
      </div>
    );
  }

  const selectedChannel = currentChannels.find(c => c.id === selectedChannelId);

  return (
    <div className="min-h-screen bg-black flex">
      {/* Matrix background effect */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 50px,
            #00ff00 50px,
            #00ff00 51px
          )`,
        }} />
      </div>

      {/* Sidebar - Server Info & Channels */}
      <aside className="w-64 bg-black/50 border-r border-green-900/30 flex flex-col">
        {/* Server Header */}
        <div className="p-4 border-b border-green-900/30">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-green-400 font-mono">
              {currentServer.name}
            </h2>
            <Button
              onClick={handleLeaveServer}
              size="sm"
              className="p-1 bg-transparent hover:bg-red-900/20"
            >
              <LogOut className="w-4 h-4 text-red-400" />
            </Button>
          </div>
          <div className="flex items-center gap-2 text-xs text-green-600">
            <Radio className="w-3 h-3" />
            <span>Code: {currentServer.inviteCode}</span>
            <Button
              size="sm"
              className="p-0.5 bg-transparent hover:bg-green-900/20"
              onClick={() => navigator.clipboard.writeText(currentServer.inviteCode)}
            >
              <Copy className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Channels List */}
        <div className="flex-1 overflow-y-auto p-2">
          <div className="flex items-center justify-between px-2 py-1 mb-2">
            <span className="text-xs font-semibold text-green-600 uppercase">
              Transmission Decks
            </span>
            <Button
              onClick={() => setShowCreateChannel(true)}
              size="sm"
              className="p-0.5 bg-transparent hover:bg-green-900/20"
            >
              <Plus className="w-3 h-3 text-green-600" />
            </Button>
          </div>

          {currentChannels.map(channel => (
            <button
              key={channel.id}
              onClick={() => setSelectedChannelId(channel.id)}
              className={cn(
                "w-full px-2 py-1.5 rounded flex items-center gap-2 text-left",
                "transition-colors duration-200",
                selectedChannelId === channel.id
                  ? "bg-green-900/30 text-green-400"
                  : "text-green-600 hover:bg-green-900/20 hover:text-green-400"
              )}
            >
              {getChannelIcon(channel.type)}
              <span className="text-sm">{channel.name}</span>
              {channel.type === MootTableType.Voice && (
                <Users className="w-3 h-3 ml-auto" />
              )}
            </button>
          ))}
        </div>

        {/* Members Count */}
        <div className="p-4 border-t border-green-900/30">
          <div className="flex items-center justify-between text-xs text-green-600">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {currentMembers.length} crew online
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Level {currentServer.powerLevel}
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content - Messages */}
      <main className="flex-1 flex flex-col">
        {/* Channel Header */}
        <header className="h-12 border-b border-green-900/30 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {selectedChannel && (
              <>
                {getChannelIcon(selectedChannel.type)}
                <h3 className="font-bold text-green-400">
                  {selectedChannel.name}
                </h3>
                {selectedChannel.topic && (
                  <>
                    <ChevronRight className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600">
                      {selectedChannel.topic}
                    </span>
                  </>
                )}
              </>
            )}
          </div>
          <Button
            size="sm"
            className="p-1.5 bg-transparent hover:bg-green-900/20"
          >
            <Settings className="w-4 h-4 text-green-600" />
          </Button>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Terminal className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <p className="text-green-600 font-mono text-sm">
                  No transmissions in this deck yet.
                </p>
                <p className="text-green-700 text-xs mt-1">
                  Be the first to break the silence.
                </p>
              </div>
            </div>
          ) : (
            messages.map(message => (
              <div key={message.id} className="flex gap-3 group hover:bg-green-900/10 p-2 rounded">
                <div className="w-8 h-8 rounded-full bg-green-900/30 flex items-center justify-center text-green-400 font-bold text-sm">
                  {message.authorUsername[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-green-400 text-sm">
                      {message.authorUsername}
                    </span>
                    <span className="text-xs text-green-700">
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-green-300 text-sm">
                    {message.content}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-green-900/30">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Message #${selectedChannel?.name || 'channel'}`}
              className="flex-1 bg-black/50 border-green-900/50 text-green-400 placeholder:text-green-700"
            />
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-500 text-black"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </main>

      {/* Create Channel Modal */}
      {showCreateChannel && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-black border border-green-500/30 rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-green-400 mb-4">Create Transmission Deck</h2>
            <form onSubmit={handleCreateChannel}>
              <div className="space-y-4">
                <div>
                  <label className="block text-green-400 text-sm mb-1">Deck Name</label>
                  <Input
                    type="text"
                    value={newChannelName}
                    onChange={(e) => setNewChannelName(e.target.value)}
                    placeholder="e.g., engine-room"
                    className="bg-black border-green-900/50 text-green-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-green-400 text-sm mb-1">Deck Type</label>
                  <select
                    value={newChannelType}
                    onChange={(e) => setNewChannelType(e.target.value as MootTableType)}
                    className="w-full px-3 py-2 bg-black border border-green-900/50 text-green-400 rounded"
                  >
                    <option value={MootTableType.Text}>Text Channel</option>
                    <option value={MootTableType.Voice}>Voice Channel</option>
                    <option value={MootTableType.Announcement}>Announcement Channel</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <Button
                  type="button"
                  onClick={() => setShowCreateChannel(false)}
                  className="flex-1 bg-black border border-green-500/30 text-green-400 hover:bg-green-900/20"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-500 text-black"
                >
                  Create Deck
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}