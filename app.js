const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post('/categories', async (req, res) => {
  const { title, description } = req.body;
  try {
    const category = await prisma.category.create({
      data: { title, description },
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/categories/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/categories/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { title, description },
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/categories/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.category.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/posts', async (req, res) => {
  const { title, content, published, categoryId } = req.body;
  try {
    const post = await prisma.post.create({
      data: { title, content, published, categoryId },
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/posts', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({ include: { category: true } });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
      include: { category: true },
    });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, published, categoryId } = req.body;
  try {
    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: { title, content, published, categoryId },
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.post.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/comments', async (req, res) => {
  const { author, text } = req.body;
  try {
    const comment = await prisma.comment.create({
      data: { author, text },
    });
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/comments', async (req, res) => {
  try {
    const comments = await prisma.comment.findMany();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`127.0.0.1:${PORT}`);
});
