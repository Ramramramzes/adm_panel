import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function Main() {
  const location = useLocation();
  const currentAdmin = location.state && location.state.currentAdmin;
  useEffect(()=>{
    console.log(currentAdmin);
  },[])
  

  return (
    <div>Добро пожаловать {currentAdmin && currentAdmin.name}</div>
  );
}
