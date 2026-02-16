import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#fffdfa] flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-lapis-900 mb-4 font-display">
                    404
                </h1>
                <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">
                    Không tìm thấy dự án
                </h2>
                <p className="text-gray-600 mb-8">
                    Dự án bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
                </p>
                <Link
                    href="/du-an"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-lapis-600 to-lapis-500 hover:from-lapis-700 hover:to-lapis-600 text-white font-bold rounded-full shadow-lg transition-all hover:scale-105"
                >
                    ← Quay lại danh sách dự án
                </Link>
            </div>
        </div>
    );
}
