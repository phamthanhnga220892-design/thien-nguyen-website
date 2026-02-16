import { unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

/**
 * Upload image to local storage
 * @param file File object from FormData
 * @param folder Folder name (projects or reports)
 * @returns Object with url and publicId
 */
export async function uploadImage(file: File, folder: string = 'projects') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
    }

    const data = await response.json();
    return {
        url: data.url,
        publicId: data.publicId,
    };
}

/**
 * Delete image from local storage
 * @param publicId Filename to delete
 * @param folder Folder name (projects or reports)
 */
export async function deleteImage(publicId: string, folder: string = 'projects') {
    try {
        if (!publicId) return;

        const filepath = join(process.cwd(), 'public', 'uploads', folder, publicId);

        if (existsSync(filepath)) {
            await unlink(filepath);
        }
    } catch (error) {
        console.error('Error deleting file:', error);
        // Don't throw error, just log it
    }
}

/**
 * Extract filename from URL
 * @param url File URL
 * @returns Filename
 */
export function getPublicIdFromUrl(url: string): string {
    if (!url) return '';
    const parts = url.split('/');
    return parts[parts.length - 1];
}
