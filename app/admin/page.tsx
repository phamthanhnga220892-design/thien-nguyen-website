import React from 'react';
import {
    FolderOpen,
    Heart,
    TrendingUp,
    FileText,
    Plus,
    Eye,
    Edit,
    ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import Report from '@/models/Report';

async function getDashboardData() {
    try {
        await dbConnect();

        // Fetch projects
        const projects = await Project.find({})
            .sort({ createdAt: -1 })
            .limit(100)
            .lean();

        // Fetch reports
        const reports = await Report.find({})
            .sort({ year: -1, month: -1, createdAt: -1 })
            .limit(100)
            .lean();

        // Calculate stats
        const totalProjects = projects.length;
        const ongoingProjects = projects.filter((p: any) => p.status === 'ongoing').length;
        const totalDonated = projects.reduce((sum: number, p: any) => sum + (p.totalDonated || 0), 0);
        const totalReports = reports.length;

        // Serialize data
        return {
            stats: {
                totalProjects,
                ongoingProjects,
                totalDonated,
                totalReports,
            },
            recentProjects: JSON.parse(JSON.stringify(projects.slice(0, 5))),
            recentReports: JSON.parse(JSON.stringify(reports.slice(0, 3))),
        };
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        return {
            stats: {
                totalProjects: 0,
                ongoingProjects: 0,
                totalDonated: 0,
                totalReports: 0,
            },
            recentProjects: [],
            recentReports: [],
        };
    }
}

export default async function AdminDashboard() {
    const { stats, recentProjects, recentReports } = await getDashboardData();

    const statsCards = [
        {
            icon: FolderOpen,
            label: 'Tổng dự án',
            value: stats.totalProjects.toString(),
            change: `${stats.ongoingProjects} đang triển khai`,
            color: 'from-lapis-500 to-lapis-400',
            href: '/admin/projects',
        },
        {
            icon: Heart,
            label: 'Dự án đang triển khai',
            value: stats.ongoingProjects.toString(),
            change: 'Đang hoạt động',
            color: 'from-amber-500 to-amber-400',
            href: '/admin/projects',
        },
        {
            icon: TrendingUp,
            label: 'Tổng quyên góp',
            value: formatCurrency(stats.totalDonated),
            change: 'Tích lũy',
            color: 'from-green-500 to-green-400',
            href: '/admin/projects',
        },
        {
            icon: FileText,
            label: 'Báo cáo tài chính',
            value: stats.totalReports.toString(),
            change: 'Đã công khai',
            color: 'from-pink-500 to-pink-400',
            href: '/admin/reports',
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 font-display">Dashboard</h1>
                    <p className="text-gray-600 mt-1">Chào mừng trở lại! Đây là tổng quan hoạt động.</p>
                </div>
                <Link
                    href="/admin/projects/new"
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-lapis-600 to-lapis-500 hover:from-lapis-700 hover:to-lapis-600 text-white font-semibold rounded-full shadow-lg shadow-lapis-200 transition-all hover:scale-105"
                >
                    <Plus className="h-5 w-5" />
                    <span>Tạo dự án mới</span>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((stat, index) => (
                    <Link
                        key={index}
                        href={stat.href}
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:-translate-y-1 transition-transform duration-300"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white`}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                        </div>
                        <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.label}</h3>
                        <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                        <p className="text-xs text-gray-500">{stat.change}</p>
                    </Link>
                ))}
            </div>

            {/* Recent Projects */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900 font-display">Dự án gần đây</h2>
                    <Link
                        href="/admin/projects"
                        className="text-sm text-lapis-600 hover:text-lapis-700 font-semibold flex items-center space-x-1"
                    >
                        <span>Xem tất cả</span>
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
                <div className="divide-y divide-gray-200">
                    {recentProjects.length > 0 ? (
                        recentProjects.map((project: any) => (
                            <div key={project._id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4 flex-1">
                                        {project.thumbnail && (
                                            <img
                                                src={project.thumbnail}
                                                alt={project.title}
                                                className="w-12 h-12 rounded-lg object-cover"
                                            />
                                        )}
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900">{project.title}</h3>
                                            <p className="text-sm text-gray-500">
                                                {project.status === 'ongoing' ? 'Đang triển khai' : 'Đã hoàn thành'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Link
                                            href={`/du-an/${project.slug}`}
                                            target="_blank"
                                            className="p-2 text-gray-600 hover:text-lapis-600 hover:bg-lapis-50 rounded-lg transition-colors"
                                        >
                                            <Eye className="h-5 w-5" />
                                        </Link>
                                        <Link
                                            href={`/admin/projects/${project._id}/edit`}
                                            className="p-2 text-gray-600 hover:text-lapis-600 hover:bg-lapis-50 rounded-lg transition-colors"
                                        >
                                            <Edit className="h-5 w-5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="px-6 py-12 text-center text-gray-500">
                            Chưa có dự án nào
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link
                    href="/admin/projects/new"
                    className="bg-gradient-to-br from-lapis-50 to-white rounded-2xl p-6 border border-lapis-100 hover:-translate-y-1 transition-transform duration-300"
                >
                    <div className="w-12 h-12 bg-lapis-600 rounded-xl flex items-center justify-center text-white mb-4">
                        <Plus className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 font-display">Tạo dự án mới</h3>
                    <p className="text-sm text-gray-600">Thêm dự án thiện nguyện mới</p>
                </Link>

                <Link
                    href="/admin/reports/new"
                    className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 border border-green-100 hover:-translate-y-1 transition-transform duration-300"
                >
                    <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white mb-4">
                        <FileText className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 font-display">Thêm báo cáo</h3>
                    <p className="text-sm text-gray-600">Upload báo cáo tài chính mới</p>
                </Link>

                <Link
                    href="/bao-cao"
                    target="_blank"
                    className="bg-gradient-to-br from-amber-50 to-white rounded-2xl p-6 border border-amber-100 hover:-translate-y-1 transition-transform duration-300"
                >
                    <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center text-white mb-4">
                        <Eye className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 font-display">Xem trang công khai</h3>
                    <p className="text-sm text-gray-600">Kiểm tra giao diện người dùng</p>
                </Link>
            </div>
        </div>
    );
}
