"use client"
import React, { useEffect, useState } from 'react'
import Column from '../_components/Column';
import Header from '../_components/Header';
import { DndContext } from '@dnd-kit/core';
import { addTodo, getTodo } from '../_api/service';
import AddTaskModal from '../_components/AddModal';
const COLUMS = [
    { id: 'Pending', title: 'Pending' },
    { id: 'Ongoing', title: 'Work in Progress' },
    { id: 'Completed', title: 'Completed' },
]


export default function page() {
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userId, setUserId] = useState(null);
    const [tasks, setTasks] = useState([])
  

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        setUserId(storedUserId);
        const fetchdata = async () => {
            const data = await getTodo(userId)
            setTasks(data.todo)
            console.log(tasks);

        }
        fetchdata()

    }, [])

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || !active) return;

        const sourceColumn = active.id; //1
        const targetColumn = over.id; //inpregress

        if (!sourceColumn || !targetColumn || sourceColumn === targetColumn) return;

        setTasks((prevTask) =>
            prevTask.map((task) =>
                active.id === task._id ? { ...task, status: targetColumn } : task
            )
        );

    };
    const handleAddTask = async (newTask) => {
        try {
            setLoading(true);
            // Add to backend
            const addedTask = await addTodo(newTask);
            console.log(addedTask);
            setIsModalOpen(false);
            setTasks((prev) => ([...prev, addedTask]))
        } catch (error) {
            console.error("Error adding task:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col min-h-screen bg-gray-50'>
            <Header onAddTask={() => setIsModalOpen(true)} />

            <AddTaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddTask={handleAddTask}
            />

            {loading ? (
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <DndContext onDragEnd={handleDragEnd}>
                    <main className='flex-1 p-4 overflow-x-auto'>
                        <div className='flex space-x-4 min-w-max'>
                            {COLUMS.map((column) => (
                                <Column
                                    key={column.id}
                                    colum={column}
                                    tasks={tasks.filter((task) => task.status === column.id)}
                                />
                            ))}
                        </div>
                    </main>
                </DndContext>
            )}
        </div>
    )
}
