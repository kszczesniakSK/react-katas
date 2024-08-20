import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Post } from "../types";
import { fetchPost } from "../components/PostDetail";
import { ClipLoader } from "react-spinners";

const PostDetailsPage = () => {
  const queryClient = useQueryClient();
  const { postId } = useParams<{ postId: string }>();

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery<Post>({
    queryKey: ["post", postId],
    queryFn: () => fetchPost(postId!),
    initialData: () => {
      const cachedPosts = queryClient.getQueryData<Post[]>(["posts"]);
      return cachedPosts?.find((post) => post.id === postId);
    },
    staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
    enabled: !!postId,
  });

  if (isLoading) return <ClipLoader />;
  if (isError || !post) return <div>Post not found or error loading post</div>;

  return (
    <div>
      <p>{post.title}</p>
      <p>{post.views}</p>
    </div>
  );
};

export default PostDetailsPage