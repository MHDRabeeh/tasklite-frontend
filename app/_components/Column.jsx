"use client"
import React from 'react';
import Task from './Task';
import { useDroppable } from '@dnd-kit/core';

const statusColors = {
  Pending: 'bg-yellow-100 border-yellow-400',
  Ongoing: 'bg-blue-100 border-blue-400',
  Completed: 'bg-green-100 border-green-400'
};

export default function Column({ colum, tasks }) {
  const {setNodeRef} = useDroppable({
    id:colum.id
  })
  return (
    <div ref={setNodeRef} className={`flex-1 rounded-lg p-4 shadow-sm h-fit min-h-[500px] border-t-4 ${colum.id === "Pending" ? "bg-amber-50 border-amber-400" :
        colum.id === "Ongoing" ? "bg-blue-50 border-blue-400" :
          "bg-green-50 border-green-400"
      }`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-lg font-semibold ${colum.id === "Pending" ? "text-amber-800" :
            colum.id === "Ongoing" ? "text-blue-800" :
              "text-green-800"
          }`}>
          {colum.title}
        </h3>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${colum.id === "Pending" ? "bg-amber-100 text-amber-800" :
            colum.id === "Ongoing" ? "bg-blue-100 text-blue-800" :
              "bg-green-100 text-green-800"
          }`}>
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </span>
      </div>
      <div className='space-y-3'>
        {tasks.map((task) => (
          <Task key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
}
