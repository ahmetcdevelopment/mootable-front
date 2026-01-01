export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  userId: string;
  username: string;
  email: string;
  displayName?: string;
  avatarUrl?: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  roles: string[];
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  displayName?: string;
}

export interface RegisterResponse {
  userId: string;
  username: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
}

export interface RefreshTokenRequest {
  token: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
}
