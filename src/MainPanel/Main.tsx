import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function Main() {
  const location = useLocation();
  const {name: adminName , token: adminToken}:{name:string,token:string} = location.state && location.state.currentAdmin;
  useEffect(()=>{
    console.log(adminName,adminToken);
  },[])
  

  return (
    <div>Добро пожаловать {adminName && adminName}</div>
  );
}
