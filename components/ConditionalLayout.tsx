'use client';

import { usePathname } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Don't show Header/Footer for admin and auth pages
    const isAdminOrAuth = pathname?.startsWith('/admin') || pathname?.startsWith('/auth');

    if (isAdminOrAuth) {
        return <>{children}</>;
    }

    return (
        <>
            <Header />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
        </>
    );
}
