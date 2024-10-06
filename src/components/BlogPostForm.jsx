import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/BlogPostForm.css';
import { useAuth } from "../store/AuthContext";

function BlogPostForm({ onSubmit }) {
    const { user } = useAuth(); // Get the current logged-in user
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {
            title,
            content,
            tags: tags.split(',').map(tag => tag.trim()),
            images: Array.from(images).map(image => URL.createObjectURL(image)),
            date: new Date().toLocaleDateString(),
            username: user?.firstName || "Anonymous",  // Fetch username from logged-in user
        };

        // Get existing posts from localStorage
        const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];

        // Add new post
        const updatedPosts = [newPost, ...storedPosts];

        // Save back to localStorage
        localStorage.setItem('posts', JSON.stringify(updatedPosts));

        // Clear form fields
        setTitle('');
        setContent('');
        setTags('');
        setImages([]);

        // Optionally trigger any callback if needed
        onSubmit && onSubmit(newPost);
    };

    return (
        <div>
            <form className="blog-post-form" onSubmit={handleSubmit}>
                <h2>Add New Post</h2>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div className='tag-editor'>
                    <label>Tags (comma separated):</label>
                    <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
                </div>

                <div className='quill-editor'>
                    <label>Content:</label>
                    <ReactQuill className="quill-editor" value={content} onChange={setContent} required />
                </div>

                <div>
                    <label>Upload Images:</label>
                    <input type="file" multiple onChange={handleImageChange} />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default BlogPostForm;
