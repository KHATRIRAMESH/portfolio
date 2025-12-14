'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 2rem;
  background: #0F1624;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
`;

const Title = styled.h1`
  color: #9cc9e3;
  margin-bottom: 2rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #444;
  border-radius: 5px;
  background: #1a1a2e;
  color: #fff;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #9cc9e3;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #444;
  border-radius: 5px;
  background: #1a1a2e;
  color: #fff;
  font-size: 16px;
  min-height: 150px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #9cc9e3;
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  background: #d0bb57;
  color: #0F1624;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #e0cb67;
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
  }
`;

const Message = styled.div`
  padding: 12px;
  border-radius: 5px;
  text-align: center;
  background: ${props => props.error ? '#ff4444' : '#44ff44'};
  color: #000;
`;

const LogoutButton = styled(Button)`
  background: #ff4444;
  margin-bottom: 1rem;

  &:hover {
    background: #ff6666;
  }
`;

export default function CreateBlogPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginForm, setLoginForm] = useState({ username: '', password: '' });
    const [blogForm, setBlogForm] = useState({
        title: '',
        content: '',
        category: '',
        image: ''
    });
    const [message, setMessage] = useState({ text: '', error: false });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Check if token exists
        const token = localStorage.getItem('adminToken');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: '', error: false });

        try {
            const response = await axios.post('/api/auth/login', loginForm);
            localStorage.setItem('adminToken', response.data.token);
            setIsLoggedIn(true);
            setMessage({ text: 'Login successful!', error: false });
        } catch (error) {
            setMessage({
                text: error.response?.data?.error || 'Login failed',
                error: true
            });
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setIsLoggedIn(false);
        setMessage({ text: '', error: false });
    };

    const handleCreateBlog = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: '', error: false });

        try {
            const token = localStorage.getItem('adminToken');
            await axios.post('/api/blogs', blogForm, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessage({ text: 'Blog created successfully!', error: false });
            setBlogForm({ title: '', content: '', category: '', image: '' });
        } catch (error) {
            setMessage({
                text: error.response?.data?.error || 'Failed to create blog',
                error: true
            });
            if (error.response?.status === 401) {
                handleLogout();
            }
        } finally {
            setLoading(false);
        }
    };

    if (!isLoggedIn) {
        return (
            <Container>
                <Title>Admin Login</Title>
                <Form onSubmit={handleLogin}>
                    <Input
                        type="text"
                        placeholder="Username"
                        value={loginForm.username}
                        onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        required
                    />
                    {message.text && <Message error={message.error}>{message.text}</Message>}
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </Form>
            </Container>
        );
    }

    return (
        <Container>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            <Title>Create New Blog</Title>
            <Form onSubmit={handleCreateBlog}>
                <Input
                    type="text"
                    placeholder="Title"
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    required
                />
                <Input
                    type="text"
                    placeholder="Category"
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    required
                />
                <Input
                    type="url"
                    placeholder="Image URL"
                    value={blogForm.image}
                    onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                    required
                />
                <TextArea
                    placeholder="Content"
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    required
                />
                {message.text && <Message error={message.error}>{message.text}</Message>}
                <Button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Blog'}
                </Button>
            </Form>
        </Container>
    );
}
