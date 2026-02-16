import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';

export async function GET() {
    try {
        await dbConnect();
        return NextResponse.json({
            success: true,
            message: '✅ Kết nối MongoDB Atlas thành công!',
            database: 'thien-nguyen-db'
        });
    } catch (error) {
        console.error('Lỗi kết nối:', error);
        return NextResponse.json(
            {
                success: false,
                message: '❌ Lỗi kết nối MongoDB',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
