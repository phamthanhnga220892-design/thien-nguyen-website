'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Trash2, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import FileUpload from '@/components/admin/FileUpload';

export default function EditReportPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        month: '',
        year: '',
        type: 'summary' as 'income' | 'expense' | 'summary',
        fileUrl: '',
        fileType: 'pdf' as 'pdf' | 'image',
    });

    // Fetch report data
    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await fetch(`/api/reports/${id}`);
                if (!response.ok) {
                    throw new Error('Không thể tải báo cáo');
                }
                const result = await response.json();
                const report = result.data;

                setFormData({
                    title: report.title || '',
                    description: report.description || '',
                    month: report.month?.toString() || '',
                    year: report.year?.toString() || '',
                    type: report.type || 'summary',
                    fileUrl: report.fileUrl || '',
                    fileType: report.fileType || 'pdf',
                });
            } catch (err: any) {
                setError(err.message || 'Không thể tải báo cáo');
            } finally {
                setFetching(false);
            }
        };

        fetchReport();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch(`/api/reports/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    month: parseInt(formData.month),
                    year: parseInt(formData.year),
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Không thể cập nhật báo cáo');
            }

            router.push('/admin/reports');
        } catch (err: any) {
            setError(err.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Bạn có chắc chắn muốn xóa báo cáo này? Hành động này không thể hoàn tác.')) {
            return;
        }

        setDeleting(true);
        try {
            const response = await fetch(`/api/reports/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.error || 'Không thể xóa báo cáo');
            }

            router.push('/admin/reports');
        } catch (err: any) {
            setError(err.message || 'Không thể xóa báo cáo. Vui lòng thử lại.');
        } finally {
            setDeleting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    if (fetching) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 text-lapis-500 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Đang tải báo cáo...</p>
                </div>
            </div>
        );
    }

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    return (
        <div className="max-w-4xl space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link
                        href="/admin/reports"
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 font-display">Chỉnh sửa báo cáo</h1>
                        <p className="text-gray-600 mt-1">Cập nhật thông tin báo cáo tài chính</p>
                    </div>
                </div>
                <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50"
                >
                    <Trash2 className="h-5 w-5" />
                    <span>{deleting ? 'Đang xóa...' : 'Xóa báo cáo'}</span>
                </button>
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
                        placeholder="Mô tả chi tiết về báo cáo..."
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
                            required
                            value={formData.month}
                            onChange={handleChange}
                            className="w-full px-6 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-lapis-500 outline-none font-medium"
                        >
                            <option value="">Chọn tháng</option>
                            {months.map((m) => (
                                <option key={m} value={m}>
                                    Tháng {m}
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
                            required
                            value={formData.year}
                            onChange={handleChange}
                            className="w-full px-6 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-lapis-500 outline-none font-medium"
                        >
                            <option value="">Chọn năm</option>
                            {years.map((y) => (
                                <option key={y} value={y}>
                                    {y}
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
                        required
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-lapis-500 outline-none font-medium"
                    >
                        <option value="income">Thu</option>
                        <option value="expense">Chi</option>
                        <option value="summary">Tổng hợp</option>
                    </select>
                </div>

                {/* File Upload */}
                <FileUpload
                    label="File báo cáo"
                    required
                    existingFile={formData.fileUrl ? { url: formData.fileUrl, type: formData.fileType } : undefined}
                    onUpload={(url, type) => {
                        setFormData({
                            ...formData,
                            fileUrl: url,
                            fileType: type as 'pdf' | 'image',
                        });
                    }}
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
                        {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                    </button>
                </div>
            </form>
        </div>
    );
}
