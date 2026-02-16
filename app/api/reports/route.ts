import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Report from '@/models/Report';

// GET /api/reports - Get all reports (public)
export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const year = searchParams.get('year');
        const month = searchParams.get('month');
        const type = searchParams.get('type');
        const limit = parseInt(searchParams.get('limit') || '100');

        const query: any = {};
        if (year) query.year = parseInt(year);
        if (month) query.month = parseInt(month);
        if (type) query.type = type;

        const reports = await Report.find(query)
            .sort({ year: -1, month: -1, createdAt: -1 })
            .limit(limit)
            .populate('createdBy', 'name email')
            .lean();

        return NextResponse.json({ success: true, data: reports });
    } catch (error) {
        console.error('Error fetching reports:', error);
        return NextResponse.json(
            { success: false, error: 'Không thể tải báo cáo' },
            { status: 500 }
        );
    }
}

// POST /api/reports - Create new report (Admin only)
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

        // Add createdBy from session
        const reportData = {
            ...body,
            createdBy: session.user.id
        };

        const report = await Report.create(reportData);

        return NextResponse.json(
            { success: true, data: report },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error creating report:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Không thể tạo báo cáo' },
            { status: 500 }
        );
    }
}
