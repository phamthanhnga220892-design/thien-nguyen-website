import Link from 'next/link';
import { Facebook, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-lapis-600 p-2 rounded-full">
                <Heart className="h-5 w-5 text-white fill-current" />
              </div>
              <span className="text-2xl font-bold font-display text-white">Thiện nguyện Tâm Nga</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Hành trình kết nối những trái tim nhân ái, mang ánh sáng của sự sẻ chia tới những mảnh đời còn nhiều sương gió trên khắp đất nước Việt Nam.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/nga.pham.79069323" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-lapis-600 hover:text-white transition-all"><Facebook className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-8 font-display text-xl">Liên kết hữu duyên</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/du-an" className="hover:text-amber-400 transition-colors flex items-center"><span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></span>Các chương trình đang chạy</Link></li>
              <li><Link href="/bao-cao" className="hover:text-amber-400 transition-colors flex items-center"><span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></span>Báo cáo minh bạch</Link></li>
              <li><Link href="/ung-ho" className="hover:text-amber-400 transition-colors flex items-center"><span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></span>Hướng dẫn phát tâm</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-8 font-display text-xl">Thông tin liên hệ</h3>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start space-x-4">
                <MapPin className="h-5 w-5 text-lapis-400 shrink-0 mt-0.5" />
                <span className="text-gray-400">418 Quang Trung, Hà Đông, Hà Nội</span>
              </li>
              <li className="flex items-center space-x-4">
                <Phone className="h-5 w-5 text-lapis-400 shrink-0" />
                <span className="text-gray-400">0345 119 464</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-16 pt-8 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Thiện nguyện Tâm Nga. Nguyện đem công đức này hướng về khắp tất cả.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
