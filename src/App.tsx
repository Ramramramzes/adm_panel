import './App.css'
import { Edit } from './Edit';
import { Login } from './Login';
import { Main } from './Mainpanel';
import { FindAdmProvider } from './context/findAdmContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const local = localStorage.getItem('adm_pan_key')
  console.log(local);
  
  return (
    <BrowserRouter>
      <FindAdmProvider>
        <Routes>
          {/* подстановочный путь */}
          <Route path="*" element={<Login />} />
          <Route path="/main" element={<Main />}/>
          <Route path="/workers_edit" element={<Edit />}/>
        </Routes>
      </FindAdmProvider>
    </BrowserRouter>
  )
}

export default App
