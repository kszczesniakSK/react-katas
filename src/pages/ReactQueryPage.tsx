import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostDetail from "../components/PostDetail";
import { Post } from "../types";

const fetchPosts = async (): Promise<Post[]> => {
  const { data } = await axios.get<Post[]>("http://localhost:3000/posts");
  return data;
};

const ReactQueryPage: React.FC = () => {
  const {
    data: posts,
    isError,
    isLoading,
    isFetching,
  } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts, // Use a defined query function
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading posts.</div>;

  return (
    <div>
      {isFetching && <div>Loading spinner in the corner of the screen</div>}
      <h1>Posts</h1>
      <PostList posts={posts ?? []} />
      <PostForm />
      {/* Just an example of using PostDetail */}
      <PostDetail postId="1" />
    </div>
  );
};

export default ReactQueryPage;
