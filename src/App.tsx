import './App.css'
import { Edit } from './Layout/Edit';
import { Login } from './Layout/Login';
import { Main } from './Layout/Mainpanel';
import { Person } from './Layout/Person';
import { FindAdmProvider } from './context/findAdmContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <FindAdmProvider>
        <Routes>
          {/* подстановочный путь */}
          <Route path="*" element={<Login />} />
          <Route path="/main" element={<Main />}/>
          <Route path="/workers_edit" element={<Edit />}/>
          <Route path="/person" element={<Person />}/>
        </Routes>
      </FindAdmProvider>
    </BrowserRouter>
  )
}

export default App
