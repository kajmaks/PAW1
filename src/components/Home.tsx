import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>Just say YES</h1>
      <ul className="post-list">
        {[1, 2, 3].map((id) => (
          <li key={id} className="post-item">
            <h2>Coś {id}</h2>
            <p>Just say YES {id}...</p>
            <Link to={`/post/${id}`}>Read more</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
