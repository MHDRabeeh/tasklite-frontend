"use client"
import React, { useEffect, useState } from 'react'
import Column from '../_components/Column';
import Header from '../_components/Header';
import { DndContext } from '@dnd-kit/core';
import AddTaskModal from '../_components/AddModal';
import EditTaskModal from '../_components/EditTaskModal';
import { addTodo, editTodo, getTodo, updateStatus } from '../_api/service';
import { useRouter } from 'next/navigation';
import AuthPrompt from '../_components/AuthPrompt';


const COLUMS = [
    { id: 'Pending', title: 'Pending' },
    { id: 'Ongoing', title: 'Work in Progress' },
    { id: 'Completed', title: 'Completed' },
]


export default function page() {
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState([])
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [user, setUser] = useState(false)
    const router = useRouter()


    const fetchdata = async () => {
        const storedUserId = localStorage.getItem('userId');

        if (!storedUserId) {
            router.push("/login")
        } else {
            setUser(true)
        }
        try {
            setLoading(true)
            const data = await getTodo(storedUserId)
            if (data && data.todo) {
                setTasks(data.todo);
            } else {
                console.warn("getTodo returned unexpected data:", data);
                setTasks([]); // Set empty if nothing is returned
            }
        } catch (error) {
            setLoading(false)
            console.log(error);

        } finally {
            setLoading(false)
        }



    }
    useEffect(() => {
        fetchdata()
    }, [])


    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (!over || !active) return;

        const sourceColumn = active.id; //1
        const targetColumn = over.id; //inpregress
        console.log(sourceColumn, targetColumn);


        if (!sourceColumn || !targetColumn || sourceColumn === targetColumn) return;
        try {
            const newstatus = await updateStatus(sourceColumn, targetColumn);
            console.log(newstatus);


        } catch (error) {
            console.log(error);

        }

        setTasks((prevTask) =>
            prevTask.map((task) =>
                active.id === task._id ? { ...task, status: targetColumn } : task
            )
        );

    };
    const handleAddTask = async (newTask) => {
        try {
            setLoading(true);
            const addedTask = await addTodo(newTask);
            setIsModalOpen(false);
            setTasks((prev) => ([...prev, addedTask.newTodo]))
        } catch (error) {
            console.error("Error adding task:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleEditClick = (task) => {
        setSelectedTask(task);
        setIsEditOpen(true);
    };

    const handleUpdateTask = async (id, updatedTaskData) => {
        try {
            const editedTodo = await editTodo(id, updatedTaskData)
            console.log(editedTodo);
            fetchdata()
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {user? <div className='flex flex-col min-h-screen bg-gray-50'>
                <Header onAddTask={() => setIsModalOpen(true)} />
                <EditTaskModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} onUpdateTask={handleUpdateTask} task={selectedTask} />
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
                                    <Column fetchdata={fetchdata} handleEditClick={handleEditClick}
                                        key={column.id}
                                        colum={column}
                                        tasks={tasks.filter((task) => task.status === column.id)}
                                    />
                                ))}
                            </div>
                        </main>
                    </DndContext>
                )}
            </div>:<AuthPrompt/>}

        </>
    )
}
