export interface Post {
    id: string;
    title: string;
    views: number;
  }
  
  export interface Comment {
    id: string;
    text: string;
    postId: string;
  }
  
  export interface Profile {
    name: string;
  }