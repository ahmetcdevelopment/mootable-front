import { httpClient } from '@/shared/services/http.client';
import {
  Server,
  CreateServerDto,
  JoinServerDto,
  GetServersQuery,
  GetServersResponse,
  MootTable,
  CreateMootTableDto,
  ServerMember,
  ServerRole
} from '@/types/server.types';
import { ServiceResponse } from '@/types/api.types';

class ServerService {
  private readonly baseUrl = '/servers';

  /**
   * Get user's servers (ships)
   */
  async getServers(query?: GetServersQuery): Promise<ServiceResponse<GetServersResponse>> {
    const params = new URLSearchParams();

    if (query?.pageNumber) params.append('pageNumber', query.pageNumber.toString());
    if (query?.pageSize) params.append('pageSize', query.pageSize.toString());
    if (query?.onlyMyServers !== undefined) params.append('onlyMyServers', query.onlyMyServers.toString());
    if (query?.onlyPublic !== undefined) params.append('onlyPublic', query.onlyPublic.toString());
    if (query?.searchTerm) params.append('searchTerm', query.searchTerm);

    const response = await httpClient.get<ServiceResponse<GetServersResponse>>(
      `${this.baseUrl}?${params.toString()}`
    );
    return response.data;
  }

  /**
   * Get server by ID
   */
  async getServerById(serverId: string): Promise<ServiceResponse<Server>> {
    const response = await httpClient.get<ServiceResponse<Server>>(
      `${this.baseUrl}/${serverId}`
    );
    return response.data;
  }

  /**
   * Create a new ship (server)
   * Matrix theme: "Launch your ship into the Matrix"
   */
  async createServer(dto: CreateServerDto): Promise<ServiceResponse<Server>> {
    const response = await httpClient.post<ServiceResponse<Server>>(
      this.baseUrl,
      dto
    );
    return response.data;
  }

  /**
   * Join a ship using invite code
   * Matrix theme: "Board the ship"
   */
  async joinServer(dto: JoinServerDto): Promise<ServiceResponse<{ serverId: string; serverName: string; message: string }>> {
    const response = await httpClient.post<ServiceResponse<{ serverId: string; serverName: string; message: string }>>(
      `${this.baseUrl}/join`,
      dto
    );
    return response.data;
  }

  /**
   * Leave a ship (server)
   * Matrix theme: "Abandon ship"
   */
  async leaveServer(serverId: string): Promise<ServiceResponse<boolean>> {
    const response = await httpClient.post<ServiceResponse<boolean>>(
      `${this.baseUrl}/${serverId}/leave`,
      {}
    );
    return response.data;
  }

  /**
   * Delete a server (captain only)
   */
  async deleteServer(serverId: string): Promise<ServiceResponse<boolean>> {
    const response = await httpClient.delete<ServiceResponse<boolean>>(
      `${this.baseUrl}/${serverId}`
    );
    return response.data;
  }

  /**
   * Get server channels (MootTables)
   */
  async getServerChannels(serverId: string): Promise<ServiceResponse<MootTable[]>> {
    const response = await httpClient.get<ServiceResponse<MootTable[]>>(
      `${this.baseUrl}/${serverId}/channels`
    );
    return response.data;
  }

  /**
   * Create a new channel (MootTable) in server
   */
  async createChannel(serverId: string, dto: CreateMootTableDto): Promise<ServiceResponse<MootTable>> {
    const response = await httpClient.post<ServiceResponse<MootTable>>(
      `${this.baseUrl}/${serverId}/channels`,
      dto
    );
    return response.data;
  }

  /**
   * Get server members (crew)
   */
  async getServerMembers(serverId: string): Promise<ServiceResponse<ServerMember[]>> {
    const response = await httpClient.get<ServiceResponse<ServerMember[]>>(
      `${this.baseUrl}/${serverId}/members`
    );
    return response.data;
  }

  /**
   * Get server roles
   */
  async getServerRoles(serverId: string): Promise<ServiceResponse<ServerRole[]>> {
    const response = await httpClient.get<ServiceResponse<ServerRole[]>>(
      `${this.baseUrl}/${serverId}/roles`
    );
    return response.data;
  }

  /**
   * Generate new invite code
   */
  async generateInvite(serverId: string): Promise<ServiceResponse<{ inviteCode: string; url: string }>> {
    const response = await httpClient.post<ServiceResponse<{ inviteCode: string; url: string }>>(
      `${this.baseUrl}/${serverId}/invites`,
      {}
    );
    return response.data;
  }
}

export const serverService = new ServerService();