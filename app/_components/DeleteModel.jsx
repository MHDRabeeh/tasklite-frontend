"use client"
import React from 'react';

export default function DeleteModal({
    isOpen,
    onClose,
    onConfirm,
    itemName = "this item"
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Confirm Deletion
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Are you sure you want to delete {itemName}? This action cannot be undone.
                    </p>

                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}