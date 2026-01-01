import { create } from "zustand";

/**
 * UI state yönetimi.
 * 
 * NEDEN AYRI UI STORE:
 * Modal, sidebar, theme gibi UI state'leri
 * business logic store'larından ayrı tutulmalı.
 * 
 * PRODUCTION DENEYİMİ:
 * UI state + auth state aynı store'da:
 * - Modal açıldığında auth selector'lar tetiklenir
 * - Gereksiz re-render = performance düşüşü
 * - Debug zorlaşır
 */

interface UIState {
  sidebarOpen: boolean;
  activeMootTableId: string | null;
  activeRabbitHoleId: string | null;
  activeServerId: string | null;
  isCreateServerModalOpen: boolean;
  isSettingsOpen: boolean;
  isMobileMenuOpen: boolean;
  
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setActiveMootTable: (id: string | null) => void;
  setActiveRabbitHole: (id: string | null) => void;
  setActiveServer: (id: string | null) => void;
  openCreateServerModal: () => void;
  closeCreateServerModal: () => void;
  openSettings: () => void;
  closeSettings: () => void;
  toggleMobileMenu: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  activeMootTableId: null,
  activeRabbitHoleId: null,
  activeServerId: null,
  isCreateServerModalOpen: false,
  isSettingsOpen: false,
  isMobileMenuOpen: false,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setActiveMootTable: (id) => set({ activeMootTableId: id, activeRabbitHoleId: null }),
  setActiveRabbitHole: (id) => set({ activeRabbitHoleId: id }),
  setActiveServer: (id) => set({ activeServerId: id, activeMootTableId: null, activeRabbitHoleId: null }),
  openCreateServerModal: () => set({ isCreateServerModalOpen: true }),
  closeCreateServerModal: () => set({ isCreateServerModalOpen: false }),
  openSettings: () => set({ isSettingsOpen: true }),
  closeSettings: () => set({ isSettingsOpen: false }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
}));
