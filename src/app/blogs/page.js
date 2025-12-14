'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { Section, SectionDivider, SectionTitle } from '@/styles/GlobalComponents';
import { BlogSection, BlogCard, CardImg, TitleContent, HeaderThree, Hr, CardInfo, TagList, Tag } from '@/components/Blogs/BlogStyles';
import Blogs from '@/components/Blogs/Blogs';

const ViewAllContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const StyledBlogCard = styled(BlogCard)`
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(156, 201, 227, 0.3);
  }
`;

const BlogDate = styled.div`
  color: #999;
  font-size: 1.2rem;
  padding: 1rem 0;
`;

const CategoryTag = styled.span`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background: #d0bb57;
  color: #0F1624;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 1rem 0;
`;

export default function BlogsPage() {
  return (
    <ViewAllContainer>
      <Blogs />
    </ViewAllContainer>
  );
}
