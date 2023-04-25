import './App.css';
import { TaskForm } from './components/TaskForm';
import { TasksLists } from './components/TasksLists';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className="bg-zinc-900 h-screen text-white">
      <div className='flex items-center justify-center h-full'>
        <BrowserRouter>
          <Routes>
            <Route path='/redux-tasks' element={<TasksLists />} />
            <Route path='/redux-tasks/create-task' element={<TaskForm />} />
            <Route path='/redux-tasks/edit-task/:id' element={<TaskForm />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
