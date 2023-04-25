import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTask } from '../features/tasks/taskSlice'
import { Link } from 'react-router-dom'

export const TasksLists = () => {
    const dispatch = useDispatch()

    const tasks = useSelector(state => state.tasks)
    console.log(tasks)

    const handleDelete = (id) => {
        // const filterTask = tasks.filter(task => (task.id !== id))
        dispatch(deleteTask(id))

    }

    return (
        <div className='w-4/6'>
            <header className='flex justify-between items-center py-4'>
                {/* <h1>Tasks: {tasks.length}</h1> */}
                <Link to="/redux-tasks/create-task" className='bg-indigo-800 px-2 py-1 rounded-sm text-sm'>Create Task</Link>
            </header>

            <div className='grid grid-cols-3 gap-4'>
                {tasks.length >= 1 ? 
                tasks?.map((task) => (
                    <div key={task.id} className='bg-neutral-800 p-4 rounded-md'>
                        <header className='flex justify-between'>
                            <h3>{task.title}</h3>
                            <div className='flex gap-x-2' >
                                <Link to={`/redux-tasks/edit-task/${task.id}`} className='bg-zinc-600 px-2 py-1 text-xs rounded-md' >Editar Task</Link>
                                <button className='bg-red-500 px-2 py-1 text-xs rounded-md self-center' onClick={() => handleDelete(task.id)} >Delete</button>
                            </div>
                        </header>
                        <p>{task.description}</p>
                    </div>
                )) : 
                <h2>No hay tareas pendientes</h2>
                }
            </div>
        </div>
    )
}
