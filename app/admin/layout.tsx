import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import Sidebar from '@/components/admin/Sidebar';

export default async function AdminLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params?: any;
}) {
    const session = await getServerSession(authOptions);

    // Redirect to login if not authenticated
    if (!session) {
        redirect('/auth/login');
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar userName={session.user.name} />
            <main className="lg:ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
