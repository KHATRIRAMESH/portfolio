import { useState } from 'react';
import { deleteBlog } from '@/app/admin/actions/blogs';

'use client';


export default function DeleteButton({ blogId, onSuccess }) {
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            await deleteBlog(blogId);
            onSuccess?.();
        } catch (error) {
            console.error('Delete failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (showConfirm) {
        return (
            <div className="flex gap-2">
                <button
                    onClick={handleDelete}
                    disabled={isLoading}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50"
                >
                    {isLoading ? 'Deleting...' : 'Confirm'}
                </button>
                <button
                    onClick={() => setShowConfirm(false)}
                    className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                >
                    Cancel
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={() => setShowConfirm(true)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
            Delete
        </button>
    );
}