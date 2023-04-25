import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {addTask, editTask} from '../features/tasks/taskSlice' 
import {v4 as uuid} from "uuid"
import { useNavigate, useParams } from 'react-router-dom';

export const TaskForm = () => {
    // const taskState = useSelector(state => state.tasks)
    // console.log(taskState)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const tasks = useSelector(state => state.tasks)

    const [task, setTask] = useState({
        title: "",
        description: ""
    })

    useEffect(() => {
        if(params.id){
            setTask(tasks.find(task => task.id === params.id))
        }
    }, [params.id, tasks])

    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(params.id){
            dispatch(editTask(task))
        }
        dispatch(addTask({...task, id: uuid()}))
        navigate("/")
    }

    return (
        <form onSubmit={handleSubmit} className='bg-zinc-800 max-w-sm p-4'>
            <label htmlFor="Title" className='block text-sm font-bold mb-2' >Task:</label>
            <input className='w-full p-2 rounded-md bg-zinc-600 mb-2' type="text" placeholder='title' name='title' onChange={handleChange} defaultValue={task.title}/>
            <label htmlFor="description" className='block text-sm font-bold mb-2'>Description:</label>
            <textarea className='w-full p-2 rounded-md bg-zinc-600 mb-2' name="description" placeholder='description' onChange={handleChange} defaultValue={task.description}/>
            <button className='bg-indigo-600 px-3 py-1' >save</button>
        </form>
    )
}
