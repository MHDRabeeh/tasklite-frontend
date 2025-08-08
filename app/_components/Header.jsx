"use client"
import React from 'react';
import { FiLogOut, FiPlus } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
export default function Header({ onAddTask }) {
  const username = localStorage.getItem('username');
  const rotuer = useRouter()
  return (
    <header className='bg-white shadow-sm py-4 px-6'>
      <div className='flex justify-between items-center max-w-7xl mx-auto'>
        <h1 className='text-2xl font-bold text-gray-800'>TaskLite Dashboard</h1>

        <div className='flex items-center space-x-6'>
          {/* Add Task Button */}
          <button
            onClick={onAddTask}
            className='flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors'
          >
            <FiPlus className="h-5 w-5" />
            <span className='hidden md:inline'>Add Task</span>
          </button>

          {/* User Info and Logout */}
          <div className='flex items-center space-x-4'>
            <div className='flex items-center space-x-3'>
              <span className='text-gray-600 hidden md:inline'>Welcome back,</span>
              <span className='font-medium text-blue-600'>{username}</span>

            </div>

            {/* Logout Button */}
            <button
              className='flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors'
              onClick={() => {
                localStorage.removeItem("userId");
                localStorage.removeItem("username");
                rotuer.push("/login")

              }}
            >
              <FiLogOut className='h-5 w-5' />
              <span className='hidden md:inline'>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}