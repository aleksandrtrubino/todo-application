import './App.css';
import { Route, Routes } from 'react-router-dom'
import { TodoPage } from './components/TodoPage';


function App() {
  return (
    <Routes>
      <Route exact path="/home" element={<TodoPage />} />
    </Routes>
  )
}

export default App;
