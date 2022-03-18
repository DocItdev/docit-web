import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import FlatList from '../common/FlatList';
import fetchAllPost from '../../utils/posts/fetchAllPost';
import Loader from "../common/Loader";
import Post from "../Post";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import updatePostIndex from "../../utils/posts/updatePostIndex";
import createPostOrderObject from "../../utils/posts/createPostOrderObject";

export default function PostPortal() {
  const { userToken, selectedDocId } = useSelector(state => state);
  const { isLoading, data, refetch } = useQuery('posts', () => fetchAllPost(userToken, selectedDocId), {
    refetchOnWindowFocus: false,
    enabled: selectedDocId !== '',
  });
  const { mutate } = useMutation(postIndexes => updatePostIndex(userToken, selectedDocId, postIndexes), {
    onSuccess: ()=>{
      refetch()
    }
  });

  //const[postData, setPostData] = useState(data);

  useEffect(() => {
    if (selectedDocId) {
      refetch();
    }
  }, [selectedDocId]);

  // useEffect(()=>{
  //   if(data){
  //     setPostData(data);
  //   }
  // },[data])

  const onDragEnd = (result) => {
    const { destination, source, } = result;

    if (!destination) { return };
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    data.splice(destination.index, 0, data.splice(source.index, 1)[0]);

    const postIndexes = createPostOrderObject(
        data, 
        Math.min(source.index, destination.index), 
        Math.max(source.index, destination.index)  
      );
    mutate(postIndexes);

  }

  return isLoading ? <Loader /> : (

    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId="onlyColumn">
        {
          (providedDrop, snapshot) => (
            <div
              {...providedDrop.droppableProps}
              ref={providedDrop.innerRef}
            >
              <FlatList
                list={data}
                renderItem={(post, index) => (

                  <div key={post.id}>
                    <Draggable draggableId={post.id} index={index}>{
                      (provided, snapshot) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          index={index}
                
                        >
                          <Post
                            key={post.id}
                            postData={post}
                          />
                        </div>

                      )}
                    </Draggable>
                    
                  </div>
                )}
                
                renderWhenEmpty={() => <div>List is empty!</div>}
              />
              {providedDrop.placeholder}
            </div>
          )
        }

      </Droppable>
    </DragDropContext>
  );
}
