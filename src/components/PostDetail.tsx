import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Post } from "../types"; // Import the Post type
import { ClipLoader } from "react-spinners";

export const fetchPost = async (postId: string): Promise<Post> => {
  const { data } = await axios.get<Post>(
    `http://localhost:3000/posts/${postId}`
  );
  return data;
};

interface PostDetailProps {
  postId: string;
}

const PostDetail: React.FC<PostDetailProps> = ({ postId }) => {
  const queryClient = useQueryClient();

  const { data: post, isLoading, isError } = useQuery<Post>({
    queryKey: ['post', postId],
    queryFn: () => fetchPost(postId), 
    initialData: () => {
      const cachedPosts = queryClient.getQueryData<Post[]>(['posts']);
      return cachedPosts?.find((post) => post.id === postId);
    },
    staleTime: 1000 * 60 * 5,// Data is considered fresh for 5 minutes
    enabled: !!postId, 
  });

  if (isLoading) return <ClipLoader />;
  if (isError || !post) return <div>Post not found or error loading post</div>;

  return post ? (
    <div>
      <h3>{post.title}</h3>
      <p>Views: {post.views}</p>
    </div>
  ) : (
    <div>Post not found</div>
  );
};

export default PostDetail;
