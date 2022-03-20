import React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ProjectTreeItem from "../ProjectTreeItem";
import DocTreeItem from "../DocTreeItem";

export default function ProjectTreeView({ projects }) {
  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
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
                  />
                ))
              : null}
          </ProjectTreeItem>
        ))}
    </TreeView>
  );
}
