export interface UserType {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface RefreshTokenResponse {
  token: string;
  user: UserType;
}