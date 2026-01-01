"use client";

import { useParams } from "next/navigation";
import { Hash, Users, GitBranch, Send } from "lucide-react";
import { useState } from "react";

export default function MootTablePage() {
  const params = useParams();
  const mootTableId = params.mootTableId as string;
  const [message, setMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    // TODO: Send message via SignalR
    setMessage("");
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-4 h-14 border-b border-moot-surfaceLight">
        <div className="flex items-center gap-2">
          <Hash className="w-5 h-5 text-moot-textMuted" />
          <h1 className="font-semibold text-moot-text">general</h1>
          <span className="text-moot-textMuted text-sm ml-2">
            General discussion
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="text-moot-textMuted hover:text-moot-text transition-colors">
            <GitBranch className="w-5 h-5" />
          </button>
          <button className="text-moot-textMuted hover:text-moot-text transition-colors">
            <Users className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-moot-surfaceLight mx-auto mb-4 flex items-center justify-center">
            <Hash className="w-8 h-8 text-moot-primary" />
          </div>
          <h2 className="text-2xl font-bold text-moot-text mb-2">
            Welcome to #general
          </h2>
          <p className="text-moot-textMuted">
            This is the beginning of the #general Moot Table.
          </p>
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-moot-surfaceLight">
        <form onSubmit={handleSendMessage} className="relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your thoughts..."
            className="input-field pr-12"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-moot-primary hover:text-moot-accent disabled:text-moot-textMuted disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
