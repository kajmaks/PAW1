import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import YES from './yes';
import NO from './no';
import YENO from './yeno';


function App() {
  return (
    <Router>
      <Link to="/yes">yes</Link>&nbsp;
      <Link to="/no">no</Link>&nbsp;
      <Link to="/yeno">yeno</Link>&nbsp;
      <Routes>
        <Route path="/" element={<YES />} />
        <Route path="/about" element={<NO />} />
        <Route path="/contact" element={<YENO />} />
      </Routes>
    </Router>
  );
}

export default App;
