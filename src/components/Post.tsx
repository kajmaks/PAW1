import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  content: string;
  comments: string[];
}

const Post = () => {
  const { id } = useParams<{ id: string }>(); // Pobranie id posta
  const [post, setPost] = useState<Post | null>(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`http://localhost:5000/posts/${id}`)
      .then(response => response.json())
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
        setLoading(false);
      });
  }, [id]);

  const addComment = () => {
    if (!comment.trim()) return;
    
    fetch(`http://localhost:5000/posts/${id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment }),
    })
      .then(response => response.json())
      .then(updatedPost => setPost(updatedPost))
      .catch(error => console.error('Error adding comment:', error));

    setComment("");
  };

  if (loading) return <p>Loading post...</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div className="post">
      <h1>{post.title}</h1>
      <div className="content">
        <p>{post.content}</p>
      </div>
      <h2>Comments</h2>
      <ul>
        {post.comments.map((c, index) => (
          <li key={index}>{c}</li>
        ))}
      </ul>
      <input 
        type="text" 
        value={comment} 
        onChange={(e) => setComment(e.target.value)} 
        placeholder="Add a comment" 
      />
      <button onClick={addComment}>Add Comment</button>
    </div>
  );
};

export default Post;
