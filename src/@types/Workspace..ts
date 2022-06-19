export interface UserWorkspaceAttributes {
  UserId?: string;
  WorkspaceId?: string;
  role?: string;
}

export interface WorkspaceType {
  id?: string;
  title: string;
  description?: string;
  personal?: boolean;
  User_Workspace?: UserWorkspaceAttributes;
}