import './App.css';
import { TasksLists } from './components/TasksLists';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className="bg-zinc-900 h-screen text-white">
      <div className='flex items-center justify-center h-full'>
        <BrowserRouter>
          <Routes>
            <Route path='/redux-tasks/:id?' element={<TasksLists />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
