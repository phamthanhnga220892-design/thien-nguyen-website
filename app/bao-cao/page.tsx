import React from 'react';
import { FileText, Download, Calendar, Eye, ShieldCheck, Clock } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export default async function FinancialReportsPage() {
    // Fetch reports from API
    let reports: any[] = [];
    try {
        const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/reports`, {
            cache: 'no-store'
        });
        if (response.ok) {
            const data = await response.json();
            reports = data.data || [];
        }
    } catch (error) {
        console.error('Error fetching reports:', error);
    }

    // Group reports by year
    const reportsByYear = reports.reduce((acc: any, report: any) => {
        const year = report.year;
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(report);
        return acc;
    }, {});

    const years = Object.keys(reportsByYear).sort((a, b) => parseInt(b) - parseInt(a));

    const getTypeLabel = (type: string) => {
        const labels: { [key: string]: string } = {
            income: 'Thu',
            expense: 'Chi',
            summary: 'Tổng hợp',
        };
        return labels[type] || type;
    };

    const getTypeColor = (type: string) => {
        const colors: { [key: string]: string } = {
            income: 'bg-green-100 text-green-700',
            expense: 'bg-red-100 text-red-700',
            summary: 'bg-blue-100 text-blue-700',
        };
        return colors[type] || 'bg-gray-100 text-gray-700';
    };

    const monthNames = [
        '', 'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
        'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
    ];

    return (
        <div className="min-h-screen bg-[#fffdfa]">
            <Breadcrumb items={[{ label: 'Báo cáo tài chính', href: '/bao-cao' }]} />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-24">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-5 py-2 rounded-full bg-amber-400 text-amber-950 text-xs font-bold uppercase tracking-[0.2em] mb-8 shadow-lg shadow-amber-200">
                        Minh Bạch Tuyệt Đối
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-lapis-900 mb-6 font-display">
                        Báo Cáo Tài Chính
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Tại Tâm Nga, mỗi đồng đóng góp đều được trân quý và sử dụng đúng mục đích.
                        Chúng tôi cam kết minh bạch 100% trong mọi hoạt động tài chính.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {[
                        {
                            icon: ShieldCheck,
                            title: 'Minh Bạch 100%',
                            description: 'Công khai toàn bộ thông tin thu chi'
                        },
                        {
                            icon: Clock,
                            title: 'Cập Nhật Định Kỳ',
                            description: 'Báo cáo được cập nhật hàng tháng'
                        },
                        {
                            icon: Eye,
                            title: 'Tra Cứu Dễ Dàng',
                            description: 'Xem và tải báo cáo bất kỳ lúc nào'
                        }
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-lapis-50 to-white rounded-[2rem] p-8 text-center border border-lapis-100 hover:-translate-y-2 transition-transform duration-300"
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lapis-600 text-white mb-6">
                                <feature.icon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-lapis-900 mb-3 font-display">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Reports by Year */}
                {years.length > 0 ? (
                    <div className="space-y-12">
                        {years.map((year) => (
                            <div key={year} className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100">
                                <h2 className="text-3xl font-bold text-lapis-900 mb-6 font-display">
                                    Năm {year}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {reportsByYear[year]
                                        .sort((a: any, b: any) => b.month - a.month)
                                        .map((report: any) => (
                                            <div
                                                key={report._id}
                                                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:-translate-y-1 transition-transform duration-300"
                                            >
                                                {/* Icon */}
                                                <div className={`inline-flex p-3 rounded-xl mb-4 ${report.fileType === 'pdf' ? 'bg-red-100' : 'bg-blue-100'
                                                    }`}>
                                                    <FileText className={`h-6 w-6 ${report.fileType === 'pdf' ? 'text-red-600' : 'text-blue-600'
                                                        }`} />
                                                </div>

                                                {/* Title */}
                                                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                                                    {report.title}
                                                </h3>

                                                {/* Meta */}
                                                <div className="space-y-2 mb-4">
                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <Calendar className="h-4 w-4 mr-2" />
                                                        {monthNames[report.month]} {report.year}
                                                    </div>
                                                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(report.type)}`}>
                                                        {getTypeLabel(report.type)}
                                                    </span>
                                                </div>

                                                {/* Description */}
                                                {report.description && (
                                                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                                        {report.description}
                                                    </p>
                                                )}

                                                {/* Actions */}
                                                <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                                                    <a
                                                        href={report.fileUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 text-sm text-lapis-600 hover:text-lapis-700 hover:bg-lapis-50 rounded-lg transition-colors"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                        <span>Xem</span>
                                                    </a>
                                                    <a
                                                        href={report.fileUrl}
                                                        download
                                                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 text-sm text-white bg-lapis-600 hover:bg-lapis-700 rounded-lg transition-colors"
                                                    >
                                                        <Download className="h-4 w-4" />
                                                        <span>Tải về</span>
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="bg-white rounded-[2rem] p-16 text-center shadow-xl border border-gray-100">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FileText className="h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 font-display">
                            Chưa có báo cáo nào
                        </h3>
                        <p className="text-gray-600">
                            Các báo cáo tài chính sẽ được cập nhật định kỳ hàng tháng.
                        </p>
                    </div>
                )}

                {/* Note */}
                <div className="mt-16 bg-amber-50 rounded-[2rem] p-8 border border-amber-100">
                    <p className="text-gray-700 text-center leading-relaxed">
                        <strong className="text-amber-900">Lưu ý:</strong> Tất cả các giao dịch đều được
                        ghi nhận và công khai minh bạch. Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ với
                        chúng tôi qua email hoặc số điện thoại.
                    </p>
                </div>
            </div>
        </div>
    );
}
