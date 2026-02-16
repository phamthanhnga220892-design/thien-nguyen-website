import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

export async function GET() {
    const uri = process.env.MONGODB_URI;
    const isDefined = !!uri;
    // Mask the password for security in response
    const maskedUri = uri ? uri.replace(/:([^@]+)@/, ':****@') : 'undefined';

    const status = {
        envVar: {
            defined: isDefined,
            value: maskedUri,
            allKeys: Object.keys(process.env).sort()
        },
        mongoose: {
            readyState: mongoose.connection.readyState,
            readyStateText: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState] || 'unknown',
            dbName: mongoose.connection.name
        },
        connectionError: null as any,
        testQuery: null as any
    };

    try {
        console.log('Attempting debug connection...');
        await dbConnect();
        status.mongoose.readyState = mongoose.connection.readyState;
        status.mongoose.readyStateText = ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState];

        // Try a simple query
        const collectionList = await mongoose.connection.db?.listCollections().toArray();
        status.testQuery = {
            success: true,
            collections: collectionList?.map(c => c.name) || []
        };

        return NextResponse.json(status);
    } catch (error: any) {
        console.error('Debug connection error:', error);
        status.connectionError = {
            message: error.message,
            name: error.name,
            code: error.code,
            codeName: error.codeName
        };
        return NextResponse.json(status, { status: 500 });
    }
}
