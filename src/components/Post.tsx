import React from 'react';
import { useParams } from 'react-router-dom';

const Post = () => {
  const { id } = useParams();

  return (
    <div className="post">
      <h1>Post {id}</h1>
      <div className="content">
        <p>Coś {id}</p>
      </div>
    </div>
  );
};

export default Post;
