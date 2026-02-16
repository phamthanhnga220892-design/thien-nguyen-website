'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';
import { generateSlug } from '@/lib/utils';

export default function NewProjectPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        status: 'ongoing',
        type: 'normal',
        targetAmount: '',
        totalDonated: '',
        thumbnail: '',
        images: [] as string[],
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Validate required fields
            if (!formData.thumbnail) {
                setError('Vui lòng upload ảnh đại diện');
                setLoading(false);
                return;
            }

            // Generate slug from title
            const slug = generateSlug(formData.title);

            // Prepare data
            const projectData = {
                title: formData.title,
                slug,
                description: formData.description,
                content: formData.content,
                thumbnail: formData.thumbnail,
                images: formData.images,
                status: formData.status,
                type: formData.type,
                targetAmount: formData.targetAmount ? parseInt(formData.targetAmount) : undefined,
                totalDonated: formData.totalDonated ? parseInt(formData.totalDonated) : 0,
            };

            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Không thể tạo dự án');
            }

            router.push('/admin/projects');
        } catch (err: any) {
            setError(err.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        });
    };

    return (
        <div className="max-w-4xl space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-4">
                <Link
                    href="/admin/projects"
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 font-display">Tạo dự án mới</h1>
                    <p className="text-gray-600 mt-1">Thêm dự án thiện nguyện mới</p>
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
                        Tiêu đề dự án <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-lapis-500 outline-none font-medium"
                        placeholder="Ví dụ: Mái Ấm Cho Em"
                    />
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                        Mô tả ngắn <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        required
                        rows={3}
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-lapis-500 outline-none font-medium resize-none"
                        placeholder="Mô tả ngắn gọn về dự án..."
                    />
                </div>

                {/* Content */}
                <div>
                    <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
                        Nội dung chi tiết <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        required
                        rows={10}
                        value={formData.content}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-lapis-500 outline-none font-medium resize-none"
                        placeholder="Nội dung chi tiết về dự án..."
                    />
                    <p className="text-xs text-gray-500 mt-2">Hỗ trợ markdown để định dạng văn bản</p>
                </div>

                {/* Thumbnail Upload */}
                <ImageUpload
                    label="Ảnh đại diện"
                    required
                    multiple={false}
                    onUpload={(urls) => setFormData({ ...formData, thumbnail: urls[0] || '' })}
                />

                {/* Additional Images */}
                <ImageUpload
                    label="Ảnh bổ sung"
                    multiple={true}
                    onUpload={(urls) => setFormData({ ...formData, images: urls })}
                />

                {/* Status and Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-2">
                            Trạng thái <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-6 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-lapis-500 outline-none font-medium"
                        >
                            <option value="ongoing">Đang triển khai</option>
                            <option value="completed">Đã hoàn thành</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
                            Loại dự án <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full px-6 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-lapis-500 outline-none font-medium"
                        >
                            <option value="normal">Thường</option>
                            <option value="support">Hỗ trợ</option>
                            <option value="featured">Tiêu biểu</option>
                        </select>
                    </div>
                </div>

                {/* Target and Current Amount */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="targetAmount" className="block text-sm font-semibold text-gray-700 mb-2">
                            Mục tiêu quyên góp (VNĐ)
                        </label>
                        <input
                            type="number"
                            id="targetAmount"
                            name="targetAmount"
                            value={formData.targetAmount}
                            onChange={handleChange}
                            className="w-full px-6 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-lapis-500 outline-none font-medium"
                            placeholder="100000000"
                        />
                    </div>

                    <div>
                        <label htmlFor="totalDonated" className="block text-sm font-semibold text-gray-700 mb-2">
                            Đã quyên góp (VNĐ)
                        </label>
                        <input
                            type="number"
                            id="totalDonated"
                            name="totalDonated"
                            value={formData.totalDonated}
                            onChange={handleChange}
                            className="w-full px-6 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-lapis-500 outline-none font-medium"
                            placeholder="45000000"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                    <Link
                        href="/admin/projects"
                        className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-xl font-semibold transition-colors"
                    >
                        Hủy
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 bg-gradient-to-r from-lapis-600 to-lapis-500 hover:from-lapis-700 hover:to-lapis-600 text-white font-bold rounded-xl shadow-lg shadow-lapis-200 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        {loading ? 'Đang tạo...' : 'Tạo dự án'}
                    </button>
                </div>
            </form>
        </div>
    );
}
