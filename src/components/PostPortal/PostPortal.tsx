import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import FlatList from "../common/FlatList";
import fetchAllPost from "../../utils/posts/fetchAllPost";
import Loader from "../common/Loader";
import Post from "../Post";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import updatePostIndex from "../../utils/posts/updatePostIndex";
import createPostOrderObject from "../../utils/posts/createPostOrderObject";
import { setEditable } from "../../ducks";
import { RootState } from "../../config/reduxConfig";
import { AxiosError } from "axios";
import { PostIndex } from "../../@types/Post";
import { useParams } from "react-router-dom";

export default function PostPortal() {
  const { userToken, editable } = useSelector(
    (state: RootState) => state
  );
  const dispatch = useDispatch();
  const { docId: selectedDocId } = useParams();
  const queryClient = useQueryClient();
  const { isLoading, data, refetch } = useQuery(
    "posts",
    () => fetchAllPost(userToken, selectedDocId),
    {
      refetchOnWindowFocus: false,
      enabled: selectedDocId !== undefined || selectedDocId !== "",
    }
  );
  const { mutate } = useMutation<
    any,
    AxiosError,
    PostIndex[],
    void
  >(
    (postIndexes) => updatePostIndex(userToken, selectedDocId, postIndexes),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  useEffect(() => {
    if (selectedDocId) {
      refetch();
    }
  }, [selectedDocId]);

  useEffect(() => {
    if (!isLoading && data?.length < 2) {
      dispatch(setEditable(true));
    }
  }, [isLoading, data]);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const postData = [...data];
    postData.splice(destination.index, 0, postData.splice(source.index, 1)[0]);
    queryClient.setQueryData("posts", postData);
    const postIndexes = createPostOrderObject(
      postData,
      Math.min(source.index, destination.index),
      Math.max(source.index, destination.index)
    );
    mutate(postIndexes);
  };
  return isLoading ? (
    <Loader />
  ) : (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="onlyColumn">
        {(providedDrop, snapshot) => (
          <div {...providedDrop.droppableProps} ref={providedDrop.innerRef}>
            <FlatList
              list={data}
              renderItem={(post, index) => (
                <div key={post.id}>
                  <Draggable
                    draggableId={post.id}
                    index={index}
                    isDragDisabled={!editable}
                  >
                    {(provided, snapshot) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        index={index}
                      >
                        <Post key={post.id} postData={post} />
                      </div>
                    )}
                  </Draggable>
                </div>
              )}
              renderWhenEmpty={() => (
                <div>You need to create a project and document first :)</div>
              )}
            />
            {providedDrop.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
