'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Giới thiệu', href: '/gioi-thieu' },
    { name: 'Chương trình', href: '/chuong-trinh' },
    { name: 'Báo cáo', href: '/bao-cao' },
    { name: 'Liên hệ', href: '/lien-he' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-white/90 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-amber-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-tr from-lapis-500 to-lapis-400 p-2.5 rounded-full shadow-lg shadow-lapis-200 group-hover:scale-110 transition-transform">
              <Heart className="h-6 w-6 text-white fill-white/20" />
            </div>
            <span className="text-2xl font-bold font-display text-lapis-800 group-hover:text-lapis-600 transition-colors">
              Thiện nguyện Tâm Nga
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-gray-700 hover:text-lapis-600 font-semibold transition-colors relative group ${isActive(item.href) ? 'text-lapis-600' : ''
                  }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300 ${isActive(item.href) ? 'w-full' : ''
                    }`}
                ></span>
              </Link>
            ))}
            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-100">
              {/* Donation Icon Button */}
              <Link
                href="/ung-ho"
                title="Phát Tâm"
                className="p-2.5 text-white bg-gradient-to-r from-lapis-600 to-lapis-500 rounded-full hover:shadow-xl hover:shadow-lapis-200 transition-all active:scale-95"
              >
                <Heart className="h-5 w-5 fill-current" />
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-lapis-50 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-xl border-t border-amber-100">
            <nav className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 px-4 rounded-2xl font-semibold transition-colors ${isActive(item.href)
                      ? 'bg-lapis-600 text-white'
                      : 'text-gray-700 hover:bg-lapis-50'
                    }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/ung-ho"
                onClick={() => setIsOpen(false)}
                className="block py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-400 text-white font-bold rounded-2xl text-center shadow-lg shadow-amber-200"
              >
                Phát Tâm Ngay
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
