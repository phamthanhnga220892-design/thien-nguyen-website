'use client';

import React, { useState } from 'react';
import { Upload, X, Loader2, FileText, Image as ImageIcon } from 'lucide-react';

interface FileUploadProps {
    label: string;
    required?: boolean;
    accept?: string; // e.g., "application/pdf,image/*"
    onUpload: (url: string, fileType: 'pdf' | 'image', publicId?: string) => void;
    existingFile?: {
        url: string;
        type: 'pdf' | 'image';
    };
}

export default function FileUpload({
    label,
    required = false,
    accept = "application/pdf,image/*",
    onUpload,
    existingFile
}: FileUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState<{ url: string; type: 'pdf' | 'image' } | null>(
        existingFile || null
    );
    const [error, setError] = useState('');

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        setUploading(true);
        setError('');

        try {
            // Validate file size (max 10MB)
            if (selectedFile.size > 10 * 1024 * 1024) {
                throw new Error('File quá lớn. Tối đa 10MB.');
            }

            // Determine file type
            const isPDF = selectedFile.type === 'application/pdf';
            const isImage = selectedFile.type.startsWith('image/');

            if (!isPDF && !isImage) {
                throw new Error('Chỉ chấp nhận file PDF hoặc ảnh.');
            }

            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('folder', 'reports');

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Upload thất bại');
            }

            const data = await response.json();
            const fileType: 'pdf' | 'image' = isPDF ? 'pdf' : 'image';

            setFile({ url: data.url, type: fileType });
            onUpload(data.url, fileType, data.publicId);
        } catch (err: any) {
            setError(err.message || 'Có lỗi xảy ra khi upload file');
        } finally {
            setUploading(false);
        }
    };

    const removeFile = () => {
        setFile(null);
        onUpload('', 'pdf');
    };

    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            {/* Upload Area */}
            {!file ? (
                <label className="block border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-lapis-500 transition-colors cursor-pointer">
                    <input
                        type="file"
                        accept={accept}
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
                                Click để chọn file
                            </p>
                            <p className="text-xs text-gray-500">PDF hoặc ảnh (tối đa 10MB)</p>
                        </>
                    )}
                </label>
            ) : (
                /* File Preview */
                <div className="border-2 border-gray-200 rounded-xl p-6 bg-gray-50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            {file.type === 'pdf' ? (
                                <div className="p-3 bg-red-100 rounded-lg">
                                    <FileText className="h-8 w-8 text-red-600" />
                                </div>
                            ) : (
                                <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                                    <img
                                        src={file.url}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <div>
                                <p className="font-semibold text-gray-900">
                                    {file.type === 'pdf' ? 'File PDF' : 'Ảnh'}
                                </p>
                                <a
                                    href={file.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-lapis-600 hover:underline"
                                >
                                    Xem file
                                </a>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={removeFile}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                    {error}
                </div>
            )}
        </div>
    );
}
