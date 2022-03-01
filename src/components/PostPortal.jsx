import React from "react";
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import FlatList from 'flatlist-react';
import fetchAllPost from '../utils/posts/fetchAllPost';
import Loader from "./common/Loader";
import Post from "./Post";

export default function PostPortal() {
  const { userToken, selectedDocId } = useSelector(state => state);
  const { isLoading, data } = useQuery('posts', () => fetchAllPost(userToken, selectedDocId), {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: selectedDocId !== '',
  })

  return isLoading ? <Loader /> : (
    <FlatList
      list={data}
      renderItem={(post) => <Post key={post.id} postData={post} />}
      renderWhenEmpty={() => <div>List is empty!</div>}
    />
  );
}
