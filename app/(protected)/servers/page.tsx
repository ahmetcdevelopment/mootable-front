'use client';

import React, { useEffect, useState } from 'react';
import { useServerStore } from '@/store/serverStore';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { AppLoader } from '@/shared/components/AppLoader';
import {
  Plus,
  Search,
  Users,
  Lock,
  Globe,
  Sparkles,
  Anchor,
  Radio,
  X,
  Camera,
  Upload
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

  useEffect(() => {
    fetchServers({ onlyMyServers: true, pageNumber: 1 });
  }, [fetchServers]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      await searchServers(searchTerm);
    }
  };

  const handleCreateServer = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await createServer(createForm);
    if (success) {
      setShowCreateModal(false);
      setCreateForm({ name: '', description: '', isPublic: false });
    }
  };

  const handleJoinServer = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await joinServer({ inviteCode: joinCode });
    if (success) {
      setShowJoinModal(false);
      setJoinCode('');
    }
  };

  const getShipDisplay = (shipClass: ShipClass) => {
    switch (shipClass) {
      case ShipClass.Flagship:
        return { icon: '⚓', label: 'Flagship', color: 'text-honey-400' };
      case ShipClass.Battlecruiser:
        return { icon: '🚀', label: 'Battlecruiser', color: 'text-honey-500' };
      case ShipClass.Warship:
        return { icon: '⛵', label: 'Warship', color: 'text-ink-300' };
      case ShipClass.Transport:
        return { icon: '🛳️', label: 'Transport', color: 'text-ink-400' };
      default:
        return { icon: '🚤', label: 'Hovercraft', color: 'text-ink-500' };
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-ink-900 overflow-hidden relative">
      <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-honey-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-honey-500/3 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex-1 overflow-y-auto scrollbar-thin">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <header className="mb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <p className="text-caption text-honey-500 font-medium mb-2 tracking-wide uppercase">
                  Your Fleet
                </p>
                <h1 className="text-h1 font-display font-bold text-ink-50 mb-2">
                  Ships & Crews
                </h1>
                <p className="text-body text-ink-400">
                  Manage your ships and explore new horizons.
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowJoinModal(true)}
                  className="bg-ink-800 border border-ink-700 text-ink-200 hover:bg-ink-700 hover:border-ink-600 transition-all"
                >
                  <Radio className="w-4 h-4 mr-2" />
                  Join Ship
                </Button>
                <Button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-honey-500 hover:bg-honey-400 text-ink-950 font-medium shadow-lg shadow-honey-500/20 transition-all"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Ship
                </Button>
              </div>
            </div>

            <form onSubmit={handleSearch}>
              <div className="relative">
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search ships..."
                  className={cn(
                    "pl-11 pr-24 h-12 bg-ink-800/50 border-ink-700 text-ink-100",
                    "placeholder:text-ink-500 focus:border-honey-500/50",
                    "focus:ring-2 focus:ring-honey-500/20 rounded-xl"
                  )}
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-500" />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-honey-500 hover:bg-honey-400 text-ink-950 font-medium"
                >
                  Search
                </Button>
              </div>
            </form>
          </header>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {isLoading && servers.length === 0 ? (
              <div className="col-span-full flex items-center justify-center py-16">
                <AppLoader size="md" text="Discovering ships..." />
              </div>
            ) : servers.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-ink-800/50 border border-ink-700 flex items-center justify-center">
                  <Anchor className="w-10 h-10 text-ink-500" />
                </div>
                <h3 className="text-h4 font-display font-semibold text-ink-200 mb-2">
                  No ships in your fleet
                </h3>
                <p className="text-body text-ink-500 mb-6 max-w-sm mx-auto">
                  Create your first ship or join an existing crew to get started.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={() => setShowJoinModal(true)}
                    className="bg-ink-800 border border-ink-700 text-ink-200 hover:bg-ink-700"
                  >
                    Join Ship
                  </Button>
                  <Button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-honey-500 hover:bg-honey-400 text-ink-950"
                  >
                    Create Ship
                  </Button>
                </div>
              </div>
            ) : (
              servers.map((server) => {
                const shipDisplay = getShipDisplay(server.shipClass);
                return (
                  <div
                    key={server.id}
                    className={cn(
                      "relative bg-ink-800/50 border border-ink-700 rounded-2xl p-5",
                      "hover:border-honey-500/50 hover:shadow-lg hover:shadow-honey-500/5",
                      "hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                    )}
                    onClick={() => window.location.href = `/servers/${server.id}`}
                  >
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 text-honey-500 text-xs">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span className="font-medium">{server.powerLevel}</span>
                    </div>

                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 bg-ink-700/50 rounded-xl flex items-center justify-center text-2xl border border-ink-600 group-hover:border-honey-500/30 transition-colors">
                        {server.iconUrl ? (
                          <img src={server.iconUrl} alt="" className="w-full h-full object-cover rounded-xl" />
                        ) : (
                          shipDisplay.icon
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-ink-100 group-hover:text-honey-400 transition-colors truncate">
                          {server.name}
                        </h3>
                        <p className={cn("text-caption", shipDisplay.color)}>
                          {shipDisplay.label}
                        </p>
                      </div>
                    </div>

                    {server.description && (
                      <p className="text-body-sm text-ink-400 mb-4 line-clamp-2">
                        {server.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-caption text-ink-500">
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5" />
                          {server.memberCount}
                        </span>
                        <span className="flex items-center gap-1.5">
                          {server.isPublic ? <Globe className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                          {server.isPublic ? 'Public' : 'Private'}
                        </span>
                      </div>
                      {server.isOwner && (
                        <span className="px-2.5 py-1 bg-honey-500/10 text-honey-500 text-[10px] font-semibold rounded-full border border-honey-500/20">
                          CAPTAIN
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {hasNextPage && (
            <div className="flex justify-center mt-10">
              <Button
                onClick={loadMoreServers}
                disabled={isLoading}
                className="bg-ink-800 border border-ink-700 text-ink-300 hover:bg-ink-700 hover:text-ink-100"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-honey-500/30 border-t-honey-500 rounded-full animate-spin mr-2" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Load more ships
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-ink-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-ink-900 border border-ink-700 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-h4 font-display font-semibold text-ink-50">Create New Ship</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 rounded-lg hover:bg-ink-800 text-ink-400 hover:text-ink-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateServer}>
              <div className="space-y-5">
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-2xl bg-ink-800 border-2 border-dashed border-ink-600 flex items-center justify-center cursor-pointer hover:border-honey-500/50 hover:bg-ink-800/80 transition-all">
                      <div className="text-center">
                        <Camera className="w-8 h-8 text-ink-500 mx-auto mb-1 group-hover:text-honey-500 transition-colors" />
                        <span className="text-caption text-ink-500 group-hover:text-ink-400">Upload</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="absolute -bottom-2 -right-2 w-8 h-8 bg-honey-500 rounded-full flex items-center justify-center text-ink-950 hover:bg-honey-400 transition-colors shadow-lg"
                    >
                      <Upload className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-caption text-ink-500 mt-3">Ship icon (optional)</p>
                </div>

                <div>
                  <label className="block text-body-sm font-medium text-ink-200 mb-2">Ship Name</label>
                  <Input
                    type="text"
                    value={createForm.name}
                    onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                    placeholder="e.g., Nebuchadnezzar"
                    className="bg-ink-800/50 border-ink-700 text-ink-100 placeholder:text-ink-500 focus:border-honey-500/50 focus:ring-honey-500/20"
                    required
                  />
                </div>
                <div>
                  <label className="block text-body-sm font-medium text-ink-200 mb-2">Description</label>
                  <Input
                    type="text"
                    value={createForm.description}
                    onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                    placeholder="What's this ship about?"
                    className="bg-ink-800/50 border-ink-700 text-ink-100 placeholder:text-ink-500 focus:border-honey-500/50 focus:ring-honey-500/20"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={createForm.isPublic}
                    onChange={(e) => setCreateForm({ ...createForm, isPublic: e.target.checked })}
                    className="w-4 h-4 rounded border-ink-600 bg-ink-800 text-honey-500 focus:ring-honey-500/20"
                  />
                  <label htmlFor="isPublic" className="text-body-sm text-ink-300">
                    Make ship publicly discoverable
                  </label>
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <Button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-ink-800 border border-ink-700 text-ink-300 hover:bg-ink-700 hover:text-ink-100"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isCreating}
                  className="flex-1 bg-honey-500 hover:bg-honey-400 text-ink-950 font-medium"
                >
                  {isCreating ? 'Creating...' : 'Create Ship'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showJoinModal && (
        <div className="fixed inset-0 bg-ink-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-ink-900 border border-ink-700 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-h4 font-display font-semibold text-ink-50">Join a Ship</h2>
              <button
                onClick={() => setShowJoinModal(false)}
                className="p-2 rounded-lg hover:bg-ink-800 text-ink-400 hover:text-ink-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleJoinServer}>
              <div className="space-y-4">
                <div>
                  <label className="block text-body-sm font-medium text-ink-200 mb-2">Invite Code</label>
                  <Input
                    type="text"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                    placeholder="e.g., ABC123XY"
                    className="bg-ink-800/50 border-ink-700 text-ink-100 placeholder:text-ink-500 focus:border-honey-500/50 focus:ring-honey-500/20 font-mono"
                    required
                  />
                  <p className="text-caption text-ink-500 mt-2">
                    Enter the invite code shared by the ship captain
                  </p>
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <Button
                  type="button"
                  onClick={() => setShowJoinModal(false)}
                  className="flex-1 bg-ink-800 border border-ink-700 text-ink-300 hover:bg-ink-700 hover:text-ink-100"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isJoining}
                  className="flex-1 bg-honey-500 hover:bg-honey-400 text-ink-950 font-medium"
                >
                  {isJoining ? 'Joining...' : 'Join Ship'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
