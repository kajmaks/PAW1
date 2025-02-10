import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const fetchPost = async (id: string) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!response.ok) {
    throw new Error('Błąd pobierania danych');
  }
  return response.json();
};

const Post = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id!),
  });

  if (isLoading) return <p>Ładowanie...</p>;
  if (error) return <p>Błąd: {error.message}</p>;

  return (
    <div className="post">
      <h1>{data.title}</h1>
      <div className="content">
        <p>{data.body}</p>
      </div>
    </div>
  );
};

export default Post;
