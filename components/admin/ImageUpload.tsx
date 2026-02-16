'use client';

import React, { useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';

interface ImageUploadProps {
    label: string;
    required?: boolean;
    multiple?: boolean;
    onUpload: (urls: string[]) => void;
    existingImages?: string[];
}

export default function ImageUpload({
    label,
    required = false,
    multiple = false,
    onUpload,
    existingImages = []
}: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [images, setImages] = useState<string[]>(existingImages);
    const [error, setError] = useState('');

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        setError('');

        try {
            const uploadPromises = Array.from(files).map(async (file) => {
                // Validate file size (max 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    throw new Error(`File ${file.name} quá lớn. Tối đa 5MB.`);
                }

                // Validate file type
                if (!file.type.startsWith('image/')) {
                    throw new Error(`File ${file.name} không phải là ảnh.`);
                }

                const formData = new FormData();
                formData.append('file', file);
                formData.append('folder', 'thien-nguyen/projects');

                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Upload thất bại');
                }

                const data = await response.json();
                return data.url;
            });

            const uploadedUrls = await Promise.all(uploadPromises);
            const newImages = multiple ? [...images, ...uploadedUrls] : uploadedUrls;

            setImages(newImages);
            onUpload(newImages);
        } catch (err: any) {
            setError(err.message || 'Có lỗi xảy ra khi upload ảnh');
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
        onUpload(newImages);
    };

    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            {/* Upload Area */}
            <div className="space-y-4">
                <label className="block border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-lapis-500 transition-colors cursor-pointer">
                    <input
                        type="file"
                        accept="image/*"
                        multiple={multiple}
                        onChange={handleFileChange}
                        disabled={uploading}
                        className="hidden"
                    />

                    {uploading ? (
                        <div className="flex flex-col items-center">
                            <Loader2 className="h-12 w-12 text-lapis-500 animate-spin mb-4" />
                            <p className="text-sm text-gray-600">Đang upload...</p>
                        </div>
                    ) : (
                        <>
                            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-sm text-gray-600 mb-2">
                                {multiple ? 'Kéo thả ảnh hoặc click để chọn' : 'Click để chọn ảnh'}
                            </p>
                            <p className="text-xs text-gray-500">PNG, JPG, WEBP (tối đa 5MB)</p>
                        </>
                    )}
                </label>

                {/* Error Message */}
                {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                        {error}
                    </div>
                )}

                {/* Image Preview */}
                {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {images.map((url, index) => (
                            <div key={index} className="relative group">
                                <img
                                    src={url}
                                    alt={`Upload ${index + 1}`}
                                    className="w-full h-32 object-cover rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
