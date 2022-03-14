import React, { useEffect, useState } from "react";
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import FlatList from '../common/FlatList';
import fetchAllPost from '../../utils/posts/fetchAllPost';
import Loader from "../common/Loader";
import Post from "../Post";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function PostPortal() {
  const { userToken, selectedDocId } = useSelector(state => state);
  const { isLoading, data, refetch } = useQuery('posts', () => fetchAllPost(userToken, selectedDocId), {
    refetchOnWindowFocus: false,
    enabled: selectedDocId !== '',
  })
  useEffect(() => {
    if (selectedDocId) {
      refetch();
    }
  }, [selectedDocId]);

  const[postOrder, setPostOrder] = useState(['1923be35-8980-4976-be30-01c2a529296d', '04f34f97-1456-44f8-867a-d3539d470e4b', '3f0001bd-40ff-4953-8b14-53d3924eeff6', '1939aacb-6f90-4d7c-b950-e0799e8466da', '663547f7-7dc1-40de-84c7-d6e9d0c5420c', 'c03b64ca-72c4-4480-bf9f-a6dcbb53dab2', '706284b8-282a-4d6b-9e3e-4e45cf20b686', '1c61830c-0124-4870-968b-9e7b1f614ad3', 'bcc883e0-1d26-4e48-b02e-5aab099fcbd3', '3b78677e-bf05-497a-90f2-07cb88700f6b', '0d050bf2-7269-449a-8f1d-ad397ede2ea8', 'd0cd3105-bbf1-4baa-a547-096a47c051da']);
  const[postData, setPostData] = useState([]);

  useEffect(()=>{
    if(data){
      //when we get the real post order from DB we will just need to sort the postData and set it.
      // now we need dummy postOrder which is just the default
      // let orderPost = data.map((obj)=>{
      //   return obj.id;
      // })
      //console.log(orderPost);
      //setPostOrder(orderPost);

      //We need to reorder the data based on the postOrder (currently hardcoded)
      const setupPostData =[];
      
      postOrder.forEach((postid)=>{
        data.map((obj)=>{
          if(obj.id === postid){
            setupPostData.push(obj);
          }
        })
      })
      console.log(setupPostData);

      setPostData(setupPostData);

    }
  },[data])

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) { return };
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    console.log(result);

    const newPostOrder = [...postOrder];
    const temp = newPostOrder[destination.index];
    newPostOrder[destination.index] = postOrder[source.index];
    newPostOrder[source.index] = temp;

    const newPostData = [...postData];
    const tempData = newPostData[destination.index];
    newPostData[destination.index] = postData[source.index];
    newPostData[source.index] = tempData;
    
    setPostOrder(newPostOrder);
    setPostData(newPostData)
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
