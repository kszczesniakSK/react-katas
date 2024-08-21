import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Post } from "../types";


const createPost = async (newPost: Omit<Post, "id">): Promise<Post> => {
  const { data } = await axios.post<Post>(
    "http://localhost:3000/posts",
    newPost
  );
  return data;
};

const updatePost = async (
  postId: string,
  updatedPost: Omit<Post, "id">
): Promise<Post> => {
  const { data } = await axios.put<Post>(
    `http://localhost:3000/posts/${postId}`,
    updatedPost
  );
  return data;
};

const PostForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [views, setViews] = useState<number>(0);
  const [postId, setPostId] = useState<string | null>(null); // For update actions

  const queryClient = useQueryClient();

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (newPost: Omit<Post, "id">) => createPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setPostId(null);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (updatedPost: Omit<Post, "id">) =>
      updatePost(postId!, updatedPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", postId], });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setPostId(null); 
    },
  });



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const postData = { title, views: Number(views) };

    if (postId) {
      updateMutation.mutate(postData);
    } else {
      createMutation.mutate(postData);
    }

    setTitle("");
    setViews(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        value={views}
        placeholder="Views"
        onChange={(e) => setViews(Number(e.target.value))}
      />
      <button type="submit">{postId ? "Update Post" : "Create Post"}</button>

      {/* Button to simulate selecting an existing post for update */}
      <button type="button" onClick={() => setPostId("1")}>
        Simulate Update Post 1
      </button>
    </form>
  );
};

export default PostForm;
