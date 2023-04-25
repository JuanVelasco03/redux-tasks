import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: "tasks",
    initialState: JSON.parse(localStorage.getItem("tasks")) === null ? [] : JSON.parse(localStorage.getItem("tasks")),
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload)
            localStorage.setItem("tasks", JSON.stringify(state))
        },
        deleteTask: (state, action) => {
            const id = action.payload;
            // const filterTask = state.filter(task => (task.id !== id))
            // localStorage.setItem("tasks", JSON.stringify(filterTask))
            const taskFound = state.find(task => task.id === id);
            if(taskFound){
                state.splice(state.indexOf(taskFound), 1)
                localStorage.setItem("tasks", JSON.stringify(state))
            }
        },
        editTask: (state, action) => {
            const {id, title, description} = action.payload;
            const foundTask = state.find(task => task.id === id);
            if(foundTask){
                foundTask.title = title
                foundTask.description = description
            }
            localStorage.setItem("tasks", JSON.stringify(state))
        }
    }
})

export const {addTask, deleteTask, editTask} = taskSlice.actions;

export default taskSlice.reducer;