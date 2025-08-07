"use client"
import { useDraggable } from '@dnd-kit/core';
import React from 'react';
import { FiEdit2 } from 'react-icons/fi';
const priorityColors = {
  High: 'bg-red-100 text-red-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Low: 'bg-green-100 text-green-800'
};

export default function Task({ task }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
    data: { column: task.status }
  })
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition: !transform ? 'transform 0.2s ease' : undefined, // Smooth return on release
  };
  const dueDate = new Date(task.dueDate);
  const formattedDate = dueDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  return (
    <div
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      className="cursor-grab rounded-lg bg-white p-4 shadow-sm hover:shadow-md border-l-4 border-gray-300">
      <div className="flex justify-between items-start">
        <h4 className='font-medium text-gray-900'>{task.title}</h4>
        <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className='mt-2 text-sm text-gray-600'>{task.description}</p>
      )}

      <div className="mt-3 flex justify-between items-center">
        <span className="text-xs text-gray-500">Due: {formattedDate}</span>

        <div className="flex space-x-2">
          <button
            className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
            aria-label="Edit task"
          >
            <FiEdit2 className="w-4 h-4" />
          </button>

          <button
            className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 text-xs text-gray-500"
            aria-label="Download PDF"
          >
            PDF
          </button>
        </div>
      </div>
    </div>
  );
}