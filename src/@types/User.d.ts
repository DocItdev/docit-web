import { WorkspaceType } from "./Workspace";

export interface UserType {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  Workspaces: WorkspaceType[];
}

export interface RefreshTokenResponse {
  token: string;
  user: UserType;
  expiresIn: number;
}
