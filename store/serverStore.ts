import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { serverService } from '@/features/servers/services/serverService';
import {
  Server,
  CreateServerDto,
  JoinServerDto,
  GetServersQuery,
  MootTable,
  CreateMootTableDto,
  ServerMember,
  ServerRole
} from '@/types/server.types';

interface ServerState {
  // State
  servers: Server[];
  currentServer: Server | null;
  currentChannels: MootTable[];
  currentMembers: ServerMember[];
  currentRoles: ServerRole[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isLoading: boolean;
  isCreating: boolean;
  isJoining: boolean;
  error: string | null;

  // Current query/filters
  currentQuery: GetServersQuery;

  // Actions
  fetchServers: (query?: GetServersQuery) => Promise<void>;
  fetchServerById: (serverId: string) => Promise<void>;
  createServer: (dto: CreateServerDto) => Promise<boolean>;
  joinServer: (dto: JoinServerDto) => Promise<boolean>;
  leaveServer: (serverId: string) => Promise<boolean>;
  deleteServer: (serverId: string) => Promise<boolean>;

  // Channel actions
  fetchChannels: (serverId: string) => Promise<void>;
  createChannel: (serverId: string, dto: CreateMootTableDto) => Promise<boolean>;

  // Member actions
  fetchMembers: (serverId: string) => Promise<void>;
  fetchRoles: (serverId: string) => Promise<void>;

  // Utility actions
  generateInvite: (serverId: string) => Promise<string | null>;
  selectServer: (server: Server) => void;
  loadMoreServers: () => Promise<void>;
  refreshServers: () => Promise<void>;
  searchServers: (searchTerm: string) => Promise<void>;
  clearError: () => void;
  resetState: () => void;
}

const initialState = {
  servers: [],
  currentServer: null,
  currentChannels: [],
  currentMembers: [],
  currentRoles: [],
  totalCount: 0,
  pageNumber: 1,
  pageSize: 20,
  hasNextPage: false,
  hasPreviousPage: false,
  isLoading: false,
  isCreating: false,
  isJoining: false,
  error: null,
  currentQuery: {
    pageNumber: 1,
    pageSize: 20,
    onlyMyServers: true
  }
};

export const useServerStore = create<ServerState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      fetchServers: async (query?: GetServersQuery) => {
        set({ isLoading: true, error: null });
        try {
          const mergedQuery = { ...get().currentQuery, ...query };
          const response = await serverService.getServers(mergedQuery);

          if (response.succeeded && response.data) {
            set({
              servers: response.data.servers,
              totalCount: response.data.totalCount,
              pageNumber: response.data.pageNumber,
              pageSize: response.data.pageSize,
              hasNextPage: response.data.hasNextPage,
              hasPreviousPage: response.data.hasPreviousPage,
              currentQuery: mergedQuery
            });
          } else {
            // API returned error - set empty state without throwing
            set({
              servers: [],
              totalCount: 0,
              hasNextPage: false,
              hasPreviousPage: false,
              currentQuery: mergedQuery
            });
          }
        } catch {
          // Network error or API unavailable - set empty state gracefully
          set({
            servers: [],
            totalCount: 0,
            hasNextPage: false,
            hasPreviousPage: false
          });
        } finally {
          set({ isLoading: false });
        }
      },

      fetchServerById: async (serverId: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await serverService.getServerById(serverId);

          if (response.succeeded && response.data) {
            set({ currentServer: response.data });
            // Also fetch channels and members
            await get().fetchChannels(serverId);
            await get().fetchMembers(serverId);
            await get().fetchRoles(serverId);
          } else {
            throw new Error(response.errors?.[0] || 'Failed to locate ship');
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to locate ship';
          set({ error: errorMessage });
          console.error(errorMessage);
        } finally {
          set({ isLoading: false });
        }
      },

