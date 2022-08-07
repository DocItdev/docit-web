import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { convertFromRaw } from "draft-js";
import DocItEditor from "../common/DocItEditor/DocItEditor";
import updatePost from "../../utils/posts/updatePost";
import { RootState } from "../../config/reduxConfig";
import { useParams } from "react-router-dom";

export interface TextPostProps {
  postText: string;
  postId: string;
}

export default function TextPost({ postText, postId }: TextPostProps) {
  const blocks = useMemo(
    () => convertFromRaw(JSON.parse(postText)),
    [postText]
  );
  const { editable, userToken } = useSelector((state: RootState) => state);
  const {docId} = useParams();
  return (
    <DocItEditor
      blocks={blocks}
      readOnly={!editable}
      buttonText="SAVE"
      onMutate={(postData) =>
        updatePost(userToken, docId, postId, postData)
      }
    />
  );
}
