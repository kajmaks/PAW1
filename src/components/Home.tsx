import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

// Define the expected shape of a post
interface Post {
  id: number;
  title: string;
  body: string;
}

// Fetch function for posts
const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Błąd pobierania danych');
  }
  return response.json();
};

const Home = () => {
  const { data: posts, error, isLoading } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  if (isLoading) return <p>Ładowanie postów...</p>;
  if (error) return <p>Błąd: {error.message}</p>;

  return (
    <div className="home">
      <h1>Lista postów</h1>
      <ul className="post-list">
        {posts?.slice(0, 5).map((post: Post) => (
          <li key={post.id} className="post-item">
            <h2>{post.title}</h2>
            <p>{post.body.substring(0, 100)}...</p>
            <Link to={`/post/${post.id}`}>Czytaj więcej</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
