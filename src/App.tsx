import './App.css'
import { Login } from './Login';
import { Login1 } from './Login';
import { Test } from './Test'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const local = localStorage.getItem('adm_pan_key')
  console.log(local);
  
  return (
    <BrowserRouter>
      <Routes>
        {/* подстановочный путь */}
        {/* <Route path="*" element={local ? <Test /> : <Login /> } /> */}
        <Route path="*" element={<Login1 />} />
        <Route path="/main" element={<Test/>}/>
      </Routes>
  </BrowserRouter>
  )
}

export default App
