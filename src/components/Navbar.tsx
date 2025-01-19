import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Blog</h1>
      <ul className="nav-links">
        <li><Link to="/">Posts</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
