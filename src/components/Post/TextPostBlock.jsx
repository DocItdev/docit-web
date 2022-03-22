import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { convertFromRaw } from "draft-js";
import DocItEditor from "../common/DocItEditor/DocItEditor";
import updatePost from "../../utils/posts/updatePost";

export default function TextPostBlock({ postText, postId }) {
  const blocks = useMemo(
    () => convertFromRaw(JSON.parse(postText)),
    [postText]
  );
  const { editable, userToken, selectedDocId } = useSelector((state) => state);
  return (
    <DocItEditor
      blocks={blocks}
      readOnly={!editable}
      buttonText="SAVE"
      onMutate={(postData) =>
        updatePost(userToken, selectedDocId, postId, postData)
      }
    />
  );
}
