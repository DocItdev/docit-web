import React from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import Journey, { Step } from "../common/Journey";
import { useForm } from 'react-hook-form';
import { WorkspaceType } from "../../@types/Workspace.";
import WorkspaceIdentify from "./WorkspaceIdentify";
import TeamIdentify from "./TeamIdentify";
import WorkspaceMembers from "./WorkspaceMembers";

export default function WorkspaceDialog({ open, onClose }: DialogProps) {
  const reactForm = useForm<WorkspaceType>();
  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <Journey>
        <Step
          id="WorkspaceIdentify"
          render={({ next }) => (
            <WorkspaceIdentify next={next} reactForm={reactForm} />
          )}
        />
        <Step
          id="TeamIdentify"
          render={({ next }) => (
            <TeamIdentify next={next} reactForm={reactForm} />
          )}
        />
        <Step
          id="WorkspaceMembers"
          render={() => (
            <WorkspaceMembers reactForm={reactForm} />
          )}
        />
      </Journey>
    </Dialog>
  );
}
