import React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ProjectTreeItem from './ProjectTreeItem';
import DocTreeItem from './DocTreeItem';


export default function ProjectTreeView() {
  return(
    <TreeView
    aria-label="file system navigator"
    defaultCollapseIcon={<ExpandMoreIcon />}
    defaultExpandIcon={<ChevronRightIcon />}
    sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
  >
    <ProjectTreeItem projectName="project1">
      <DocTreeItem docName="document1" />
      <DocTreeItem docName="document2" />
    </ProjectTreeItem>
    <ProjectTreeItem projectName="project2">
      <DocTreeItem docName="document1" />
      <DocTreeItem docName="document2" />
    </ProjectTreeItem>
  </TreeView>
  )
}