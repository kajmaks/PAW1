const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let posts = [
  { id: 1, title: "Coś 1", content: "cos 1", comments: ["Just say YES", "Anakin you were the chosen one"] },
  { id: 2, title: "Coś 2", content: "cos 2", comments: [] },
  { id: 3, title: "Coś 3", content: "cos 3", comments: ["YES"] },
];

app.get('/posts', (req, res) => {
  res.json(posts.map(({ id, title }) => ({ id, title })));
});

app.get('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send('Post not found');
  res.json(post);
});

app.post('/posts/:id/comments', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send('Post not found');
  post.comments.push(req.body.comment);
  res.json(post);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
