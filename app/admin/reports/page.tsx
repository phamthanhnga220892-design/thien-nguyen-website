import React from 'react';
import Link from 'next/link';
import { Plus, Search, FileText, Image as ImageIcon, Calendar, Edit, Eye } from 'lucide-react';
import { formatDate } from '@/lib/utils';

import dbConnect from '@/lib/mongodb';
import Report from '@/models/Report';

async function getReports() {
    try {
        await dbConnect();
        const reports = await Report.find({})
            .sort({ year: -1, month: -1, createdAt: -1 })
            .limit(100)
            .lean();

        return JSON.parse(JSON.stringify(reports));
    } catch (error) {
        console.error('Error fetching reports:', error);
        return [];
    }
}

export default async function AdminReportsPage() {
    const reports = await getReports();

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
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 font-display">Báo cáo tài chính</h1>
                    <p className="text-gray-600 mt-1">Quản lý tất cả báo cáo thu chi</p>
                </div>
                <Link
                    href="/admin/reports/new"
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-lapis-600 to-lapis-500 hover:from-lapis-700 hover:to-lapis-600 text-white font-semibold rounded-full shadow-lg shadow-lapis-200 transition-all hover:scale-105"
                >
                    <Plus className="h-5 w-5" />
                    <span>Tạo báo cáo mới</span>
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm báo cáo..."
                            className="w-full pl-12 pr-6 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-lapis-500 outline-none"
                        />
                    </div>
                    <select className="px-6 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-lapis-500 outline-none font-medium">
                        <option value="">Tất cả loại</option>
                        <option value="income">Thu</option>
                        <option value="expense">Chi</option>
                        <option value="summary">Tổng hợp</option>
                    </select>
                    <select className="px-6 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-lapis-500 outline-none font-medium">
                        <option value="">Tất cả năm</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                    </select>
                </div>
            </div>

            {/* Reports Grid */}
            {reports.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reports.map((report: any) => (
                        <div
                            key={report._id}
                            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:-translate-y-1 transition-transform duration-300"
                        >
                            {/* File Type Icon */}
                            <div className={`inline-flex p-3 rounded-xl mb-4 ${report.fileType === 'pdf' ? 'bg-red-100' : 'bg-blue-100'
                                }`}>
                                {report.fileType === 'pdf' ? (
                                    <FileText className="h-6 w-6 text-red-600" />
                                ) : (
                                    <ImageIcon className="h-6 w-6 text-blue-600" />
                                )}
                            </div>

                            {/* Title */}
                            <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                                {report.title}
                            </h3>

                            {/* Description */}
                            {report.description && (
                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                    {report.description}
                                </p>
                            )}

                            {/* Meta Info */}
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center text-sm text-gray-600">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    {monthNames[report.month]} {report.year}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(report.type)}`}>
                                        {getTypeLabel(report.type)}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {formatDate(report.createdAt)}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                                <a
                                    href={report.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center space-x-1 px-4 py-2 text-sm text-gray-600 hover:text-lapis-600 hover:bg-lapis-50 rounded-lg transition-colors"
                                >
                                    <Eye className="h-4 w-4" />
                                    <span>Xem</span>
                                </a>
                                <Link
                                    href={`/admin/reports/${report._id}/edit`}
                                    className="flex-1 flex items-center justify-center space-x-1 px-4 py-2 text-sm text-white bg-lapis-600 hover:bg-lapis-700 rounded-lg transition-colors"
                                >
                                    <Edit className="h-4 w-4" />
                                    <span>Sửa</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Empty State */
                <div className="bg-white rounded-2xl p-16 text-center shadow-lg border border-gray-100">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FileText className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 font-display">
                        Chưa có báo cáo nào
                    </h3>
                    <p className="text-gray-600 mb-6">Bắt đầu bằng cách tạo báo cáo đầu tiên</p>
                    <Link
                        href="/admin/reports/new"
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-lapis-600 hover:bg-lapis-700 text-white font-semibold rounded-full transition-colors"
                    >
                        <Plus className="h-5 w-5" />
                        <span>Tạo báo cáo mới</span>
                    </Link>
                </div>
            )}
        </div>
    );
}
