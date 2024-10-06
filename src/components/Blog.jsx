import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import '../styles/Blog.css';
import { useAuth } from "../store/AuthContext"

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const { user } = useAuth();  // Using user from AuthContext

    // Fetch posts from localStorage when the component mounts
    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        setPosts(storedPosts);
    }, []);

    const createMarkup = (html) => {
        return { __html: DOMPurify.sanitize(html) };
    };

    return (
        <div className="blog-container">
            {/* Display the username, or "Guest" if user is not logged in */}
            <h1>Welcome, {user ? user.firstName : "Guest"}!</h1>
            {posts.length > 0 ? (
                posts.map((post, index) => (
                    <div key={index} className="blog-post">
                        <h2 className="blog-title">{post.title}</h2>
                        {post.images.length > 0 && <img src={post.images[0]} alt="Blog visual" className="blog-image" />}
                        <div className="blog-meta">
                            {/* Display the username from the post object */}
                            <h1 className="blog-username">By: {post.username || "Anonymous"}</h1>
                            <h1 className="blog-date">Published on: {post.date}</h1>
                        </div>
                        <div className="blog-content" dangerouslySetInnerHTML={createMarkup(post.content)} />
                        <div className="blog-tags">
                            {post.tags.length > 0 ? (
                                post.tags.map((tag, index) => (
                                    <span key={index} className="blog-tag">{tag}</span>
                                ))
                            ) : (
                                <h4>No tags available</h4>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <h4>No blog posts available.</h4>
            )}
        </div>
    );
};

export default Blog;
