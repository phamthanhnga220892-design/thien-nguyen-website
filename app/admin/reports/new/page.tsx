'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import FileUpload from '@/components/admin/FileUpload';

export default function NewReportPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        type: 'summary' as 'income' | 'expense' | 'summary',
        fileUrl: '',
        fileType: 'pdf' as 'pdf' | 'image',
        publicId: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Validate required fields
            if (!formData.fileUrl) {
                setError('Vui lòng upload file báo cáo');
                setLoading(false);
                return;
            }

            const response = await fetch('/api/reports', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Không thể tạo báo cáo');
            }

            router.push('/admin/reports');
        } catch (err: any) {
            setError(err.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'month' || name === 'year' ? parseInt(value) : value,
        });
    };

    const handleFileUpload = (url: string, fileType: 'pdf' | 'image', publicId?: string) => {
        setFormData({
            ...formData,
            fileUrl: url,
            fileType,
            publicId: publicId || '',
        });
    };

    const months = [
        { value: 1, label: 'Tháng 1' },
        { value: 2, label: 'Tháng 2' },
        { value: 3, label: 'Tháng 3' },
        { value: 4, label: 'Tháng 4' },
        { value: 5, label: 'Tháng 5' },
        { value: 6, label: 'Tháng 6' },
        { value: 7, label: 'Tháng 7' },
        { value: 8, label: 'Tháng 8' },
        { value: 9, label: 'Tháng 9' },
        { value: 10, label: 'Tháng 10' },
        { value: 11, label: 'Tháng 11' },
        { value: 12, label: 'Tháng 12' },
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

    return (
        <div className="max-w-4xl space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-4">
                <Link
                    href="/admin/reports"
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 font-display">Tạo báo cáo mới</h1>
                    <p className="text-gray-600 mt-1">Thêm báo cáo tài chính mới</p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 space-y-6">
                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
                        <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                {/* Title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                        Tiêu đề <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-lapis-500 outline-none font-medium"
                        placeholder="Ví dụ: Báo cáo thu chi tháng 1/2024"
                    />
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                        Mô tả
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={3}
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-lapis-500 outline-none font-medium resize-none"
                        placeholder="Mô tả ngắn gọn về báo cáo..."
                    />
                </div>

                {/* Month and Year */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="month" className="block text-sm font-semibold text-gray-700 mb-2">
                            Tháng <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="month"
                            name="month"
                            value={formData.month}
                            onChange={handleChange}
                            className="w-full px-6 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-lapis-500 outline-none font-medium"
                        >
                            {months.map((month) => (
                                <option key={month.value} value={month.value}>
                                    {month.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="year" className="block text-sm font-semibold text-gray-700 mb-2">
                            Năm <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="year"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className="w-full px-6 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-lapis-500 outline-none font-medium"
                        >
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Type */}
                <div>
                    <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
                        Loại báo cáo <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-lapis-500 outline-none font-medium"
                    >
                        <option value="summary">Tổng hợp</option>
                        <option value="income">Thu</option>
                        <option value="expense">Chi</option>
                    </select>
                </div>

                {/* File Upload */}
                <FileUpload
                    label="File báo cáo"
                    required
                    accept="application/pdf,image/*"
                    onUpload={handleFileUpload}
                />

                {/* Actions */}
                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                    <Link
                        href="/admin/reports"
                        className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-xl font-semibold transition-colors"
                    >
                        Hủy
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 bg-gradient-to-r from-lapis-600 to-lapis-500 hover:from-lapis-700 hover:to-lapis-600 text-white font-bold rounded-xl shadow-lg shadow-lapis-200 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        {loading ? 'Đang tạo...' : 'Tạo báo cáo'}
                    </button>
                </div>
            </form>
        </div>
    );
}
