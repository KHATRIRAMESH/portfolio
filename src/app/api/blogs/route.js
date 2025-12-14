import { db } from '@/db/drizzle';
import { blogTable } from '@/db/schema';
import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';

export async function GET(request) {
    try {
        const blogs = await db.select().from(blogTable);
        return NextResponse.json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
    }
}

export async function POST(request) {
    // Check authentication
    if (!isAuthenticated(request)) {
        return NextResponse.json(
            { error: 'Unauthorized. Please login as admin.' },
            { status: 401 }
        );
    }

    try {
        const { title, content, category, image } = await request.json();
        const blog = await db.insert(blogTable).values({ title, content, category, image }).returning();
        return NextResponse.json(blog[0], { status: 201 });
    } catch (error) {
        console.error('Error creating blog:', error);
        return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
    }
}   
