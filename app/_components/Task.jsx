"use client"
import { useDraggable } from '@dnd-kit/core';
import React, { useRef, useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { RxDragHandleDots2 } from "react-icons/rx";
import { AiFillDelete } from "react-icons/ai";
import DeleteModal from './DeleteModel';
import { deleteTask } from '../_api/service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useReactToPrint } from 'react-to-print';

const priorityColors = {
  High: 'bg-red-100 text-red-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Low: 'bg-green-100 text-green-800'
};

export default function Task({ task, handleEditClick, fetchdata }) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task._id,
    data: { column: task.status }
  });
  const printRef = useRef(null)

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition: !transform ? 'transform 0.2s ease' : undefined,
    opacity: isDragging ? 0.8 : 1,
    boxShadow: isDragging ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : undefined,
  };

  const dueDate = new Date(task.dueDate);
  const formattedDate = dueDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      console.log('Deleting task:', taskToDelete);
      await deleteTask(taskToDelete._id)
      setDeleteModalOpen(false);
      fetchdata()
    } catch (error) {
      console.log(error);

    }
  };


  const handlePrint = useReactToPrint({
    contentRef: printRef, // NEW way
    documentTitle: task.title || "Task",
    onAfterPrint: () => console.log("Print successful!")
  });

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative rounded-lg bg-white p-4 hover:shadow-md border-l-4 ${isDragging ? 'shadow-lg cursor-grabbing' : 'shadow-sm cursor-default'
        } ${task.priority === 'High' ? 'border-red-300' :
          task.priority === 'Medium' ? 'border-yellow-300' :
            'border-green-300'
        }`}
    >
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={taskToDelete?.title || "this task"}
      />
      <div
        {...attributes}
        {...listeners}
        className={`absolute -left-1 top-1/2 transform -translate-y-1/2 w-6 h-16 flex items-center justify-center rounded-l-md ${isDragging ? 'bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'
          } transition-colors cursor-grab active:cursor-grabbing`}
        title="Drag to reorder"
      >
        <RxDragHandleDots2 className="w-4 h-4 text-gray-500" />
      </div>

      <div ref={printRef} className="ml-4"> {/* Add margin to account for drag handle */}
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

          <div className="flex items-center space-x-2">
            <div>
              <button
                onClick={() => handleDeleteClick(task)}
                className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                aria-label="Edit task"
              >
                <AiFillDelete className="w-4 h-4" />
              </button>

            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEditClick(task);
              }}
              className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
              aria-label="Edit task"
            >
              <FiEdit2 className="w-4 h-4" />
            </button>

            <button
              onClick={handlePrint}
              className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 text-xs text-gray-500"
              aria-label="Download PDF"
            >
              PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}