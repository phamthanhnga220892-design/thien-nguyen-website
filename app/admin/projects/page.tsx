import React from 'react';
import Link from 'next/link';
import { Plus, Search, Eye, Edit } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

async function getProjects() {
    try {
        const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/projects?limit=100`, {
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch projects');
        }

        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}

export default async function AdminProjectsPage() {
    const projects = await getProjects();

    const getStatusLabel = (status: string) => {
        return status === 'ongoing' ? 'Đang triển khai' : 'Đã hoàn thành';
    };

    const getStatusColor = (status: string) => {
        return status === 'ongoing'
            ? 'bg-blue-100 text-blue-700'
            : 'bg-green-100 text-green-700';
    };

    const getTypeLabel = (type: string) => {
        const labels: { [key: string]: string } = {
            featured: 'Tiêu biểu',
            support: 'Hỗ trợ',
            normal: 'Thường',
        };
        return labels[type] || type;
    };

    const calculateProgress = (current: number, target?: number) => {
        if (!target || target === 0) return 0;
        return Math.min((current / target) * 100, 100);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 font-display">Quản lý dự án</h1>
                    <p className="text-gray-600 mt-1">Tất cả các dự án thiện nguyện</p>
                </div>
                <Link
                    href="/admin/projects/new"
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-lapis-600 to-lapis-500 hover:from-lapis-700 hover:to-lapis-600 text-white font-semibold rounded-full shadow-lg shadow-lapis-200 transition-all hover:scale-105"
                >
                    <Plus className="h-5 w-5" />
                    <span>Tạo dự án mới</span>
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm dự án..."
                            className="w-full pl-12 pr-6 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-lapis-500 outline-none"
                        />
                    </div>
                    <select className="px-6 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-lapis-500 outline-none font-medium">
                        <option value="">Tất cả trạng thái</option>
                        <option value="ongoing">Đang triển khai</option>
                        <option value="completed">Đã hoàn thành</option>
                    </select>
                    <select className="px-6 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-lapis-500 outline-none font-medium">
                        <option value="">Tất cả loại</option>
                        <option value="featured">Tiêu biểu</option>
                        <option value="support">Hỗ trợ</option>
                        <option value="normal">Thường</option>
                    </select>
                </div>
            </div>

            {/* Projects Table */}
            {projects.length > 0 ? (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Dự án
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Trạng thái
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Loại
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Tiến độ
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Ngày tạo
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Hành động
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {projects.map((project: any) => (
                                    <tr key={project._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-4">
                                                {project.thumbnail && (
                                                    <img
                                                        src={project.thumbnail}
                                                        alt={project.title}
                                                        className="w-16 h-16 rounded-lg object-cover"
                                                    />
                                                )}
                                                <div>
                                                    <p className="font-semibold text-gray-900">{project.title}</p>
                                                    <p className="text-sm text-gray-500 line-clamp-1">
                                                        {project.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                                    project.status
                                                )}`}
                                            >
                                                {getStatusLabel(project.status)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-600">
                                                {getTypeLabel(project.type)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-600">
                                                        {formatCurrency(project.totalDonated || 0)}
                                                    </span>
                                                    {project.targetAmount && (
                                                        <span className="text-gray-500">
                                                            / {formatCurrency(project.targetAmount)}
                                                        </span>
                                                    )}
                                                </div>
                                                {project.targetAmount && (
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-lapis-600 h-2 rounded-full transition-all"
                                                            style={{
                                                                width: `${calculateProgress(
                                                                    project.totalDonated || 0,
                                                                    project.targetAmount
                                                                )}%`,
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {formatDate(project.createdAt)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end space-x-2">
                                                <Link
                                                    href={`/du-an/${project._id}`}
                                                    target="_blank"
                                                    className="p-2 text-gray-600 hover:text-lapis-600 hover:bg-lapis-50 rounded-lg transition-colors"
                                                    title="Xem"
                                                >
                                                    <Eye className="h-5 w-5" />
                                                </Link>
                                                <Link
                                                    href={`/admin/projects/${project._id}/edit`}
                                                    className="p-2 text-gray-600 hover:text-lapis-600 hover:bg-lapis-50 rounded-lg transition-colors"
                                                    title="Chỉnh sửa"
                                                >
                                                    <Edit className="h-5 w-5" />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                /* Empty State */
                <div className="bg-white rounded-2xl p-16 text-center shadow-lg border border-gray-100">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Plus className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 font-display">
                        Chưa có dự án nào
                    </h3>
                    <p className="text-gray-600 mb-6">Bắt đầu bằng cách tạo dự án đầu tiên</p>
                    <Link
                        href="/admin/projects/new"
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-lapis-600 hover:bg-lapis-700 text-white font-semibold rounded-full transition-colors"
                    >
                        <Plus className="h-5 w-5" />
                        <span>Tạo dự án mới</span>
                    </Link>
                </div>
            )}
        </div>
    );
}
