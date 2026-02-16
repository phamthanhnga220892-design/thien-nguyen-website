import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
    return (
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <ol className="flex items-center space-x-2 text-sm">
                <li>
                    <Link
                        href="/"
                        className="flex items-center text-gray-500 hover:text-lapis-600 transition-colors"
                    >
                        <Home className="h-4 w-4" />
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={index} className="flex items-center space-x-2">
                        <ChevronRight className="h-4 w-4 text-gray-300" />
                        {index === items.length - 1 ? (
                            <span className="text-lapis-600 font-semibold">{item.label}</span>
                        ) : (
                            <Link
                                href={item.href}
                                className="text-gray-500 hover:text-lapis-600 transition-colors"
                            >
                                {item.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
