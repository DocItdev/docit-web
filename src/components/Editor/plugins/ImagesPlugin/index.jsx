/* eslint-disable react/prop-types */
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $wrapNodeInElement, mergeRegister } from "@lexical/utils";
import {
  $createParagraphNode,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
} from "lexical";
import React, { useEffect, useState, useRef } from "react";
import TextInput from "../../../common/TextInput";
import FileInput from "../../../common/FileInput";

import { $createImageNode, ImageNode } from "../../nodes/ImageNode";
import { DialogActions, DialogButtonsList } from "../../../common/Dialog";
import { Button, Box, Card, CardContent, CardActions, Typography } from "@mui/material";
import useFileUpload from "../../../../hooks/useFileUpload";
import AsyncButton from "../../../common/AsyncButton/AsyncButton";

export const INSERT_IMAGE_COMMAND = createCommand("INSERT_IMAGE_COMMAND");

export function InsertImageUriDialogBody({ onClick }) {
  const [src, setSrc] = useState("");
  const [altText, setAltText] = useState("");

  const isDisabled = src === "";

  return (
    <>
      <TextInput
        label="Image URL"
        placeholder="i.e. https://source.unsplash.com/random"
        onChange={setSrc}
        value={src}
        data-test-id="image-modal-url-input"
      />
      <TextInput
        label="Alt Text"
        placeholder="Random unsplash image"
        onChange={setAltText}
        value={altText}
        data-test-id="image-modal-alt-text-input"
      />
      <DialogActions>
        <Button
          data-test-id="image-modal-confirm-btn"
          disabled={isDisabled}
          onClick={() => onClick({ altText, src })}
        >
          Confirm
        </Button>
      </DialogActions>
    </>
  );
}

export function InsertImageUploadedDialogBody({ onClick }) {
  const [src, setSrc] = useState("");
  const [altText, setAltText] = useState("");
  const { upload, isError, isLoading, error } = useFileUpload();

  const isDisabled = src === "";

  const loadImage = (files) => {
    const imageUrl = URL.createObjectURL(files[0]);
    setSrc(imageUrl);
  };

  const handleSave = (e) => {
    e.stopPropagation();
    const body = {
      fileUrl: src,
      fileName: "Screen recording",
    };
    upload(body, {
      onSuccess: (data) => {
        onClick({ altText, src: data.url, fileKey: data.key });
      },
    });
  };

  return (
    <Card>
      <CardContent>
      <Typography component="h1">Image Upload</Typography>
        <FileInput
          onChange={loadImage}
          accept="image/*"
          data-test-id="image-modal-file-upload"
        />
        <TextInput
          label="Alt Text"
          placeholder="Descriptive alternative text"
          onChange={setAltText}
          value={altText}
          data-test-id="image-modal-alt-text-input"
        />
      </CardContent>
      <CardActions>
        <DialogActions>
          <AsyncButton
            data-test-id="image-modal-file-upload-btn"
            disabled={isDisabled}
            onClick={handleSave}
            loading={isLoading}
            error={isError ? error : ""}
          >
            Confirm
          </AsyncButton>
        </DialogActions>
      </CardActions>
    </Card>
  );
}

export function InsertImageDialog({ activeEditor, onClose }) {
  const [mode, setMode] = useState(null);
  const hasModifier = useRef(false);

  useEffect(() => {
    hasModifier.current = false;
    const handler = (e) => {
      hasModifier.current = e.altKey;
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [activeEditor]);

  const onClick = (payload) => {
    activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
    onClose();
  };

  return (
    <>
      {!mode && (
        <DialogButtonsList>
          <Button
            data-test-id="image-modal-option-url"
            onClick={() => setMode("url")}
          >
            URL
          </Button>
          <Button
            data-test-id="image-modal-option-file"
            onClick={() => setMode("file")}
          >
            File
          </Button>
        </DialogButtonsList>
      )}
      {mode === "url" && <InsertImageUriDialogBody onClick={onClick} />}
      {mode === "file" && <InsertImageUploadedDialogBody onClick={onClick} />}
    </>
  );
}

export default function ImagesPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error("ImagesPlugin: ImageNode not registered on editor");
    }

    return mergeRegister(
      editor.registerCommand(
        INSERT_IMAGE_COMMAND,
        (payload) => {
          const imageNode = $createImageNode(payload);
          $insertNodes([imageNode]);
          if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
            $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
          }

          return true;
        },
        COMMAND_PRIORITY_EDITOR
      )
    );
  }, [editor]);

  return null;
}
