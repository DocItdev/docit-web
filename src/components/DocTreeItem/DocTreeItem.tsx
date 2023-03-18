import React, { SyntheticEvent, useState } from "react";
import TreeItem from "@mui/lab/TreeItem";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import Delete from "@mui/icons-material/Delete";
import ModeEdit from "@mui/icons-material/ModeEdit";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import "./DocTreeItem.css";
import deleteDocument from "../../utils/documents/deleteDocument";
import DocumentForm from "../common/DocumentForm";
import updateDocument from "../../utils/documents/updateDocument";
import PopperMenu from "../common/PopperMenu";
import { RootState } from "../../config/reduxConfig";
import { useNavigate, useParams } from "react-router-dom";

export interface DocTreeItemProps {
  docName: string;
  docId: string;
  projectId: string;
}

export default function DocTreeItem({ docName, docId, projectId }: DocTreeItemProps) {
  const { userToken } = useSelector((state: RootState) => state);
  const navigate = useNavigate();
  const { workspaceId } = useParams();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(() => deleteDocument(docId, userToken), {
    onSuccess: () => {
      queryClient.invalidateQueries("projects");
    },
  });
  const [opened, setOpened] = useState(false);
  const [hover, setHover] = useState(false);

  const handleOnMouseEnter = () => {
    setHover(true);
  };

  const handleOnMouseLeave = () => {
    setHover(false);
  };

  const handleClick = (event) => {
    event.stopPropagation();
    navigate(`../${workspaceId}/${projectId}/${docId}`);
    queryClient.invalidateQueries(docId);
  };

  const toggleOpened = () => {
    setOpened(!opened);
  };

  const handleDelete = (event: SyntheticEvent) => {
    event.stopPropagation();
    mutate();
  };

  const actionButtons = [
    { icon: ModeEdit, title: "Rename", onClick: toggleOpened },
    { icon: Delete, title: "Delete", onClick: handleDelete },
  ];
  return (
    <>
      <TreeItem
        nodeId={docId}
        onClick={handleClick}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        sx={{
          padding: 0,
          "& .MuiTreeItem-content": {
            padding: 0,
          },
        }}
        label={
          <Grid
            container
            spacing={1}
            sx={{ minHeight: 44, alignItems: 'center',}}
          >
            <Grid item xs={10} className="docTitle">
              <i
                className="bi bi-file-earmark-text"
                style={{ marginRight: "5%" }}
              ></i>
              <Typography className="text" component="span">
                {docName}
              </Typography>
            </Grid>
            <Grid
              item
              xs={2}
              sx={{
                display: "none",
                ...(hover && { display: "flex" }),
              }}
            >
              <PopperMenu menuItems={actionButtons}>
                <MoreVertIcon />
              </PopperMenu>
            </Grid>
          </Grid>
        }
      />
      <DocumentForm
        title="Update Document"
        buttonText="Update"
        open={opened}
        onClose={toggleOpened}
        onMutate={(docData) => updateDocument(userToken, {ProjectId: projectId, id: docId, ...docData})}
        initialValues={{ title: docName }}
      />
    </>
  );
}