      createServer: async (dto: CreateServerDto) => {
        set({ isCreating: true, error: null });
        try {
          const response = await serverService.createServer(dto);

          if (response.succeeded && response.data) {
            // Add new server to the list
            set(state => ({
              servers: [response.data!, ...state.servers],
              totalCount: state.totalCount + 1
            }));

            console.log(response.message || 'Welcome aboard, Captain. Your ship awaits.');
            return true;
          } else {
            throw new Error(response.errors?.[0] || 'Failed to launch ship');
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to launch ship';
          set({ error: errorMessage });
          console.error(errorMessage);
          return false;
        } finally {
          set({ isCreating: false });
        }
      },

      joinServer: async (dto: JoinServerDto) => {
        set({ isJoining: true, error: null });
        try {
          const response = await serverService.joinServer(dto);

          if (response.succeeded && response.data) {
            // Refresh server list
            await get().fetchServers();
            console.log(response.data.message || 'Welcome aboard the ship.');
            return true;
          } else {
            throw new Error(response.errors?.[0] || 'Failed to board the ship');
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to board the ship';
          set({ error: errorMessage });
          console.error(errorMessage);
          return false;
        } finally {
          set({ isJoining: false });
        }
      },

      leaveServer: async (serverId: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await serverService.leaveServer(serverId);

          if (response.succeeded) {
            // Remove server from list
            set(state => ({
              servers: state.servers.filter(s => s.id !== serverId),
              currentServer: state.currentServer?.id === serverId ? null : state.currentServer,
              totalCount: Math.max(0, state.totalCount - 1)
            }));

            console.log('You have abandoned the ship.');
            return true;
          } else {
            throw new Error(response.errors?.[0] || 'Failed to leave ship');
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to leave ship';
          set({ error: errorMessage });
          console.error(errorMessage);
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      deleteServer: async (serverId: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await serverService.deleteServer(serverId);

          if (response.succeeded) {
            // Remove server from list
            set(state => ({
              servers: state.servers.filter(s => s.id !== serverId),
              currentServer: state.currentServer?.id === serverId ? null : state.currentServer,
              totalCount: Math.max(0, state.totalCount - 1)
            }));

            console.log('The ship has been destroyed.');
            return true;
          } else {
            throw new Error(response.errors?.[0] || 'Failed to destroy ship');
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to destroy ship';
          set({ error: errorMessage });
          console.error(errorMessage);
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      fetchChannels: async (serverId: string) => {
        try {
          const response = await serverService.getServerChannels(serverId);
          if (response.succeeded && response.data) {
            set({ currentChannels: response.data });
          }
        } catch (error) {
          console.error('Failed to fetch channels:', error);
        }
      },

      createChannel: async (serverId: string, dto: CreateMootTableDto) => {
        set({ isLoading: true, error: null });
        try {
          const response = await serverService.createChannel(serverId, dto);

          if (response.succeeded && response.data) {
            set(state => ({
              currentChannels: [...state.currentChannels, response.data!]
            }));

            console.log('New deck created on the ship.');
            return true;
          } else {
            throw new Error(response.errors?.[0] || 'Failed to create deck');
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to create deck';
          set({ error: errorMessage });
          console.error(errorMessage);
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      fetchMembers: async (serverId: string) => {
        try {
          const response = await serverService.getServerMembers(serverId);
          if (response.succeeded && response.data) {
            set({ currentMembers: response.data });
          }
        } catch (error) {
          console.error('Failed to fetch crew:', error);
        }
      },

      fetchRoles: async (serverId: string) => {
        try {
          const response = await serverService.getServerRoles(serverId);
          if (response.succeeded && response.data) {
            set({ currentRoles: response.data });
          }
        } catch (error) {
          console.error('Failed to fetch roles:', error);
        }
      },

      generateInvite: async (serverId: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await serverService.generateInvite(serverId);

          if (response.succeeded && response.data) {
            console.log('Transmission code generated: ' + response.data.inviteCode);
            return response.data.url;
          } else {
            throw new Error(response.errors?.[0] || 'Failed to generate transmission code');
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to generate transmission code';
          set({ error: errorMessage });
          console.error(errorMessage);
          return null;
        } finally {
          set({ isLoading: false });
        }
      },

      selectServer: (server: Server) => {
        set({ currentServer: server });
      },

      loadMoreServers: async () => {
        const { hasNextPage, pageNumber, currentQuery } = get();

        if (!hasNextPage) return;

        const nextQuery = {
          ...currentQuery,
          pageNumber: pageNumber + 1
        };

        set({ isLoading: true, error: null });
        try {
          const response = await serverService.getServers(nextQuery);

          if (response.succeeded && response.data) {
            set(state => ({
              servers: [...state.servers, ...response.data!.servers],
              pageNumber: response.data!.pageNumber,
              hasNextPage: response.data!.hasNextPage,
              currentQuery: nextQuery
            }));
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to load more ships';
          set({ error: errorMessage });
          console.error(errorMessage);
        } finally {
          set({ isLoading: false });
        }
      },

      refreshServers: async () => {
        const { currentQuery } = get();
        await get().fetchServers({ ...currentQuery, pageNumber: 1 });
      },

      searchServers: async (searchTerm: string) => {
        await get().fetchServers({ searchTerm, pageNumber: 1 });
      },

      clearError: () => set({ error: null }),

      resetState: () => set(initialState)
    }),
    {
      name: 'server-store'
    }
  )
);