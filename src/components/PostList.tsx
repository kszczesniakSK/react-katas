import React, { useState } from "react";
import { Post } from "../types"; // Import the Post type
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface PostListProps {
  posts: Post[];
}

// Delete post function
const deletePost = async (postId: string): Promise<Post> => {
  const { data } = await axios.delete<Post>(
    `http://localhost:3000/posts/${postId}`
  );
  return data;
};

const PostList: React.FC<PostListProps> = ({ posts }) => {
  const queryClient = useQueryClient();
  const [postIdToDelete, setPostIdToDelete] = useState<string | null>(null);
  const navigate = useNavigate();
  // Delete mutation with destructured properties
  const { mutate, isPending } = useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    onSuccess: (data, postId) => {
      // Invalidate queries related to the post
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setPostIdToDelete(null);
    },
  });

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id} onClick={() => navigate(post.id)}>
            {post.title} - Views: {post.views}
            <button
              onClick={() => {
                setPostIdToDelete(post.id);
                mutate(post.id);
              }}
              disabled={isPending && postIdToDelete === post.id}
            >
              {isPending && postIdToDelete === post.id
                ? "Deleting..."
                : "Delete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
