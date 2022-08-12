import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ProjectTreeItem from "../ProjectTreeItem";
import DocTreeItem from "../DocTreeItem";
import { ProjectType } from "../../@types/Project";
import { useParams } from "react-router-dom";

export interface ProjectTreeViewProps {
  projects: ProjectType[];
}

export default function ProjectTreeView({ projects }: ProjectTreeViewProps) {
  const dispatch = useDispatch();
  const { projectId, docId } = useParams();
  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      defaultExpanded={projects.map((project) => project.id)}
      defaultSelected={docId ? docId : projectId}
    >
      {projects.length &&
        projects.map(({ name, id, description, Documents }) => (
          <ProjectTreeItem
            key={id}
            projectName={name}
            projectDescription={description}
            projectId={id}
          >
            {Documents.length
              ? Documents.map((document) => (
                  <DocTreeItem
                    key={document.id}
                    docId={document.id}
                    docName={document.name}
                    projectId={id}
                  />
                ))
              : null}
          </ProjectTreeItem>
        ))}
    </TreeView>
  );
}
