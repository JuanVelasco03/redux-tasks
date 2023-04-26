import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {addTask, editTask} from '../features/tasks/taskSlice' 
import {v4 as uuid} from "uuid"
import { useNavigate, useParams, Link } from 'react-router-dom';

export const ModalEditTask = ({showModal, setShowModal, title, setTask, task}) =>  {
    const dispatch = useDispatch();
    let params = useParams();
    const tasks = useSelector(state => state.tasks)

    useEffect(() => {
        if(params.id){
            setTask(tasks.find(task => task.id === params.id))
        }
    }, [params.id, tasks, setTask])

    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }

    // console.log(task)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(params.id){
            dispatch(editTask(task))
            setTask({})
            setShowModal(!showModal)
        }else{
            dispatch(addTask({...task, id: uuid()}))
            setTask({})
            setShowModal(!showModal)
        }
    }

    const closeModal = () => {
        setShowModal(!showModal)
        setTask({})
    }

    return (
        <>
            {showModal ? (
                <>
                    <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-zinc-600 outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        {title}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <form className='bg-zinc-800 max-w-sm p-4' id='form0'>
                                        <label htmlFor="Title" className='block text-sm font-bold mb-2' >Task:</label>
                                        <input className='w-full p-2 rounded-md bg-zinc-600 mb-2' type="text" placeholder='title' name='title' onChange={handleChange} defaultValue={task.title}/>
                                        <label htmlFor="description" className='block text-sm font-bold mb-2'>Description:</label>
                                        <textarea className='w-full p-2 rounded-md bg-zinc-600 mb-2' name="description" placeholder='description' onChange={handleChange} defaultValue={task.description}/>
                                        <button className='bg-indigo-600 px-3 py-1 mr-2' onClick={handleSubmit}>save</button>
                                        <Link onClick={closeModal} to="/redux-tasks" className='bg-indigo-600 px-3 py-1 mr-2'>cerrar</Link>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}