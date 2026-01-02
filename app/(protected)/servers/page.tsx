'use client';

import React, { useEffect, useState } from 'react';
import { useServerStore } from '@/store/serverStore';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import {
  Plus,
  Search,
  Users,
  Lock,
  Globe,
  Zap,
  Ship,
  Radio
} from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import { ShipClass } from '@/types/server.types';

export default function ServersPage() {
  const {
    servers,
    isLoading,
    isCreating,
    isJoining,
    hasNextPage,
    fetchServers,
    createServer,
    joinServer,
    loadMoreServers,
    searchServers
  } = useServerStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: '',
    description: '',
    isPublic: false
  });
  const [joinCode, setJoinCode] = useState('');

  // Initial load
  useEffect(() => {
    fetchServers({ onlyMyServers: true, pageNumber: 1 });
  }, [fetchServers]);

  // Handle search
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      await searchServers(searchTerm);
    }
  };

  // Handle create server
  const handleCreateServer = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await createServer(createForm);
    if (success) {
      setShowCreateModal(false);
      setCreateForm({ name: '', description: '', isPublic: false });
    }
  };

  // Handle join server
  const handleJoinServer = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await joinServer({ inviteCode: joinCode });
    if (success) {
      setShowJoinModal(false);
      setJoinCode('');
    }
  };

  // Get ship class icon
  const getShipIcon = (shipClass: ShipClass) => {
    switch (shipClass) {
      case ShipClass.Flagship:
        return '🚁'; // Most powerful
      case ShipClass.Battlecruiser:
        return '✈️';
      case ShipClass.Warship:
        return '🛩️';
      case ShipClass.Transport:
        return '🚂';
      default:
        return '🚗'; // Hovercraft
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Matrix-style background */}
      <div className="fixed inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 100px,
            #00ff00 100px,
            #00ff00 102px
          )`,
        }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-green-400 font-mono mb-2">
                NEBUCHADNEZZAR
              </h1>
              <p className="text-green-600 text-sm font-mono">
                &gt; Your fleet of ships in the Matrix
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowJoinModal(true)}
                className="bg-black border border-green-500/30 text-green-400 hover:bg-green-900/20"
              >
                <Radio className="w-4 h-4 mr-2" />
                Enter Transmission Code
              </Button>
              <Button
                onClick={() => setShowCreateModal(true)}
                className="bg-green-600 hover:bg-green-500 text-black"
              >
                <Plus className="w-4 h-4 mr-2" />
                Launch New Ship
              </Button>
            </div>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Scan for ships..."
                className={cn(
                  "pl-10 pr-20 bg-black border-green-900/50 text-green-400",
                  "placeholder:text-green-700 focus:border-green-500/50",
                  "focus:shadow-[0_0_20px_rgba(34,197,94,0.15)]"
                )}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-600" />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-500 text-black"
              >
                Scan
              </Button>
            </div>
          </form>
        </header>

        {/* Servers Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isLoading && servers.length === 0 ? (
            <div className="col-span-full flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-green-600 font-mono">Scanning the Matrix for ships...</p>
              </div>
            </div>
          ) : servers.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Ship className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-400 mb-2">
                No ships detected
              </h3>
              <p className="text-green-600 mb-4">
                Launch your first ship or join an existing fleet.
              </p>
            </div>
          ) : (
            servers.map((server) => (
              <div
                key={server.id}
                className={cn(
                  "relative bg-black/50 border border-green-900/30 rounded-lg p-4",
                  "hover:border-green-500/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.1)]",
                  "transition-all duration-300 cursor-pointer group"
                )}
                onClick={() => window.location.href = `/servers/${server.id}`}
              >
                {/* Power Level Badge */}
                <div className="absolute top-2 right-2 flex items-center gap-1 text-green-500 text-xs">
                  <Zap className="w-3 h-3" />
                  <span className="font-mono">{server.powerLevel}</span>
                </div>

                {/* Server Icon */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 bg-green-900/20 rounded-lg flex items-center justify-center text-2xl">
                    {getShipIcon(server.shipClass)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-green-400 group-hover:text-green-300">
                      {server.name}
                    </h3>
                    <p className="text-xs text-green-600">
                      {server.shipClass} Class
                    </p>
                  </div>
                </div>

                {/* Description */}
                {server.description && (
                  <p className="text-sm text-green-600 mb-3 line-clamp-2">
                    {server.description}
                  </p>
                )}

                {/* Stats */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-green-600">
                      <Users className="w-3 h-3" />
                      {server.memberCount} crew
                    </span>
                    <span className="flex items-center gap-1 text-green-600">
                      {server.isPublic ? (
                        <Globe className="w-3 h-3" />
                      ) : (
                        <Lock className="w-3 h-3" />
                      )}
                      {server.isPublic ? 'Public' : 'Private'}
                    </span>
                  </div>
                  {server.isOwner && (
                    <span className="px-2 py-1 bg-green-600 text-black text-[10px] font-bold rounded">
                      CAPTAIN
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More */}
        {hasNextPage && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={loadMoreServers}
              disabled={isLoading}
              className="bg-black border border-green-500/30 text-green-400 hover:bg-green-900/20"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin mr-2" />
                  Scanning...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Scan for more ships
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Create Server Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-black border border-green-500/30 rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-green-400 mb-4">Launch New Ship</h2>
            <form onSubmit={handleCreateServer}>
              <div className="space-y-4">
                <div>
                  <label className="block text-green-400 text-sm mb-1">Ship Name</label>
                  <Input
                    type="text"
                    value={createForm.name}
                    onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                    placeholder="e.g., Nebuchadnezzar II"
                    className="bg-black border-green-900/50 text-green-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-green-400 text-sm mb-1">Mission Description</label>
                  <Input
                    type="text"
                    value={createForm.description}
                    onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                    placeholder="What's the ship's mission?"
                    className="bg-black border-green-900/50 text-green-400"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={createForm.isPublic}
                    onChange={(e) => setCreateForm({ ...createForm, isPublic: e.target.checked })}
                    className="rounded border-green-600 bg-black text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="isPublic" className="text-green-400 text-sm">
                    Make ship publicly discoverable
                  </label>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <Button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-black border border-green-500/30 text-green-400 hover:bg-green-900/20"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isCreating}
                  className="flex-1 bg-green-600 hover:bg-green-500 text-black"
                >
                  {isCreating ? 'Launching...' : 'Launch Ship'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Join Server Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-black border border-green-500/30 rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-green-400 mb-4">Enter Transmission Code</h2>
            <form onSubmit={handleJoinServer}>
              <div className="space-y-4">
                <div>
                  <label className="block text-green-400 text-sm mb-1">Invite Code</label>
                  <Input
                    type="text"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                    placeholder="e.g., MX-ABC123XY"
                    className="bg-black border-green-900/50 text-green-400 font-mono"
                    required
                  />
                  <p className="text-xs text-green-600 mt-1">
                    Enter the transmission code to board the ship
                  </p>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <Button
                  type="button"
                  onClick={() => setShowJoinModal(false)}
                  className="flex-1 bg-black border border-green-500/30 text-green-400 hover:bg-green-900/20"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isJoining}
                  className="flex-1 bg-green-600 hover:bg-green-500 text-black"
                >
                  {isJoining ? 'Boarding...' : 'Board Ship'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}