const express = require('express');
const path = require('path');
const app = express();

// Public klasörünü statik dosyalar için servis et
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let blogPosts = [];

app.get('/', (req, res) => {
    res.send('Hello nodejs CRUD');
});

app.get('/blog', (req, res) => {
    res.json(blogPosts);
});

app.get('/blog/:id', (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = blogPosts.find(post => post.id === postId);

    if (!post) {
        return res.status(404).send('Post not found');
    }

    res.json(post);
});

app.post('/blog', (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).send('Title and Content are required');
    }

    const newPost = {
        id: blogPosts.length + 1,
        title,
        content
    };

    blogPosts.push(newPost);
    res.status(201).json(newPost);
});

app.put('/blog/:id', (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const { title, content } = req.body;

    const post = blogPosts.find(post => post.id === postId);

    if (!post) {
        return res.status(404).send('Post not found');
    }

    if (title) post.title = title;
    if (content) post.content = content;

    res.json(post);
});

app.delete('/blog/:id', (req, res) => {
    const postId = parseInt(req.params.id, 10);

    const postIndex = blogPosts.findIndex(post => post.id === postId);

    if (postIndex === -1) {
        return res.status(404).send('Post not found');
    }

    blogPosts.splice(postIndex, 1);

    res.status(204).send(); // No content
});

app.listen(3000, () => {
    console.log(`Node API app is running on port 3000`);
});
