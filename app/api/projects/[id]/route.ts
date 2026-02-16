import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

interface RouteParams {
    params: Promise<{
        id: string;
    }>;
}

// GET /api/projects/[id] - Get single project
export async function GET(
    request: NextRequest,
    { params }: RouteParams
) {
    try {
        await dbConnect();

        const { id } = await params;

        // Try to find by _id first, then by slug
        let project;

        // Check if id is a valid MongoDB ObjectId
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            project = await Project.findById(id).lean();
        }

        // If not found by _id or not a valid ObjectId, try finding by slug
        if (!project) {
            project = await Project.findOne({ slug: id }).lean();
        }

        if (!project) {
            return NextResponse.json(
                { success: false, error: 'Không tìm thấy dự án' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: project });
    } catch (error) {
        console.error('Error fetching project:', error);
        return NextResponse.json(
            { success: false, error: 'Không thể tải dự án' },
            { status: 500 }
        );
    }
}

// PUT /api/projects/[id] - Update project (Admin only)
export async function PUT(
    request: NextRequest,
    { params }: RouteParams
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'admin') {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await dbConnect();

        const { id } = await params;

        const body = await request.json();
        const project = await Project.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        );

        if (!project) {
            return NextResponse.json(
                { success: false, error: 'Không tìm thấy dự án' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: project });
    } catch (error: any) {
        console.error('Error updating project:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Không thể cập nhật dự án' },
            { status: 500 }
        );
    }
}

// DELETE /api/projects/[id] - Delete project (Admin only)
export async function DELETE(
    request: NextRequest,
    { params }: RouteParams
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'admin') {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await dbConnect();

        const { id } = await params;

        const project = await Project.findByIdAndDelete(id);

        if (!project) {
            return NextResponse.json(
                { success: false, error: 'Không tìm thấy dự án' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Đã xóa dự án thành công'
        });
    } catch (error) {
        console.error('Error deleting project:', error);
        return NextResponse.json(
            { success: false, error: 'Không thể xóa dự án' },
            { status: 500 }
        );
    }
}
