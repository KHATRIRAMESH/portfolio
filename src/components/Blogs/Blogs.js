'use client';

import React, { useEffect, useState } from 'react';
import { Section, SectionDivider, SectionTitle } from '@/styles/GlobalComponents';
import { BlogCard, CardInfo, HeaderThree, Hr, Tag, TagList, TitleContent, BlogSection, CardImg } from './BlogStyles';
import axios from 'axios';

import Link from 'next/link';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('/api/blogs');
                setBlogs(response.data);
            } catch (error) {
                console.error("Failed to fetch blogs", error);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <Section id="blogs">
            <SectionDivider />
            <SectionTitle main>Blogs</SectionTitle>
            <BlogSection>
                {blogs.map((blog) => (
                    <Link key={blog.id} href={`/blogs/${blog.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <BlogCard>
                            <CardImg src={blog.image || 'https://via.placeholder.com/400'} alt={blog.title} />
                            <TitleContent>
                                <HeaderThree title>{blog.title}</HeaderThree>
                                <Hr />
                            </TitleContent>
                            <CardInfo>{blog.content.substring(0, 150)}...</CardInfo>
                            <div>
                                <TagList>
                                    {blog.category && <Tag>{blog.category}</Tag>}
                                </TagList>
                            </div>
                        </BlogCard>
                    </Link>
                ))}
            </BlogSection>
        </Section>
    );
};

export default Blogs;
