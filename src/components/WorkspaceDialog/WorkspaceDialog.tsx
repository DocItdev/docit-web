import React from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import Journey, { Step } from "../common/Journey";
import TeamIdentify from "./TeamIdentify";
import WorkspaceMembers from "./WorkspaceMembers";
import { WorkspaceType } from "../../@types/Workspace.";

export default function WorkspaceDialog({ open, onClose }: DialogProps) {
  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <Journey>
        <Step
          id="TeamIdentify"
          render={({ next }) => <TeamIdentify next={next} />}
        />
        <Step
          id="WorkspaceMembers"
          render={({ data }) => (
            <WorkspaceMembers
              onClose={onClose}
              workspaceData={data as WorkspaceType}
            />
          )}
        />
      </Journey>
    </Dialog>
  );
}
