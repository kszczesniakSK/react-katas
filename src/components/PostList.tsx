import React from 'react';
import { Post } from '../types'; // Import the Post type

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.title} - Views: {post.views}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;