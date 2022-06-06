import { DocumentType } from "./Document";

export interface ProjectType {
  id?: string;
  name: string;
  description: string;
  Documents?: DocumentType[];
}

export interface ProjectList {
  projects: ProjectType[];
}