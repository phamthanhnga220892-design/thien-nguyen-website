import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

// GET /api/projects - Get all projects
export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const featured = searchParams.get('featured');
        const type = searchParams.get('type');
        const limit = parseInt(searchParams.get('limit') || '100');

        const query: any = {};
        if (status) query.status = status;
        if (featured) query.featured = featured === 'true';
        if (type) query.type = type;

        const projects = await Project.find(query)
            .sort({ createdAt: -1 })
            .limit(limit)
            .lean();

        return NextResponse.json({ success: true, data: projects });
    } catch (error) {
        console.error('Error fetching projects:', error);
        return NextResponse.json(
            { success: false, error: 'Không thể tải dự án' },
            { status: 500 }
        );
    }
}

// POST /api/projects - Create new project (Admin only)
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'admin') {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await dbConnect();

        const body = await request.json();
        const project = await Project.create(body);

        return NextResponse.json(
            { success: true, data: project },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error creating project:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Không thể tạo dự án' },
            { status: 500 }
        );
    }
}
