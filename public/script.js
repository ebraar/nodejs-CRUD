document.addEventListener('DOMContentLoaded', () => {
    const postsList = document.getElementById('postsList');
    const blogForm = document.getElementById('blogForm');
    const postIdInput = document.getElementById('postId');
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');

    const fetchPosts = async () => {
        const res = await fetch('/blog');
        const posts = await res.json();
        postsList.innerHTML = '';
        posts.forEach(post => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${post.title}</strong>
                <span>
                    <button class="edit-btn" onclick="editPost(${post.id})">Edit</button>
                    <button class="delete-btn" onclick="deletePost(${post.id})">Delete</button>
                </span>
            `;
            postsList.appendChild(li);
        });
    };

    blogForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = postIdInput.value;
        const title = titleInput.value;
        const content = contentInput.value;

        if (id) {
            await fetch(`/blog/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, content })
            });
        } else {
            await fetch('/blog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, content })
            });
        }

        titleInput.value = '';
        contentInput.value = '';
        postIdInput.value = '';
        fetchPosts();
    });

    window.editPost = async (id) => {
        const res = await fetch(`/blog/${id}`);
        const post = await res.json();
        postIdInput.value = post.id;
        titleInput.value = post.title;
        contentInput.value = post.content;
    };

    window.deletePost = async (id) => {
        await fetch(`/blog/${id}`, {
            method: 'DELETE'
        });
        fetchPosts();
    };

    fetchPosts();
});
