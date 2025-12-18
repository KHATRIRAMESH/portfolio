import { db } from '@/db/drizzle';
import { blogTable } from '@/db/schema';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

import { isAuthenticated } from '@/lib/auth';

export async function GET(request, { params }) {
    try {
        const resolvedParams = await params;
        const id = parseInt(resolvedParams.id);

        if (isNaN(id)) {
            return NextResponse.json({ error: 'Invalid blog ID' }, { status: 400 });
        }

        const blogs = await db.select().from(blogTable).where(eq(blogTable.id, id));

        if (blogs.length === 0) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json(blogs[0]);
    } catch (error) {
        console.error('Error fetching blog:', error);
        return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    if (!isAuthenticated(request)) {
        return NextResponse.json(
            { error: 'Unauthorized. Please login as admin.' },
            { status: 401 }
        );
    }

    try {
        const resolvedParams = await params;
        const id = parseInt(resolvedParams.id);
        const { title, content, category, image } = await request.json();

        if (isNaN(id)) {
            return NextResponse.json({ error: 'Invalid blog ID' }, { status: 400 });
        }

        const updatedBlog = await db.update(blogTable)
            .set({
                title,
                content,
                category,
                image,
                updatedAt: new Date()
            })
            .where(eq(blogTable.id, id))
            .returning();

        if (updatedBlog.length === 0) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json(updatedBlog[0]);
    } catch (error) {
        console.error('Error updating blog:', error);
        return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
    }
}
