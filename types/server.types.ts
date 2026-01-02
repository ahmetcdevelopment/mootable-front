// Server (Ship) types - Matrix themed Discord-like servers

export interface Server {
  id: string;
  name: string; // Ship name (e.g., "Nebuchadnezzar")
  description?: string;
  iconUrl?: string;
  bannerUrl?: string;
  inviteCode: string;
  isPublic: boolean;
  ownerId: string;
  ownerUsername?: string;
  memberCount: number;
  createdAt: string;

  // Matrix theme properties
  shipClass: ShipClass;
  powerLevel: number;
  isOwner?: boolean;
  isMember?: boolean;
}

export enum ShipClass {
  Hovercraft = "Hovercraft",
  Transport = "Transport",
  Warship = "Warship",
  Battlecruiser = "Battlecruiser",
  Flagship = "Flagship"
}

export interface ServerMember {
  id: string;
  serverId: string;
  userId: string;
  username: string;
  displayName?: string;
  avatarUrl?: string;
  nickname?: string;
  joinedAt: string;
  roles: ServerRole[];
  isOnline?: boolean;
  status?: MemberStatus;
}

export enum MemberStatus {
  Online = "Online",
  Away = "Away",
  DoNotDisturb = "DoNotDisturb",
  Offline = "Offline",
  InTheMatrix = "InTheMatrix" // Special Matrix theme status
}

export interface ServerRole {
  id: string;
  serverId: string;
  name: string;
  color: string;
  position: number;
  permissions: ServerPermissions;
  memberCount?: number;
}

export enum ServerPermissions {
  None = 0,
  ViewMootTables = 1 << 0,
  SendMessages = 1 << 1,
  ManageMessages = 1 << 2,
  CreateMootTables = 1 << 3,
  ManageMootTables = 1 << 4,
  CreateRabbitHoles = 1 << 5,
  ManageRabbitHoles = 1 << 6,
  KickMembers = 1 << 7,
  BanMembers = 1 << 8,
  ManageRoles = 1 << 9,
  ManageServer = 1 << 10,
  Administrator = 1 << 11
}

export interface MootTable {
  id: string;
  serverId: string;
  categoryId?: string;
  name: string; // Channel name (e.g., "bridge", "engine-room")
  topic?: string;
  type: MootTableType;
  position: number;
  isArchived: boolean;
  createdAt: string;
}

export enum MootTableType {
  Text = "Text",
  Voice = "Voice",
  Announcement = "Announcement"
}

export interface ServerInvite {
  code: string;
  serverId: string;
  serverName: string;
  inviterId: string;
  inviterUsername: string;
  expiresAt?: string;
  maxUses?: number;
  uses: number;
  createdAt: string;
}

// Request/Response DTOs
export interface CreateServerDto {
  name: string;
  description?: string;
  iconUrl?: string;
  isPublic: boolean;
}

export interface JoinServerDto {
  inviteCode: string;
}

export interface CreateMootTableDto {
  name: string;
  topic?: string;
  type: MootTableType;
  categoryId?: string;
}

export interface GetServersQuery {
  pageNumber?: number;
  pageSize?: number;
  onlyMyServers?: boolean;
  onlyPublic?: boolean;
  searchTerm?: string;
}

export interface GetServersResponse {
  servers: Server[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}