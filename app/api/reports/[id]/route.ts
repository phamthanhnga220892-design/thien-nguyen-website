import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Report from '@/models/Report';
import { deleteImage } from '@/lib/cloudinary';

interface RouteParams {
    params: Promise<{
        id: string;
    }>;
}

// GET /api/reports/[id] - Get single report
export async function GET(
    request: NextRequest,
    { params }: RouteParams
) {
    try {
        await dbConnect();
        const { id } = await params;

        const report = await Report.findById(id)
            .populate('createdBy', 'name email')
            .lean();

        if (!report) {
            return NextResponse.json(
                { success: false, error: 'Không tìm thấy báo cáo' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: report });
    } catch (error) {
        console.error('Error fetching report:', error);
        return NextResponse.json(
            { success: false, error: 'Không thể tải báo cáo' },
            { status: 500 }
        );
    }
}

// PUT /api/reports/[id] - Update report (Admin only)
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
        const report = await Report.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        );

        if (!report) {
            return NextResponse.json(
                { success: false, error: 'Không tìm thấy báo cáo' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: report });
    } catch (error: any) {
        console.error('Error updating report:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Không thể cập nhật báo cáo' },
            { status: 500 }
        );
    }
}

// DELETE /api/reports/[id] - Delete report (Admin only)
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

        const report = await Report.findById(id);

        if (!report) {
            return NextResponse.json(
                { success: false, error: 'Không tìm thấy báo cáo' },
                { status: 404 }
            );
        }

        // Delete file from Cloudinary if exists
        if (report.publicId) {
            try {
                await deleteImage(report.publicId);
            } catch (err) {
                console.error('Error deleting file from Cloudinary:', err);
                // Continue with deletion even if Cloudinary delete fails
            }
        }

        await Report.findByIdAndDelete(id);

        return NextResponse.json({
            success: true,
            message: 'Đã xóa báo cáo thành công'
        });
    } catch (error) {
        console.error('Error deleting report:', error);
        return NextResponse.json(
            { success: false, error: 'Không thể xóa báo cáo' },
            { status: 500 }
        );
    }
}
