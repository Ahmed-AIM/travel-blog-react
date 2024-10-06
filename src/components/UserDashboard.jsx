import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/AuthContext';
import '../styles/UserDashboard.css';

const UserDashboard = () => {
    const { user } = useAuth();
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        // Fetch user's posts from localStorage
        const allPosts = JSON.parse(localStorage.getItem('posts')) || [];
        const filteredPosts = allPosts.filter(post => post.username === user.firstName);
        setUserPosts(filteredPosts);
    }, [user]);


    

    return (
        <div className="user-dashboard">
            <h1>Welcome to your dashboard, {user.firstName}!</h1>
            <div className="user-info">
                <h2>Your Information</h2>
                <p>Name: {user.firstName} {user.lastName}</p>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p> 
                <p>Address: {user.address}</p>
                <p>Date of Birth: {user.dateOfBirth}</p>
                <p>Gender: {user.gender}</p>

            </div>
            <div className="user-posts">
                <h2>Your Posts</h2>
                {userPosts.length > 0 ? (
                    userPosts.map((post, index) => (
                        <div key={index} className="blog-post">
                        <h2 className="blog-title">{post.title}</h2>
                        {post.images.length > 0 && <img src={post.images[0]} alt="Blog visual" className="blog-image" />}
                        <div className="blog-meta">
                            {/* Display the username from the post object */}
                            <h1 className="blog-username">By: {post.username || "Anonymous"}</h1>
                            <h1 className="blog-date">Published on: {post.date}</h1>
                        </div>
                        <div className="blog-content">{post.content}</div>
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
                    <p>You haven't created any posts yet.</p>
                )}
            </div>
        </div>
    );
};

export default UserDashboard;