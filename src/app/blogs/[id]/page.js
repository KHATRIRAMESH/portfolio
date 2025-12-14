'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  max-width:auto;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  paddisng: 4rem 2rem;
  min-height: 100vh;
  background: #0F1624;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #9cc9e3;
  text-decoration: none;
  font-size: 1.4rem;
  margin-bottom: 2rem;
  transition: color 0.3s;
  
  &:hover {
    color: #d0bb57;
  }
`;

const BlogImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 2rem;
`;

const BlogHeader = styled.div`
  margin-bottom: 2rem;
`;

const BlogCategory = styled.span`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #d0bb57;
  color: #0F1624;
  border-radius: 5px;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const BlogTitle = styled.h1`
  font-size: 4rem;
  color: #9cc9e3;
  margin: 1rem 0;
  line-height: 1.2;
  
  @media ${props => props.theme?.breakpoints?.sm || '(max-width: 640px)'} {
    font-size: 3rem;
  }
`;

const BlogMeta = styled.div`
  display: flex;
  gap: 2rem;
  color: #999;
  font-size: 1.3rem;
  margin-top: 1rem;
`;

const BlogContent = styled.div`
  color: #e4e6e7;
  font-size: 1.6rem;
  line-height: 1.8;
  white-space: pre-wrap;
  
  p {
    margin-bottom: 1.5rem;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: #9cc9e3;
  font-size: 2rem;
  padding: 4rem;
`;

const ErrorMessage = styled(LoadingMessage)`
  color: #ff4444;
`;

export default function BlogDetailPage({ params }) {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blogId, setBlogId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Unwrap the params Promise
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setBlogId(resolvedParams.id);
    };
    unwrapParams();
  }, [params]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/blogs/${blogId}`);
        setBlog(response.data);
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError(err.response?.status === 404 ? 'Blog not found' : 'Failed to load blog');
      } finally {
        setLoading(false);
      }
    };

    if (blogId) {
      fetchBlog();
    }
  }, [blogId]);

  if (loading) return <LoadingMessage>Loading blog...</LoadingMessage>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!blog) return <ErrorMessage>Blog not found</ErrorMessage>;

  return (
    <Container>
      <BackButton href="/blogs">← Back to Blogs</BackButton>

      {blog.image && (
        <BlogImage src={blog.image} alt={blog.title} />
      )}

      <BlogHeader>
        <BlogCategory>{blog.category}</BlogCategory>
        <BlogTitle>{blog.title}</BlogTitle>
        <BlogMeta>
          <span>
            {new Date(blog.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </BlogMeta>
      </BlogHeader>

      <BlogContent>
        {blog.content}
      </BlogContent>
    </Container>
  );
}
