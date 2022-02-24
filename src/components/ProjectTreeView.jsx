import React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ProjectTreeItem from "./ProjectTreeItem";
import DocTreeItem from "./DocTreeItem";

export default function ProjectTreeView({ projects }) {
  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: "100vh", flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
    >
      {projects.length &&
        projects.map(({ name, id, Documents }) => (
          <ProjectTreeItem key={id} projectName={name} projectId={id}>
            {Documents.length
              ? Documents.map((document) => (
                  <DocTreeItem key={document.id} docName={document.name} />
                ))
              : null}
          </ProjectTreeItem>
        ))}
    </TreeView>
  );
}
