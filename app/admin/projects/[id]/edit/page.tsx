'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Trash2, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        status: 'ongoing' as 'ongoing' | 'completed',
        type: 'normal' as 'featured' | 'support' | 'normal',
        targetAmount: '',
        totalDonated: '',
        thumbnail: '',
        images: [] as string[],
    });

    // Fetch project data
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`/api/projects/${id}`);
                if (!response.ok) {
                    throw new Error('Không thể tải dự án');
                }
                const result = await response.json();
                const project = result.data;

                setFormData({
                    title: project.title || '',
                    description: project.description || '',
                    content: project.content || '',
                    status: project.status || 'ongoing',
                    type: project.type || 'normal',
                    targetAmount: project.targetAmount?.toString() || '',
                    totalDonated: project.totalDonated?.toString() || '',
                    thumbnail: project.thumbnail || '',
                    images: project.images || [],
                });
            } catch (err: any) {
                setError(err.message || 'Không thể tải dự án');
            } finally {
                setFetching(false);
            }
        };

        fetchProject();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch(`/api/projects/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    targetAmount: formData.targetAmount ? parseFloat(formData.targetAmount) : undefined,
                    totalDonated: formData.totalDonated ? parseFloat(formData.totalDonated) : 0,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Không thể cập nhật dự án');
            }

            router.push('/admin/projects');
        } catch (err: any) {
            setError(err.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Bạn có chắc chắn muốn xóa dự án này? Hành động này không thể hoàn tác.')) {
            return;
        }

        setDeleting(true);
        try {
            const response = await fetch(`/api/projects/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.error || 'Không thể xóa dự án');
            }

            router.push('/admin/projects');
        } catch (err: any) {
            setError(err.message || 'Không thể xóa dự án. Vui lòng thử lại.');
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
                    <p className="text-gray-600">Đang tải dự án...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link
                        href="/admin/projects"
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 font-display">Chỉnh sửa dự án</h1>
                        <p className="text-gray-600 mt-1">Cập nhật thông tin dự án</p>
                    </div>
                </div>
                <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50"
                >
                    <Trash2 className="h-5 w-5" />
                    <span>{deleting ? 'Đang xóa...' : 'Xóa dự án'}</span>
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
                        placeholder="Ví dụ: Mái ấm cho em"
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
                </div>

                {/* Thumbnail Upload */}
                {/* Thumbnail Upload */}
                <ImageUpload
                    label="Ảnh đại diện"
                    required
                    existingImages={formData.thumbnail ? [formData.thumbnail] : []}
                    onUpload={(urls) => setFormData({ ...formData, thumbnail: urls[0] || '' })}
                />

                {/* Additional Images */}
                <ImageUpload
                    label="Ảnh bổ sung"
                    multiple
                    existingImages={formData.images}
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

                {/* Target and Total Donated */}
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
                        {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                    </button>
                </div>
            </form>
        </div>
    );
}
