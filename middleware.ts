import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware() {
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                // Require authentication for admin pages
                return !!token;
            },
        },
        pages: {
            signIn: '/auth/login',
        },
        secret: process.env.NEXTAUTH_SECRET,
    }
);

export const config = {
    // Only apply to admin routes, excluding login
    matcher: [
        '/admin/:path*',
    ],
};
