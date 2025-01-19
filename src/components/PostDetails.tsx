import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        return fetch(`https://jsonplaceholder.typicode.com/users/${data.userId}`);
      })
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error('Error fetching post or user:', error));
  }, [id]);

  if (!post || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-details">
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <h3>Author: {user.name}</h3>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default PostDetails;
