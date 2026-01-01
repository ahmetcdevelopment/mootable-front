"use client";

import { Plus, Search } from "lucide-react";
import { useUIStore } from "@/store/ui.store";

export default function ServersPage() {
  const openCreateServerModal = useUIStore((state) => state.openCreateServerModal);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-moot-text">Your Ships</h1>
          <p className="text-moot-textMuted mt-1">
            Nebuchadnezzar vessels waiting for your command
          </p>
        </div>
        
        <button 
          onClick={openCreateServerModal}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Ship
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-moot-textMuted" />
        <input
          type="text"
          placeholder="Search your ships..."
          className="input-field pl-10"
        />
      </div>

      {/* Empty state */}
      <div className="card text-center py-12">
        <div className="w-16 h-16 rounded-full bg-moot-surfaceLight mx-auto mb-4 flex items-center justify-center">
          <Plus className="w-8 h-8 text-moot-textMuted" />
        </div>
        <h3 className="text-xl font-semibold text-moot-text mb-2">
          No ships yet
        </h3>
        <p className="text-moot-textMuted mb-4 max-w-md mx-auto">
          Create your first Nebuchadnezzar and start gathering your crew. 
          Every revolution starts with a single ship.
        </p>
        <button 
          onClick={openCreateServerModal}
          className="btn-primary"
        >
          Build Your First Ship
        </button>
      </div>
    </div>
  );
}
